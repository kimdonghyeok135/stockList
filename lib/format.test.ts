import { describe, expect, it } from "vitest";
import { formatCurrency, formatNumber, formatTimestamp } from "./format";

describe("Format", () => {
  it("정수를 달러 포맷으로 변경한다.", () => {
    const result = formatCurrency(123123);
    expect(result).toBe("$123,123.00");
  });

  it("소수를 달러 포맷으로 변경한다.", () => {
    const result = formatCurrency(123123.456);
    expect(result).toBe("$123,123.46");
  });
  it("0 값을 '$0.00'로 반환한다.", () => {
    const result = formatCurrency(0);
    expect(result).toBe("$0.00");
  });

  it("실수를 소수점 둘째 자리까지 표기한다.", () => {
    const result = formatNumber(123.456);
    expect(result).toBe("123.46");
  });

  it("숫자를 시간 포맷형태로 변경한다.", () => {
    const result = formatTimestamp(1774036800);
    expect(result).toBe("2026년 3월 21일 오전 5:00:00");
  });
});
