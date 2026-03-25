# Stock List

미국 주식 목록을 조회하고, 검색/정렬/관심종목 저장 및 상세 정보를 확인할 수 있는 모바일 중심 토이 프로젝트입니다.

배포 링크: https://stock-list-p82m.vercel.app

## 프로젝트 소개

이 프로젝트는 Next.js App Router 기반으로 만든 주식 조회 서비스입니다.  
단순히 데이터를 보여주는 데서 끝나지 않고, 목록 조회부터 상세 조회, 차트, 뉴스, 관심종목 저장까지 하나의 흐름으로 연결해보는 데 초점을 맞췄습니다.

특히 다음 부분을 연습하는 것을 목표로 했습니다.

- App Router 기반 라우팅과 API Route 구성
- 외부 API 연동과 응답 데이터 가공
- React Query를 활용한 클라이언트 데이터 패칭
- Zustand persist를 활용한 관심종목 상태 관리
- 테스트 가능한 구조로 로직 분리
- CSR과 SSR을 어떠한 이유로 스스로 판단을 하고 설계
- 테스트를 충분히 함으로써 안정적인 운용

## 주요 기능

- 주식 목록 조회
- 종목 검색
- 가격 / 등락률 정렬
- 관심종목 저장 및 유지
- 종목 상세 페이지 조회
- 캔들 차트 조회
- 종목 관련 뉴스 조회

## 기술 스택

- Next.js 16
- React 19
- TypeScript
- React Query v5
- Zustand
- Tailwind CSS
- Vitest
- Testing Library
