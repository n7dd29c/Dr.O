// ProductKeywordAnalysisPage.tsx

"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
// --- 1. 제품별 AI 분석 데이터를 위한 임시 데이터 구조 ---
const productData = [
    {
        productId: 'P001',
        productName: '시그니처 블렌드 커피',
        totalReviews: 1250,
        positiveRatio: 85,
        // 제품별 상세 키워드 분석 결과
        keywordAnalysis: {
            positive: [
                { keyword: '깊은 풍미', count: 320, sentiment: 0.98 },
                { keyword: '부드러운 목넘김', count: 280, sentiment: 0.95 },
                { keyword: '가성비 최고', count: 180, sentiment: 0.92 },
            ],
            negative: [
                { keyword: '산미 강함', count: 150, sentiment: 0.15 },
                { keyword: '쓴맛', count: 90, sentiment: 0.25 },
                { keyword: '포장 부실', count: 60, sentiment: 0.30 },
            ],
        },
        aiSummary: "시그니처 블렌드는 '풍미'와 '부드러움'에서 높은 만족도를 보입니다. 하지만 '산미 강함'에 대한 부정적 피드백이 가장 많으므로, 산미를 낮추거나 '산미 없는 옵션'을 추가하는 것이 핵심 개선 사항입니다.",
    },
    {
        productId: 'P002',
        productName: '프리미엄 수제 케이크',
        totalReviews: 850,
        positiveRatio: 92,
        keywordAnalysis: {
            positive: [
                { keyword: '놀라운 비주얼', count: 210, sentiment: 0.97 },
                { keyword: '적당한 당도', count: 190, sentiment: 0.94 },
                { keyword: '선물용으로 완벽', count: 150, sentiment: 0.90 },
            ],
            negative: [
                { keyword: '높은 가격대', count: 120, sentiment: 0.20 },
                { keyword: '배송 느림', count: 70, sentiment: 0.10 },
                { keyword: '포장재 과도', count: 40, sentiment: 0.35 },
            ],
        },
        aiSummary: "수제 케이크는 '비주얼'과 '맛'에서 매우 높은 평가를 받아 마케팅 포인트가 명확합니다. 가장 큰 부정 요소는 '높은 가격대'이므로, 소량 포장 옵션 등 가격 접근성을 높이는 방안을 고민해야 합니다.",
    },
    {
        productId: 'P003',
        productName: '친환경 텀블러',
        totalReviews: 420,
        positiveRatio: 75,
        keywordAnalysis: {
            positive: [
                { keyword: '튼튼한 내구성', count: 100, sentiment: 0.96 },
                { keyword: '예쁜 디자인', count: 90, sentiment: 0.93 },
                { keyword: '환경 친화적', count: 80, sentiment: 0.90 },
            ],
            negative: [
                { keyword: '세척 불편', count: 70, sentiment: 0.18 },
                { keyword: '보온력 약함', count: 50, sentiment: 0.12 },
                { keyword: '뚜껑 누수', count: 30, sentiment: 0.05 },
            ],
        },
        aiSummary: "친환경 텀블러는 제품의 '내구성'과 '친환경성'은 긍정적이나, 사용성 측면인 '세척 불편'과 '보온력'에 대한 불만이 집중됩니다. 다음 모델 개발 시 이 기능적인 문제 해결이 시급합니다.",
    },
];

