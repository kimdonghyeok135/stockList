"use client";

import { useState, useMemo } from "react";
import LoanInputForm from "../components/LoanInputForm";
import { z, ZodError, ZodIssue } from "zod";
import { redirect, useRouter } from "next/navigation";

// 원리금 균등 상환 결과 인터페이스
interface IResultLevel {
  monthlyPayment: number; // 일정 월별 상환액
  totalInterest: number;
  totalPayment: number;
}

// 원금 균등 상환 결과 인터페이스
interface IResultEqual {
  firstMonthlyPayment: number; // 첫 달 상환액 (가장 높음)
  lastMonthlyPayment: number; // 마지막 달 상환액 (가장 낮음)
  totalInterest: number;
  totalPayment: number;
}

// 만기 일시 상환 결과 인터페이스
interface IResultBullet {
  monthlyInterestPayment: number; // 매월 납부하는 이자액 (일정)
  finalPrincipalPayment: number; // 만기일에 납부하는 원금액
  totalInterest: number;
  totalPayment: number;
}

// 세 가지 결과를 모두 담는 통합 인터페이스
interface ICombinedResult {
  level: IResultLevel | null;
  equal: IResultEqual | null;
  bullet: IResultBullet | null; // 만기 일시 상환 결과 추가
}

const loanAmtSchema = z.object({
  loanAmt: z.number().min(1, { message: "대출 원금은 1원 이상 입력해야 합니다." }),
});

const rateSchema = z.object({
  rate: z.string().min(1, { message: "대출 금리를 입력해야 합니다." }),
});

const loanDurSchema = z.object({
  loanDur: z.number().int().min(1, { message: "대출 기간은 1년 이상이어야 합니다." }),
});

