"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error); // 여기서 에러 객체 확인
  }, [error]);

  return (
    <div>
      <p>에러: {error.message}</p>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
