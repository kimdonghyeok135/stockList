import Link from "next/link";

export default function Main(){
    return(
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* 메인 콘텐츠 카드: 배경, 그림자, 모서리 둥글게 처리 */}
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-2xl text-center">

        {/* 대출 계산기 이동 버튼 */}
        <Link href={"/calculator"}>
          <button
            type="button"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition duration-150 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            대출 상환액 계산하기
          </button>
        </Link>

        <Link href={"/salaryCalculation"}>
          <button
            type="button"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition duration-150 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mt-8"
          >
            월급 실시간 계산
          </button>
        </Link>

        <Link href={"/stockList"}>
          <button
            type="button"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition duration-150 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mt-8"
          >
            주식 알아보기
          </button>
        </Link>


      </div>

        
      
    </div>
    )
}