export default function Home() {
  //주식 화면으로 바로 이동
  redirect("/stockList");
  // 숫자를 한국 통화 형식으로 포맷팅 (예: 1,000,000)
  const formatNumber = (num: number) => {
    if (num === null || num === undefined || isNaN(num)) {
      return "0";
    }
    return Number(Math.round(num)).toLocaleString("ko-KR");
  };

  // --- State Hooks ---
  const [loanAmt, setLoanAmt] = useState<number>(0); // 대출 원금
  const [rate, setRate] = useState<string>(""); // 연 이자율 (%)
  const [loanDur, setLoanDur] = useState<number>(0); // 대출 기간 (년)

  const [resultVisible, setResultVisible] = useState<boolean>(false); // 결과 표시 여부
  const [calculationType, setCalculationType] = useState<"level" | "equal" | "bullet">("level"); // 계산 방식 선택

  const [results, setResults] = useState<ICombinedResult>({
    level: null,
    equal: null,
    bullet: null,
  }); // 통합 결과 상태

  const [loanAmtError, setLoanAmtError] = useState("");
  const [rateError, setRateError] = useState("");
  const [loanDurError, setLoanDurError] = useState("");

  // 현재 선택된 방식의 결과 데이터
  const currentResult = useMemo(() => {
    if (calculationType === "level") return results.level;
    if (calculationType === "equal") return results.equal;
    if (calculationType === "bullet") return results.bullet;
    return null;
  }, [calculationType, results]);

  // --- Event Handlers ---

  const setChangeAmt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = Number(rawValue);
    setLoanAmt(numericValue);
  };

  const setChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // 숫자(0-9)와 소수점(.)을 제외한 모든 문자를 제거합니다.
    const sanitizedValue = rawValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedValue.split(".");

    // 소수점이 두 개 이상 입력되는 것을 방지합니다.
    if (parts.length > 2) {
      const correctedValue = parts[0] + "." + parts.slice(1).join("");
      setRate(correctedValue);
      return;
    }
    setRate(sanitizedValue);
  };

  const setChangeLoanDur = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 0 이하의 값 방지 및 정수 변환
    const value = parseInt(e.target.value);
    setLoanDur(value > 0 ? value : 0);
  };

  // --- Calculation Functions ---

  // 원리금 균등 상환 계산
  const calculateLevelPayment = (p: number, r: number, n: number): IResultLevel => {
    const annualRate = r / 100; // %를 소수점으로 변환 (4.5 -> 0.045)
    const monthlyRate = annualRate / 12; // 월 이자율
    const totalPayments = n * 12; // 총 상환 횟수

    let monthlyPayment;

    if (monthlyRate === 0 || totalPayments === 0) {
      monthlyPayment = p / (totalPayments || 1); // 무이자 또는 기간 0 처리
    } else {
      // 원리금 균등 상환 공식
      const powerFactor = Math.pow(1 + monthlyRate, totalPayments);
      const numerator = p * monthlyRate * powerFactor;
      const denominator = powerFactor - 1;
      monthlyPayment = numerator / denominator;
    }

    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - p;

    return {
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalPayment: parseFloat(totalPayment.toFixed(2)),
    };
  };

  // 원금 균등 상환 계산
  const calculatePrincipalEqualization = (p: number, r: number, n: number): IResultEqual => {
    const annualRate = r / 100; // %를 소수점으로 변환 (4.5 -> 0.045)
    const monthlyRate = annualRate / 12; // 월 이자율
    const totalPayments = n * 12; // 총 상환 횟수

    if (totalPayments === 0 || p === 0) {
      return { firstMonthlyPayment: 0, lastMonthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }

    const monthlyPrincipal = p / totalPayments; // 매월 갚는 원금액 (일정)

    let totalInterest = 0;
    let remainingBalance = p;

    // 첫 달 상환액 (가장 높음) 계산
    const firstMonthlyInterest = remainingBalance * monthlyRate;
    const firstMonthlyPayment = monthlyPrincipal + firstMonthlyInterest;

    // 총 이자 계산을 위한 루프
    // 원금은 매월 monthlyPrincipal 만큼 줄어들고, 이자는 줄어든 잔액에 대해 계산됨
    for (let month = 1; month <= totalPayments; month++) {
      const monthlyInterest = remainingBalance * monthlyRate;
      totalInterest += monthlyInterest;
      remainingBalance -= monthlyPrincipal;
      // 마지막 달에는 잔액이 0에 가깝도록 조정 (부동소수점 오차 처리)
      if (month === totalPayments) {
        remainingBalance = 0;
      }
    }

    // 마지막 달 상환액 (가장 낮음)
    // 마지막 달 직전의 잔액은 monthlyPrincipal 이었을 것이므로,
    // 마지막 달의 이자 = monthlyPrincipal * monthlyRate
    const lastMonthlyInterest = monthlyPrincipal * monthlyRate;
    const lastMonthlyPayment = monthlyPrincipal + lastMonthlyInterest;

    const finalTotalPayment = p + totalInterest;

    return {
      firstMonthlyPayment: parseFloat(firstMonthlyPayment.toFixed(2)),
      lastMonthlyPayment: parseFloat(lastMonthlyPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalPayment: parseFloat(finalTotalPayment.toFixed(2)),
    };
  };

  // 만기 일시 상환 계산
  const calculateBulletPayment = (p: number, r: number, n: number): IResultBullet => {
    const annualRate = r / 100; // %를 소수점으로 변환 (4.5 -> 0.045)
    const totalPayments = n * 12; // 총 상환 횟수

    if (p === 0 || totalPayments === 0) {
      return {
        monthlyInterestPayment: 0,
        finalPrincipalPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
      };
    }

    // 매월 납부하는 이자액 (원금 p에 대한 연 이자율)
    const monthlyInterestPayment = p * (annualRate / 12);

    // 총 이자: 매월 이자액 * 총 상환 횟수
    const totalInterest = monthlyInterestPayment * totalPayments;

    // 만기일에 납부하는 원금액은 대출 원금 전체
    const finalPrincipalPayment = p;

    // 총 상환액: 원금 + 총 이자
    const totalPayment = p + totalInterest;

    return {
      monthlyInterestPayment: parseFloat(monthlyInterestPayment.toFixed(2)),
      finalPrincipalPayment: parseFloat(finalPrincipalPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalPayment: parseFloat(totalPayment.toFixed(2)),
    };
  };

  // 통합 계산 실행 핸들러
  const setChangeResult = () => {
    //zod를 통해서 유효성 검사 진행
    const loanAmtErrorResult = loanAmtSchema.safeParse({ loanAmt });
    if (!loanAmtErrorResult.success) {
      setLoanAmtError(loanAmtErrorResult.error.issues[0].message.trim());
      setResultVisible(false);
      return;
    } else {
      setLoanAmtError("");
    }

    const rateErrorResult = rateSchema.safeParse({ rate });
    if (!rateErrorResult.success) {
      setRateError(rateErrorResult.error.issues[0].message.trim());
      setResultVisible(false);
      return;
    } else {
      setRateError("");
    }

    const loanDurErrorResult = loanDurSchema.safeParse({ loanDur });
    if (!loanDurErrorResult.success) {
      setLoanDurError(loanDurErrorResult.error.issues[0].message.trim());
      setResultVisible(false);
      return;
    } else {
      setRateError("");
    }

    setResultVisible(true);
    const numericRate = Number(rate);

    // 1. 원리금 균등 상환 계산
    const levelResult = calculateLevelPayment(loanAmt, numericRate, loanDur);

    // 2. 원금 균등 상환 계산
    const equalResult = calculatePrincipalEqualization(loanAmt, numericRate, loanDur);

    // 3. 만기 일시 상환 계산
    const bulletResult = calculateBulletPayment(loanAmt, numericRate, loanDur);

    // 4. 결과 상태 업데이트
    setResults({
      level: levelResult,
      equal: equalResult,
      bullet: bulletResult,
    });
  };

  // --- Render Logic ---

  // 결과 객체가 유효한지 확인
  const isResultValid = currentResult !== null && currentResult.totalPayment > 0;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="loan-calculator bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">대출금 계산기</h2>

        {/* 입력 섹션 */}
        <div className="input-section space-y-5">
          {/* 대출 원금 */}

          <LoanInputForm
            label="대출 원금 (원)"
            id="loan-amount"
            placeholder="예: 50000000"
            value={formatNumber(loanAmt)}
            onChange={setChangeAmt}
            type="text"
            errorMessage={loanAmtError}
          />

          {/* 연 이자율 */}

          <LoanInputForm
            label="연 이자율 (%)"
            id="interest-rate"
            placeholder="예: 4.5"
            value={rate}
            onChange={setChangeRate}
            type="text"
            errorMessage={rateError}
          />

          {/* 대출 기간 */}
          <LoanInputForm
            label="대출 기간 (년)"
            id="loan-term"
            placeholder="예: 10"
            value={loanDur === 0 ? "" : loanDur}
            onChange={setChangeLoanDur}
            type="number"
            min={1}
            errorMessage={loanDurError}
          />

          {/* 계산 버튼 */}
          <button
            id="calculate-btn"
            onClick={setChangeResult}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            대출 상환액 계산하기
          </button>
        </div>

        {/* 결과 섹션 */}
        {resultVisible && isResultValid && (
          <div id="results-section" className="mt-8 pt-6 border-t border-gray-200 ">
            {/* 결과 제목 및 토글 버튼 */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h3 className="text-xl font-semibold text-gray-800">결과</h3>
              <div className="flex rounded-lg bg-gray-200 p-1 space-x-1 shadow-inner text-sm">
                {/* 원리금 균등 토글 버튼 */}
                <button
                  onClick={() => setCalculationType("level")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300 ${
                    calculationType === "level"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  원리금균등
                </button>
                {/* 원금 균등 토글 버튼 */}
                <button
                  onClick={() => setCalculationType("equal")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300 ${
                    calculationType === "equal"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  원금균등
                </button>
                {/* 만기 일시 토글 버튼 */}
                <button
                  onClick={() => setCalculationType("bullet")}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300 ${
                    calculationType === "bullet"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  만기일시
                </button>
              </div>
            </div>

            {/* 상환 방식별 상세 결과 표시 */}
            <div className="space-y-3">
              {/* 월별/첫 달/마지막 달 상환액 - 방식별 조건부 렌더링 */}
              {calculationType === "level" && results.level ? (
                // 원리금 균등 결과
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-gray-700 font-medium">월별 상환액:</span>
                  <span id="monthly-payment" className="text-xl font-bold text-blue-600">
                    {formatNumber(results.level.monthlyPayment)} 원
                  </span>
                </div>
              ) : calculationType === "equal" && results.equal ? (
                // 원금 균등 결과
                <>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-gray-700 font-medium">첫 달 상환액:</span>
                    <span id="first-payment" className="text-xl font-bold text-red-600">
                      {formatNumber(results.equal.firstMonthlyPayment)} 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-gray-700 font-medium">마지막 달 상환액:</span>
                    <span id="last-payment" className="text-xl font-bold text-red-600">
                      {formatNumber(results.equal.lastMonthlyPayment)} 원
                    </span>
                  </div>
                </>
              ) : calculationType === "bullet" && results.bullet ? (
                // 만기 일시 결과
                <>
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <span className="text-gray-700 font-medium">월 이자 납부액:</span>
                    <span
                      id="monthly-interest-payment"
                      className="text-xl font-bold text-indigo-600"
                    >
                      {formatNumber(results.bullet.monthlyInterestPayment)} 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <span className="text-gray-700 font-medium">만기일 원금 상환액:</span>
                    <span
                      id="final-principal-payment"
                      className="text-xl font-bold text-indigo-600"
                    >
                      {formatNumber(results.bullet.finalPrincipalPayment)} 원
                    </span>
                  </div>
                </>
              ) : null}

              {/* 총 이자 (공통) */}
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-gray-700 font-medium">총 이자:</span>
                <span id="total-interest" className="text-lg font-bold text-green-600">
                  {formatNumber(currentResult!.totalInterest)} 원
                </span>
              </div>

              {/* 총 상환액 (공통) */}
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-gray-700 font-medium">총 상환액:</span>
                <span id="total-payment" className="text-lg font-bold text-yellow-600">
                  {formatNumber(currentResult!.totalPayment)} 원
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
