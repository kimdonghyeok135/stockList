프로젝트 한 줄 요약

- Fintech / Data Visualization

데모 링크

- https://stock-list-p82m.vercel.app/stockList

핵심 기능

종목 리스트, 검색, 정렬, 관심목록(persist)

기술 스택

Next(App Router), React Query(v5), Zustand(persist), lightweight-charts, Yahoo Finance chart API, Finnhub quote API

아키텍처(간단 다이어그램)

app routes / api routes / lib(fetchers) / store(zustand)

React Query 설계

queryKey, refetchInterval(5m), error/loading 전략

테스트

무엇을 왜 테스트했고(스토어/유틸/페이지), 어떤 도구를 썼는지

트러블슈팅 & 개선

“sort in-place 이슈 방지 위해 copy 후 sort 적용” 같은 식으로 실무 티 나게
