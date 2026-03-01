

export default async function getWorkDaysData(){

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let holidayCnt = 0;
    const key = '5bf1f6757b883c1ec7ae3478e533a67ce1d6be8fd67e424b620affe271dcdc9d'
    const params = {
        serviceKey: key, // ServiceKey는 첫 파라미터이므로 URL에 직접 포함
        pageNo: '1',    // 페이지 번호
        numOfRows: '50',  // 한 페이지 결과 수
        solYear: currentYear+'', // 연도
        //solMonth: '01'   // 월
    };

    const query = new URLSearchParams({
      serviceKey: params.serviceKey,
      pageNo: params.pageNo,
      numOfRows: params.numOfRows,
      solYear: params.solYear,
      _type : 'json'
      //solMonth: params.solMonth,
      // 기타 필수 파라미터가 있다면 여기에 추가
    }).toString();

    const API_URL_REST = 'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo'
    const fullUrlRest = `${API_URL_REST}?${query}`;
    const responseRest = await fetch(fullUrlRest);
    const dataRest = await responseRest.json();
    dataRest.response.body.items.item?.map((data: { locdate: number })=>{
        if(!isWeekend(data.locdate)){
            holidayCnt++
        }
    })

    
    const totalHolidayCnt = await countWeekendsInYear(currentYear) + holidayCnt
    return getDaysInYear(currentYear) -  totalHolidayCnt
}


async function countWeekendsInYear(year : number) {
  let weekendCount = 0;
  
  // 1. 해당 연도의 1월 1일로 시작 날짜를 설정합니다.
  const date = new Date(year, 0, 1); // 0은 1월을 의미
  
  // 2. 다음 연도의 1월 1일 날짜를 설정합니다. (종료 조건)
  const nextYear = new Date(year + 1, 0, 1);
  
  // 3. 현재 날짜가 다음 연도 1월 1일보다 작을 때까지 반복합니다.
  while (date < nextYear) {
    
    // getDay()는 요일을 숫자로 반환합니다. (0: 일요일, 6: 토요일)
    const dayOfWeek = date.getDay(); 

    // 4. 요일이 일요일(0)이거나 토요일(6)이면 주말 카운트를 1 증가시킵니다.
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendCount++;
    }
    
    // 5. 다음 날짜로 이동
    // 현재 날짜에 1을 더하여 자동으로 다음 날짜로 넘어갑니다.
    // 이 과정에서 월이나 연도가 바뀌어도 Date 객체가 자동으로 처리합니다.
    date.setDate(date.getDate() + 1);
  }
  
  return weekendCount;
}

function isWeekend(yyyymmdd: number): boolean {
  
  // 1. 입력 유효성 검사 및 문자열 변환
  // 숫자를 문자열로 변환하여 길이 검사를 수행합니다.
  const dateString = String(yyyymmdd);
  
  if (dateString.length !== 8) {
    console.error(`유효하지 않은 날짜 형식입니다. 'YYYYMMDD' 8자리 숫자가 필요합니다. 입력 값 길이: ${dateString.length}`);
    return false;
  }
  
  // 2. 'YYYYMMDD' -> 'YYYY-MM-DD' 형식으로 변환
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  
  const formattedDate = `${year}-${month}-${day}`;

  // 3. Date 객체 생성 및 유효성 검사
  const date = new Date(formattedDate);

  // Date.parse를 시도하여 생성된 Date 객체가 유효한지 검사 (존재하지 않는 날짜인지)
  if (isNaN(date.getTime())) {
    console.error(`"${dateString}"는 존재하지 않거나 유효하지 않은 날짜입니다.`);
    return false;
  }
  
  // 4. 요일 확인 (핵심 로직)
  // getDay()는 요일을 숫자로 반환합니다: 0 (일요일) ~ 6 (토요일)
  const dayOfWeek = date.getDay();

  // 0 (일요일) 또는 6 (토요일) 이면 주말입니다.
  return dayOfWeek === 0 || dayOfWeek === 6;
}


function getDaysInYear(year:number) {
  // 1. 해당 연도의 1월 1일 (시작점)
  const startOfYear = new Date(year, 0, 1); // 0은 1월을 의미합니다.
  
  // 2. 다음 연도의 1월 1일 (종료점)
  const startOfNextYear = new Date(year + 1, 0, 1);
  
  // 3. 두 날짜 사이의 밀리초(ms) 차이를 계산합니다.
  const timeDifferenceMs = startOfNextYear.getTime() - startOfYear.getTime();
  
  // 4. 밀리초 차이를 일(day) 단위로 변환합니다.
  // 1일 = 24시간 * 60분 * 60초 * 1000밀리초
  const msInDay = 1000 * 60 * 60 * 24;
  
  const daysInYear = Math.round(timeDifferenceMs / msInDay);
  
  return daysInYear;
}