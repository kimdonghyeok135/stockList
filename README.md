# stockList

주식 리스트 조회, 검색, 정렬, 관심종목 저장 기능을 구현한 모바일 웹 프로젝트입니다.

## 데모링크

- https://stock-list-p82m.vercel.app

## 주요 기능

- 종목 리스트 조회
- 검색
- 가격 / 등락률 정렬
- 관심종목 저장(persist)
- 종목 상세 페이지 이동

## 기술 스택

- Next.js App Router
- TypeScript
- React Query v5
- Zustand persist
- Tailwind CSS

## 폴더 구조

- app: 라우트, providers, api
- components: UI 컴포넌트
- lib: fetch / 정렬 유틸
- types: 공통 타입

## 고민한 점

- 정렬 시 원본 배열이 변경되지 않도록 복사 후 sort 처리
- 전역 Provider 분리
- 리스트 / 검색 / 스켈레톤 UI 분리

## 아쉬운 점

- 테스트 코드 미작성
- 리스트 아이템 단위 분리 부족
- empty state 문구 고도화 필요

# stockList

A mobile web project that displays a list of stocks with search, sorting, and favorite (watchlist) features.

## Demo

- https://stock-list-p82m.vercel.app

## Features

- View stock list
- Search stocks
- Sort by price or change rate
- Save favorite stocks (persisted)
- Navigate to stock detail page

## Tech Stack

- Next.js (App Router)
- TypeScript
- React Query v5
- Zustand (persist)
- Tailwind CSS

## Folder Structure

app
├─ api : API routes
├─ providers.tsx : Global providers (React Query, Toast)
├─ stockDetail : Stock detail page

components
├─ stock : Stock list related UI
├─ ToastHost : Global toast component

lib
├─ fetch utilities
├─ stock sorting logic

types
├─ shared TypeScript types
