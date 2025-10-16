import Link from 'next/link';

// --- 1. AI 분석 데이터를 위한 임시 데이터 구조 ---
const keywordAnalysisData = {
    // 1. 전체 키워드 통계 (Overall Trends)
    overallTopKeywords: [
        { keyword: '맛있다', count: 580 },
        { keyword: '친절하다', count: 450 },
        { keyword: '가격 비쌈', count: 320 },
        { keyword: '재방문 의사', count: 290 },
        { keyword: '포장 상태', count: 250 },
        { keyword: '느린 응대', count: 210 },
        { keyword: '청결함', count: 180 },
        { keyword: '메뉴 다양성', count: 150 },
        { keyword: '좌석 불편', count: 130 },
        { keyword: '예약 용이', count: 110 },
    ],
    // 2. 긍정 키워드
    positiveKeywords: [
        { keyword: '최고의 맛', sentiment: 0.99, count: 120 },
        { keyword: '직원 친절', sentiment: 0.95, count: 180 },
        { keyword: '가성비 만족', sentiment: 0.92, count: 70 },
        { keyword: '빠른 서비스', sentiment: 0.88, count: 90 },
    ],
    // 3. 부정 키워드
    negativeKeywords: [
        { keyword: '가격 부담', sentiment: 0.20, count: 150 },
        { keyword: '응대 느림', sentiment: 0.15, count: 110 },
        { keyword: '좌석 좁음', sentiment: 0.35, count: 80 },
        { keyword: '메뉴 품절', sentiment: 0.10, count: 50 },
    ],
    // 4. AI 분석 리포트
    aiReport: {
        title: "2024년 4분기 리뷰 기반 핵심 개선 리포트",
        summary: "전반적으로 음식 '맛'과 '직원 친절도'에 대한 높은 만족도를 보였으나, '가격 부담'과 '느린 응대 속도'가 고객 만족도를 떨어뜨리는 주요 요인으로 분석되었습니다. 긍정적인 핵심은 유지하고, 주요 부정 키워드에 대한 즉각적인 개선 조치가 필요합니다.",
        improvementPoints: [
            { id: 1, category: '가격/가치', detail: "‘가격 부담’ 키워드가 전체 부정 키워드 중 1위를 차지하고 있습니다. 특정 메뉴에 대한 가격 조정 또는 가성비를 높일 수 있는 세트 메뉴 개발을 검토해야 합니다.", impactScore: 9.2 },
            { id: 2, category: '운영 효율성', detail: "‘느린 응대’ 및 ‘메뉴 품절’ 키워드는 주말 및 피크 시간대에 집중됩니다. 피크 시간대 직원 배치 최적화 및 인기 메뉴의 재고 관리 시스템 개선이 시급합니다.", impactScore: 8.5 },
            { id: 3, category: '시설 환경', detail: "‘좌석 좁음’에 대한 불만이 꾸준히 발생합니다. 특히 4인 이상 테이블 배치 시 공간 활용을 재검토하거나, 편안한 좌석에 대한 고객 피드백을 반영해야 합니다.", impactScore: 6.8 },
        ]
    }
};

// --- 컴포넌트 시작 ---
export default function KeywordsAnalysisPage() {
    const data = keywordAnalysisData;
    const totalReviewCount = data.overallTopKeywords.reduce((sum, item) => sum + item.count, 0);

    // AI 개선 리포트의 영향 점수(Impact Score)에 따른 색상 정의 함수
    const getImpactColor = (score: number) => {
        if (score >= 9.0) return 'text-red-600 bg-red-100';
        if (score >= 8.0) return 'text-orange-600 bg-orange-100';
        return 'text-blue-600 bg-blue-100';
    };

    // --- RENDER ---
    return (
        <div className="p-8 font-sans bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2 border-b pb-2">키워드 통계 및 AI 분석 리포트</h1>
            <p className="text-lg text-slate-500 mb-8">리뷰 데이터를 기반으로 한 AI 분석 보고서입니다. (총 분석 리뷰: {totalReviewCount}건)</p>

            {/* A. AI 핵심 개선 리포트 (가장 중요) */}
            <section className="mb-10 p-8 bg-white rounded-xl shadow-2xl border-t-4 border-indigo-600">
                <h2 className="text-3xl font-bold text-indigo-700 mb-4">📘 {data.aiReport.title}</h2>
                
                {/* 리포트 요약 */}
                <div className="p-4 mb-6 bg-indigo-50 border-l-4 border-indigo-300 rounded-lg">
                    <p className="text-lg font-semibold text-indigo-800 whitespace-pre-wrap">
                        "{data.aiReport.summary}"
                    </p>
                </div>

                {/* 개선점 목록 */}
                <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-4 border-b pb-2">핵심 개선 권고 사항 (Impact Score 순)</h3>
                <div className="space-y-4">
                    {data.aiReport.improvementPoints.map((point) => (
                        <div key={point.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm transition hover:shadow-md">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-gray-500 uppercase">{point.category}</span>
                                <span className={`px-3 py-1 text-sm font-extrabold rounded-full ${getImpactColor(point.impactScore)}`}>
                                    Impact Score: {point.impactScore}
                                </span>
                            </div>
                            <p className="font-semibold text-slate-800">{point.detail}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* B. 키워드 통계 (2-Column Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* B-1. 전체 키워드 트렌드 */}
                <section className="p-6 bg-white rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-slate-700 mb-4 border-b pb-2">🏆 전체 키워드 트렌드 (Top 10)</h3>
                    <ul className="space-y-3">
                        {data.overallTopKeywords.map((item, index) => (
                            <li key={item.keyword} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                <span className="font-medium text-slate-800">
                                    {index + 1}. {item.keyword}
                                </span>
                                <span className="text-sm font-bold text-gray-600">{item.count}회</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* B-2. 긍정 / 부정 키워드 분석 */}
                <section className="space-y-8">
                    {/* 긍정 키워드 */}
                    <div className="p-6 bg-green-50 rounded-xl shadow-lg border border-green-200">
                        <h3 className="text-2xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">👍 긍정 키워드 분석</h3>
                        <ul className="space-y-3">
                            {data.positiveKeywords.map((item) => (
                                <li key={item.keyword} className="flex justify-between items-center">
                                    <span className="font-semibold text-green-800">{item.keyword}</span>
                                    <span className="text-sm text-gray-600">
                                        {item.count}회 ({Math.round(item.sentiment * 100)}% 긍정)
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 부정 키워드 */}
                    <div className="p-6 bg-red-50 rounded-xl shadow-lg border border-red-200">
                        <h3 className="text-2xl font-bold text-red-700 mb-4 border-b border-red-300 pb-2">👎 부정 키워드 분석</h3>
                        <ul className="space-y-3">
                            {data.negativeKeywords.map((item) => (
                                <li key={item.keyword} className="flex justify-between items-center">
                                    <span className="font-semibold text-red-800">{item.keyword}</span>
                                    <span className="text-sm text-gray-600">
                                        {item.count}회 ({Math.round((1 - item.sentiment) * 100)}% 부정)
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}