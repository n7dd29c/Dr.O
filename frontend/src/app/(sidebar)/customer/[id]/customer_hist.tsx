"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

// --- 임시 고객 데이터 (변경 없음) ---
const mockCustomerData = {
  id: "user123",
  name: "김민준",
  joinDate: "2023-01-15",
  totalReviews: 28,
  loyaltyGrade: 'VIP',
  avatarUrl: "/avatar-placeholder.png",
  analysis: {
    tendency: "가격보다 품질과 서비스 경험을 중시하는 경향이 있습니다. 특히 '맛'과 '분위기'에 대한 긍정적 언급이 많으며, 신메뉴에 대한 시도를 즐기는 미식가 타입입니다. 다만, '주차' 문제나 '대기 시간'과 같은 편의성 문제에는 다소 민감한 반응을 보입니다.",
    mainProducts: ["시그니처 스테이크", "오늘의 파스타", "하우스 와인"],
    customerDNA: ["품질 중시", "신메뉴 탐험가", "분위기 선호", "편의성 민감"],
  },
  keywords: [
    { word: "맛", count: 18, sentiment: 'positive' }, { word: "분위기", count: 12, sentiment: 'positive' },
    { word: "친절", count: 9, sentiment: 'positive' }, { word: "주차", count: 4, sentiment: 'negative' },
    { word: "대기", count: 3, sentiment: 'negative' }, { word: "신메뉴", count: 7, sentiment: 'positive' },
  ],
  reviews: [
    { date: "23.05", rating: 4, comment: "...", product: "..." }, { date: "23.08", rating: 5, comment: "...", product: "..." },
    { date: "23.11", rating: 3, comment: "...", product: "..." }, { date: "24.03", rating: 5, comment: "...", product: "..." },
    { date: "24.07", rating: 4, comment: "...", product: "..." }, { date: "24.09", rating: 5, comment: "...", product: "..." },
  ],
};

// --- 메인 페이지 컴포넌트 ---
export default function CustomerPage({ params }: { params: { id: string } }) {
  const customer = mockCustomerData;
  
  // 등급 뱃지 스타일
  const gradeClassName = customer.loyaltyGrade === 'VIP' 
    ? 'bg-yellow-400 text-black' 
    : 'bg-slate-200 text-slate-800';
  
  // 키워드 폰트 크기 계산 함수
  const getKeywordFontSize = (count: number) => {
    if (count > 15) return 'text-3xl';
    if (count > 10) return 'text-2xl';
    if (count > 5) return 'text-xl';
    return 'text-lg';
  };

  return (
    // 배경색을 어두운 회색으로 변경
    <div className="bg-slate-900 min-h-screen p-8 font-sans text-slate-300">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">고객 스토리 분석</h1>
        <Link href="/customer" className="text-yellow-400 hover:underline">← 고객 목록으로 돌아가기</Link>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* 1. 고객 프로필 */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-700 rounded-full mb-4"></div>
            <h2 className="text-2xl font-bold text-white">{customer.name}</h2>
            <p className="text-slate-400 text-sm">가입일: {customer.joinDate}</p>
            <span className={`px-3 py-1 text-sm font-bold rounded-full mt-2 ${gradeClassName}`}>{customer.loyaltyGrade}</span>
            <p className="mt-4 text-slate-300">총 <span className="font-bold text-yellow-400">{customer.totalReviews}개</span>의 리뷰 작성</p>
          </div>

          {/* 2. 고객 성향 (DNA) */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">고객 성향 (DNA)</h3>
            <div className="flex flex-wrap gap-2">
              {customer.analysis.customerDNA.map(dna => (
                <span key={dna} className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
                  {dna}
                </span>
              ))}
            </div>
          </div>

          {/* 3. 주요 구매 상품 */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">주요 구매 메뉴</h3>
            <ul className="space-y-2">
              {customer.analysis.mainProducts.map(product => (
                <li key={product} className="text-slate-400">∙ {product}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* 4. 만족도 변화 추이 차트 */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg h-80">
            <h3 className="text-lg font-bold text-white mb-4">만족도 변화 추이</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customer.reviews} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis domain={[1, 5]} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Line type="monotone" dataKey="rating" stroke="#facc15" strokeWidth={2} dot={{ r: 4, fill: '#facc15' }} activeDot={{ r: 8, stroke: '#facc15' }} name="평점"/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 5. 키워드 분석 (워드 클라우드) */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">키워드 분석</h3>
            <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 p-4">
              {customer.keywords.map(kw => (
                <span key={kw.word} className={`font-bold ${getKeywordFontSize(kw.count)} ${
                  kw.sentiment === 'positive' ? 'text-yellow-300' : 'text-slate-500'
                }`}>
                  {kw.word}
                </span>
              ))}
            </div>
          </div>
          
          {/* 6. 리뷰 히스토리 */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">리뷰 히스토리</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {customer.reviews.slice().reverse().map((review, index) => (
                <div key={index} className="border-l-2 border-slate-700 pl-4 py-2 relative">
                   <span className={`absolute -left-1.5 top-3 w-3 h-3 rounded-full ${review.rating >= 4 ? 'bg-yellow-400' : 'bg-slate-600'}`}></span>
                   <p className="font-bold text-slate-400 text-sm">{review.date}</p>
                   <p className="font-semibold text-white my-1">
                     {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                     <span className="ml-2 text-sm text-slate-400">({review.product})</span>
                   </p>
                   <p className="text-slate-300 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}