// 헬퍼 함수: 키워드를 뱃지 형태로 표시
const KeywordBadge = ({ keyword, count, sentiment }: { keyword: string, count: number, sentiment: number }) => {
    const isPositive = sentiment > 0.5;
    const colorClass = isPositive ? 'bg-green-100 text-green-700 ring-green-500/10' : 'bg-red-100 text-red-700 ring-red-500/10';
    const sentimentText = isPositive ? `(+${Math.round(sentiment * 100)}%)` : `(-${Math.round((1 - sentiment) * 100)}%)`;

    return (
        <span className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ring-1 ring-inset mr-3 mb-2 ${colorClass}`}>
            {keyword} ({count}회) <span className="ml-2 text-xs font-normal opacity-70">{sentimentText}</span>
        </span>
    );
};

// --- 컴포넌트 시작 ---
export default function ProductKeywordAnalysisPage() {
    const [selectedProductId, setSelectedProductId] = useState(productData[0].productId);

    // 선택된 제품의 데이터를 효율적으로 찾기
    const selectedProduct = useMemo(() => {
        return productData.find(p => p.productId === selectedProductId);
    }, [selectedProductId]);

    // 제품 선택 옵션 리스트
    const productOptions = productData.map(p => ({
        id: p.productId,
        name: p.productName
    }));

    if (!selectedProduct) {
        return <div className="p-8 text-center text-red-500">제품 분석 데이터를 찾을 수 없습니다.</div>;
    }

    const { keywordAnalysis, aiSummary, totalReviews, positiveRatio } = selectedProduct;

    return (
        <div className="p-8 font-sans bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2 border-b pb-2">제품별 키워드 심층 분석</h1>
            <p className="text-lg text-slate-500 mb-8">선택된 제품의 고객 리뷰를 분석한 결과를 바탕으로 제품 개선 전략을 수립합니다.</p>

            {/* A. 제품 선택 드롭다운 및 요약 정보 */}
            <section className="mb-10 p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <label htmlFor="product-select" className="text-xl font-bold text-slate-700 whitespace-nowrap">
                        제품 선택:
                    </label>
                    <select
                        id="product-select"
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg text-lg font-semibold bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {productOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex space-x-6 text-lg text-slate-600">
                    <p><strong>총 리뷰 분석:</strong> <span className="font-bold text-slate-800">{totalReviews}건</span></p>
                    <p>
                        <strong>긍정 리뷰 비율:</strong> 
                        <span className={`font-bold ${positiveRatio >= 85 ? 'text-green-600' : 'text-orange-500'}`}>
                            {positiveRatio}%
                        </span>
                    </p>
                </div>
            </section>

            {/* B. AI 개선 리포트 */}
            <section className="mb-10 p-8 bg-indigo-50 rounded-xl shadow-2xl border-l-4 border-indigo-600">
                <h2 className="text-3xl font-bold text-indigo-700 mb-4">🤖 AI 분석 기반 개선 리포트</h2>
                <div className="p-4 bg-white border border-indigo-300 rounded-lg shadow-inner">
                    <p className="text-lg font-semibold text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {aiSummary}
                    </p>
                </div>
            </section>

            {/* C. 키워드 상세 분석 (긍정/부정) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* C-1. Top 긍정 키워드 */}
                <section className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-green-500">
                    <h3 className="text-2xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">👍 Top 긍정 키워드</h3>
                    <div className="flex flex-wrap">
                        {keywordAnalysis.positive.map(item => (
                            <KeywordBadge key={item.keyword} {...item} />
                        ))}
                    </div>
                </section>

                {/* C-2. Top 부정 키워드 */}
                <section className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-red-500">
                    <h3 className="text-2xl font-bold text-red-700 mb-4 border-b border-red-300 pb-2">👎 Top 부정 키워드</h3>
                    <div className="flex flex-wrap">
                        {keywordAnalysis.negative.map(item => (
                            <KeywordBadge key={item.keyword} {...item} />
                        ))}
                    </div>
                </section>
            </div>
            
            {/* D. 데이터 시각화 공간 (확장용) */}
            <section className="mt-10 p-6 bg-white rounded-xl shadow-lg">
                 <h3 className="text-2xl font-bold text-slate-700 mb-4">키워드 발생 빈도 및 추이 차트 (Placeholder)</h3>
                 <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500 border rounded-lg">
                    [이 공간은 향후 차트 라이브러리 (예: Chart.js, Recharts)를 사용하여 데이터를 시각화할 영역입니다.]
                 </div>
            </section>
        </div>
    );
}