import { beforeEach, describe, expect, it } from "vitest";
import { useLikelist } from "./likelist";

describe("useLikeList", () => {
  beforeEach(() => {
    localStorage.clear();
    useLikelist.setState({ symbols: [] });
  });

  it("초기값은 빈 symbols 배열이다", () => {
    expect(useLikelist.getState().symbols).toEqual([]);
  });
  it("add는 새 심볼을 추가한다", () => {
    useLikelist.getState().add("AAPL");

    expect(useLikelist.getState().symbols).toEqual(["AAPL"]);
  });

  it("add는 같은 심볼을 중복 추가하지 않는다", () => {
    const store = useLikelist.getState();

    store.add("AAPL");
    store.add("AAPL");

    expect(useLikelist.getState().symbols).toEqual(["AAPL"]);
  });

  it("remove는 해당 심볼을 제거한다", () => {
    useLikelist.setState({ symbols: ["AAPL", "TSLA"] });

    useLikelist.getState().remove("AAPL");

    expect(useLikelist.getState().symbols).toEqual(["TSLA"]);
  });

  it("toggle은 없는 심볼이면 추가한다", () => {
    useLikelist.getState().toggle("NVDA");

    expect(useLikelist.getState().symbols).toEqual(["NVDA"]);
  });

  it("toggle은 이미 있는 심볼이면 제거한다", () => {
    useLikelist.setState({ symbols: ["NVDA"] });

    useLikelist.getState().toggle("NVDA");

    expect(useLikelist.getState().symbols).toEqual([]);
  });

  it("has는 심볼 존재 여부를 반환한다", () => {
    useLikelist.setState({ symbols: ["MSFT"] });

    expect(useLikelist.getState().has("MSFT")).toBe(true);
    expect(useLikelist.getState().has("AAPL")).toBe(false);
  });
});
