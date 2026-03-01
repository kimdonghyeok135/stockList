"use client"
import React, { useEffect, useRef, useState } from "react";
import LoanInputForm from "@/components/LoanInputForm";
import getWorkDaysData from '@/lib/services/getWorkDaysData'


export default function SalaryCalculation(){
   
    const [salary, setSalary] = useState<string>("") 
    const [startTime, setStartTime] = useState<string>("")
    const [endTime, setEndTime] = useState<string>("")
    const [earnMoney, setEarnMoney] = useState(0);
    const [loading, setLoading] = useState(true);
    const [workDay, setWorkDay] = useState(0);
    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.id === "yearAmount"){
          setSalary(e.target.value); 
        }else if(e.target.id === "startTime"){
          setStartTime(e.target.value); 
        }else{
          setEndTime(e.target.value); 
        }   
    }
    
    useEffect(() => {
      getWorkDaysData().then((workDayCnt : number) => {
        setWorkDay(workDayCnt)
      })
    },[])

    const calculateSalary = () => {
      console.log("calculateSalary 실행")
      const now = new Date();

        // 1. 시(Hour) 구하기
        const hours = now.getHours(); 
  
        // 2. 분(Minute) 구하기
        const minutes = now.getMinutes(); 
  
        // 3. 두 자리수로 포맷팅 (padStart 사용)
        // 예를 들어, 9시 5분이면 '09'와 '05'로 만듭니다.
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        const nowTimeHHMM = `${formattedHours}:${formattedMinutes}`

        //순수 하루 일했을 때 받는 돈
        const dayPay = Number(salary) / workDay

        const START_HOUR = Number(startTime);
        const END_HOUR = Number(endTime);
        const LUNCH_START_HOUR = 12;
        const LUNCH_END_HOUR = 13;
        const TOTAL_WORK_MINUTES = (END_HOUR - START_HOUR) * 60 - (LUNCH_END_HOUR - LUNCH_START_HOUR) * 60;

        // 3. 목표 시간 파싱 (분 단위로 변환)
        const [targetHour, targetMinute] = nowTimeHHMM.split(':').map(Number);
    
        // 9시 0분부터 목표 시간까지의 총 경과 시간 (분 단위)
        let elapsedMinutes = (targetHour - START_HOUR) * 60 + targetMinute;

        // 4. 점심시간 제외 처리
        // 목표 시간이 점심 시간 이후인 경우 (13시 00분 이후)
        if (targetHour >= LUNCH_END_HOUR) {
          // 점심 시간 1시간(60분)을 경과 시간에서 제외
          elapsedMinutes -= (LUNCH_END_HOUR - LUNCH_START_HOUR) * 60;
        } 
        // 목표 시간이 점심 시간 중간인 경우 (예: 12:30)
        else if (targetHour >= LUNCH_START_HOUR && targetHour < LUNCH_END_HOUR) {
          // 근무가 점심시간에 멈춘 것으로 간주하고, 점심시간 시작 전까지의 시간만 계산
          elapsedMinutes = (LUNCH_START_HOUR - START_HOUR) * 60; // 9시~12시까지의 시간(180분)
        }
        
        // 근무 시작 시간 이전이나 종료 시간 이후는 0 또는 총 일당으로 제한
        if (elapsedMinutes <= 0) {
          
          return 0;
        }
        // if (elapsedMinutes >= TOTAL_WORK_MINUTES) { 
        //   return dayPay;
        // }

        // 5. 임금 계산
        // (경과 근무 시간 / 총 근무 시간) * 일당
        const earnedAmount = (elapsedMinutes / TOTAL_WORK_MINUTES) * dayPay;
        // 소수점 셋째 자리에서 반올림하여 둘째 자리까지 표시 (금액 계산의 정확성을 위해)
        const exactlyEarnedAmount = Math.round(earnedAmount * 100) / 100
        setEarnMoney(exactlyEarnedAmount)
    }

    const clickCalculateSalary = () => {
        setLoading(false)
        calculateSalary()
        const interValName = setInterval(() => {
          calculateSalary()
        },1000)   
    }

    

    //금액 애니메이션 추가
    const usePrevious = (value :number) => {
      const ref = useRef(value);
      useEffect(() => {
        ref.current = value;
      })
      return ref.current
    }

    return(
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="loan-calculator bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg">
        <div className="input-section space-y-5">
            <LoanInputForm
            label="연봉 (원)" 
            id="yearAmount" 
            placeholder = "예: 50000000" 
            value = {salary}
            onChange={handleSalaryChange}
            type="text"
            />
            
            <LoanInputForm
            label="출근 시간" 
            id="startTime" 
            placeholder = "예 : 9" 
            value = {startTime}
            onChange={handleSalaryChange}
            type="text"
            />

            <LoanInputForm
            label="퇴근 시간" 
            id="endTime" 
            placeholder = "예 : 18" 
            value = {endTime}
            onChange={handleSalaryChange}
            type="text"
            />

            
        {!loading ? (
          <>
          <div id="financial-card" className="w-full max-w-sm p-6 sm:p-8 
           bg-gray-800 rounded-2xl shadow-2xl 
           border border-gray-700 
           transform transition duration-500 hover:scale-[1.02]">
          <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
           현재 하루 벌어들인 돈
        </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>

    <div className="mb-4">
        <div className="text-4xl sm:text-6xl font-extrabold text-white leading-none">
          {new Intl.NumberFormat('ko-KR',{
            style : 'currency',
            currency : 'KRW'
          }).format(earnMoney)}
        </div>
    </div>
    
      </div>
      <button 
              id="calculate-btn"
              onClick={clickCalculateSalary}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              다시 계산하기
            </button>
            </>
    ) : <>
      <button 
              id="calculate-btn"
              onClick={clickCalculateSalary}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              당신은 지금 얼마를 벌어들이고 있는가?
            </button>
    </>}
          
        </div>
      </div>
    </div>
    )
}