interface LoanInputFormProps {
  label: string; // 입력 필드의 레이블 (예: "대출 원금 (원)")
  id: string; // HTML id 및 htmlFor 속성
  value: string | number; // 현재 입력 값 (포맷팅된 문자열 또는 숫자)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 값 변경 핸들러 함수
  placeholder: string; // 플레이스 홀더 텍스트
  type: string; // input type (text 또는 number)
  min?: number; // type이 number일 경우 최소값
  errorMessage? : string 
}

const LoanInputForm = ({label,id,value,onChange,placeholder,type,min,errorMessage} : LoanInputFormProps) => {
    const inputBorderClass = errorMessage 
        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input 
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg transition duration-150 text-gray-900 text-right font-mono text-lg ${inputBorderClass}`}
            min={min}
             />
             {errorMessage && (
                <p className="mt-1 text-xs text-red-600 w-full text-right font-medium !text-right">{errorMessage}</p>
            )}
        </div>
    )
}

export default LoanInputForm