# Dr.O - AI 리뷰 답변 시스템

AI를 활용한 자동 리뷰 답변 생성 및 관리 시스템입니다.

## 🏗️ 프로젝트 구조

```
Dr.O/
├── frontend/          # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/       # Next.js 14 App Router
│   │   ├── components/ # React 컴포넌트
│   │   └── lib/       # API 클라이언트
│   └── package.json
├── backend/           # FastAPI 백엔드
│   ├── app/           # FastAPI 애플리케이션
│   └── requirements.txt
├── docker-compose.yml # 통합 개발 환경
└── start-dev.ps1     # 개발 환경 시작 스크립트
```

## 🚀 빠른 시작

### 1. 환경 설정

1. `.env` 파일 생성:
   ```bash
   cp env.example .env
   ```

2. `.env` 파일에서 Gemini API 키 설정:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### 2. 개발 환경 시작

PowerShell에서 실행:
```powershell
.\start-dev.ps1
```

또는 수동으로:
```bash
docker-compose up -d
```

### 3. 접속

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:8000
- **API 문서**: http://localhost:8000/docs

## 🛠️ 개발 도구

### 유용한 명령어

```bash
# 로그 확인
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f frontend
docker-compose logs -f backend

# 서비스 중지
docker-compose down

# 서비스 재시작
docker-compose restart

# 데이터베이스 초기화
docker-compose down -v
docker-compose up -d
```

### 개별 서비스 실행

#### 프론트엔드만 실행
```bash
cd frontend
npm install
npm run dev
```

#### 백엔드만 실행
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📊 주요 기능

- **리뷰 스크래핑**: 외부 사이트에서 리뷰 자동 수집
- **AI 답변 생성**: Gemini AI를 활용한 자동 답변 생성
- **감성 분석**: 리뷰의 긍정/부정/중립 분석
- **대시보드**: 실시간 통계 및 모니터링
- **답변 관리**: 생성된 답변 검토 및 수정

## 🔧 API 엔드포인트

- `GET /stats` - 통계 데이터
- `GET /reviews/recent` - 최근 리뷰 목록
- `GET /reviews/pending` - 답변 대기 리뷰
- `POST /scrape` - 스크래핑 실행
- `POST /generate-replies` - 답변 생성
- `POST /post-replies` - 답변 게시

자세한 API 문서는 http://localhost:8000/docs 에서 확인할 수 있습니다.

## 🐳 Docker 설정

이 프로젝트는 Docker Compose를 사용하여 다음 서비스들을 관리합니다:

- **postgres**: PostgreSQL 데이터베이스
- **backend**: FastAPI 백엔드 서버
- **frontend**: Next.js 프론트엔드 서버

## 📝 환경 변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `GEMINI_API_KEY` | Gemini AI API 키 | 필수 |
| `DATABASE_URL` | 데이터베이스 연결 URL | postgresql://postgres:password@postgres:5432/review_automation |
| `NEXT_PUBLIC_API_URL` | 프론트엔드에서 사용할 API URL | http://localhost:8000 |

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다
