// 1. 데이터 파일에서 고객 정보를 찾는 함수를 import 합니다.
import { findCustomerById } from '@/app/_data/blacklistData';

interface CustomerDetailPageProps {
  params: {
    id: string;
  };
}

// --- 상세 페이지 컴포넌트 ---
export default function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  const customerId = params.id;
  const customer = findCustomerById(customerId);

  if (!customer) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">고객 정보를 찾을 수 없습니다 (ID: {customerId})</h1>
        <p className="text-slate-600">URL을 확인하거나 고객 관리 목록으로 돌아가십시오.</p>
      </div>
    );
  }

  // 1. 기본 텍스트 색상
  const textColors = {
    primary: 'text-gray-800',    // 기본 본문
    secondary: 'text-gray-500',  // 부가 정보, 라벨
    highlight: 'text-red-600',   // 강조하고 싶은 텍스트 (부정 감성, 악의성 점수 등)
  };

  // 2. 등급(Grade) 뱃지 스타일
  const gradeStyles: { [key: string]: string } = {
    evil: 'bg-purple-100 text-purple-800',
    worst: 'bg-red-100 text-red-800',
    bad: 'bg-amber-100 text-amber-800',
    New: 'bg-gray-100 text-gray-800',
  };
  const gradeColor = gradeStyles[customer.grade] || gradeStyles['New'];

  // 3. 현재 상태(Status) 뱃지 스타일
  const statusStyles: { [key: string]: string } = {
    차단: 'bg-red-600 text-white',
    '주의 필요': 'bg-orange-500 text-white',
    활동중: 'bg-yellow-400 text-black',
  };
  const statusColor = statusStyles[customer.status];
  
  // --- RENDER ---
  return (
    <div className="space-y-6">
      <header>
        <h1 className={`text-2xl font-bold ${textColors.primary}`}>블랙리스트 고객 상세 관리</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* L-Column (고객 개요 + AI 분석 결과) */}
        <div className="lg:col-span-1 space-y-6">
            <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm min-h-[200px]">
                <h2 className={`text-lg font-semibold border-b pb-3 mb-4 ${textColors.primary}`}>고객 개요</h2>
                <div className="space-y-3 text-sm">
                    <div className="flex">
                        <span className={`w-20 font-semibold ${textColors.secondary}`}>고객명:</span>
                        <span className={textColors.primary}>{customer.name}</span>
                    </div>
                    <div className="flex items-center">
                        <span className={`w-20 font-semibold ${textColors.secondary}`}>등급:</span>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${gradeColor}`}>{customer.grade}</span>
                    </div>
                    <div className="flex items-center">
                        <span className={`w-20 font-semibold ${textColors.secondary}`}>현재 상태:</span>
                        <span className={`px-2 py-1 text-xs font-bold rounded-md ${statusColor}`}>{customer.status}</span>
                    </div>
                    <div className="flex">
                        <span className={`w-20 font-semibold ${textColors.secondary}`}>블랙 사유:</span>
                        <span className={`${textColors.highlight} font-semibold`}>{customer.reason}</span>
                    </div>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className={`text-lg font-semibold border-b pb-3 mb-4 ${textColors.primary}`}>AI 리뷰 분석 결과</h2>
                <div className="space-y-4 text-sm">
                    <p className={`p-4 bg-gray-50 rounded-md border ${textColors.primary}`}>{customer.analysisResults.summary}</p>
                    
                    <div className="flex justify-between items-center pt-2">
                        <span className={`font-semibold ${textColors.secondary}`}>감성 분석 결과:</span>
                        <span className={`font-bold ${textColors.highlight}`}>{customer.analysisResults.sentiment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className={`font-semibold ${textColors.secondary}`}>핵심 주제:</span>
                        <span className={textColors.primary}>{customer.analysisResults.topic}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className={`font-semibold ${textColors.secondary}`}>악의성 점수:</span>
                        <span className={`text-2xl font-bold ${textColors.highlight}`}>{customer.analysisResults.maliciousScore} / 10</span>
                    </div>
                    <div>
                        <span className={`font-semibold mb-2 block ${textColors.secondary}`}>주요 키워드:</span>
                        <div className="flex flex-wrap gap-2">
                          {customer.analysisResults.keywords.map(keyword => (
                            <span key={keyword} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-md">
                              {keyword}
                            </span>
                          ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>

        {/* R-Column (원본 리뷰 및 조치 내역) */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm min-h-[226px]">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className={`text-lg font-semibold ${textColors.primary}`}>원본 악성 리뷰 내용</h2>
                <span className={`text-sm ${textColors.secondary}`}>작성일: {customer.reviewDate}</span>
            </div>
            <p className={`p-4 bg-red-50 border border-red-200 rounded-md italic ${textColors.primary}`}>{customer.originalReview}</p>
            <p className={`mt-3 text-xs ${textColors.secondary}`}>
              * 해당 리뷰는 AI 분석 결과 '악의적 의도' 키워드가 높게 검출되어 블랙리스트 사유로 지정되었습니다.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className={`text-lg font-semibold border-b pb-3 mb-4 ${textColors.primary}`}>블랙리스트 조치 히스토리</h2>
            <ul className="space-y-2">
              {customer.statusHistory.map((history, index) => (
                <li key={index} className={`p-3 bg-gray-50 rounded-md text-sm border ${textColors.primary}`}>
                  {history}
                </li>
              ))}
            </ul>
          </section>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button className="px-5 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 text-sm">
              영구 차단 (Block)
            </button>
            <button className="px-5 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 text-sm">
              상태 변경 및 메모 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}