# Homefit Tracker

7일 동안 하루 15분 홈트를 기록하는 반응형 웹앱입니다.

## 실행

```sh
npm ci
npm run dev
```

## 빌드

```sh
npm run build
```

- Framework: Vite + React + TypeScript
- Root Directory: repository root
- Build Command: `npm run build`
- Output Directory: `dist/client`
- 기록은 현재 브라우저의 localStorage에 저장됩니다.
- 계정, 외부 API, 데이터베이스 없이 동작합니다.
