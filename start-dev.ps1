# Dr.O 개발 환경 시작 스크립트

Write-Host "🚀 Dr.O 개발 환경을 시작합니다..." -ForegroundColor Green

# 환경 변수 파일 확인
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env 파일이 없습니다. env.example을 복사하여 설정하세요." -ForegroundColor Yellow
    Copy-Item "env.example" ".env"
    Write-Host "📝 .env 파일을 생성했습니다. Gemini API 키를 설정하세요." -ForegroundColor Cyan
}

# Docker Compose로 모든 서비스 시작
Write-Host "🐳 Docker Compose로 서비스들을 시작합니다..." -ForegroundColor Blue
docker-compose up -d

Write-Host "✅ 서비스가 시작되었습니다!" -ForegroundColor Green
Write-Host "📊 프론트엔드: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 백엔드 API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "🗄️  데이터베이스: localhost:5432" -ForegroundColor Cyan

Write-Host "`n📋 유용한 명령어들:" -ForegroundColor Yellow
Write-Host "  - 로그 확인: docker-compose logs -f" -ForegroundColor White
Write-Host "  - 서비스 중지: docker-compose down" -ForegroundColor White
Write-Host "  - 서비스 재시작: docker-compose restart" -ForegroundColor White
