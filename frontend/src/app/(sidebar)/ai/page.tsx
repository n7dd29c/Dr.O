'use client';

import { useState, useCallback } from 'react';

// --- 더미 데이터 ---

// 시뮬레이션할 고객 리뷰 데이터 (부정/악성 리뷰라고 가정)
const dummyReviews: string[] = [
  "배송은 빨랐지만, 서비스가 너무 불친절하고 정말 별로였습니다. 이런 식으로 장사하지 마세요. 완전 엉망진창이네요.",
  "제품은 깔끔하고 좋았는데, 직원의 태도가 정말 실망스러웠습니다. 다시는 오고 싶지 않을 정도로 불쾌했어요.",
  "가성비는 최고지만, 솔직히 '불만족'스러웠던 점이 많습니다. 이 가격이라 참는 거지, 다음에는 안 올 겁니다. 개선이 필요해요.",
  "팀원 간 소통 문제가 심각해요. 개발 프로세스도 엉망이고, 프로젝트 진행이 너무 지연되는 것 같아 불안해요.",
  "리뷰를 달까 말까 고민했는데, 솔직히 이 정도의 불쾌함은 처음이라 남깁니다. 다음에 방문할 때는 제발 개선되기를 바랍니다."
];

// AI가 생성할 답변 데이터 (리뷰 순서와 매칭)
const dummyAIResponses: string[] = [
  "고객님, 서비스 이용에 불편을 드려 대단히 죄송합니다. 불친절하고 엉망진창이었다는 피드백을 무겁게 받아들이고 해당 직원 교육을 강화하여 다시는 이러한 일이 발생하지 않도록 조치하겠습니다. 다음 방문 시에는 더 나은 경험을 약속드립니다. 진심으로 사과드립니다. (AI 초안)",
  "저희 직원의 태도로 인해 실망하고 불쾌하셨다니 죄송한 마음 금할 길이 없습니다. 해당 직원에 대한 서비스 교육을 즉시 실시하고, 모든 직원이 고객 응대에 최선을 다하도록 개선하겠습니다. 다시 한번 사과드립니다. (AI 초안)",
  "가성비는 좋았으나 불만족스러운 점이 많았다는 말씀 감사합니다. 불편하셨던 점을 상세히 파악하여 개선이 필요한 부분을 신속하게 처리하겠습니다. 고객님의 소중한 피드백에 감사드립니다. (AI 초안)",
  "팀원 간 소통 문제와 프로젝트 지연에 대한 우려 감사합니다. 현재 개발 프로세스 전반을 재점검하고 있으며, 소통 채널을 투명하게 공개하여 불안감을 해소하고 안정적인 프로젝트 진행을 약속드립니다. (AI 초안)",
  "불쾌감을 드린 점 진심으로 사과드립니다. 고객님의 의견을 바탕으로 서비스 품질을 즉시 재점검하겠습니다. 다음 방문 시에는 긍정적인 경험을 하실 수 있도록 최선을 다하겠습니다. (AI 초안)"
];

// 로딩 스피너 SVG
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3" />
);

// --- 개별 AI 답변 카드 컴포넌트 ---
const AIReviewCard = ({ review, index }: { review: string; index: number }) => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // AI 응답 생성 시뮬레이션
  const generateAIResponse = useCallback(() => {
    if (isLoading || response) return;

    setIsLoading(true);
    // 실제 LLM 호출 대신 2초 지연 후 더미 응답 설정
    setTimeout(() => {
      // 해당 리뷰에 맞는 더미 답변을 가져옵니다.
      setResponse(dummyAIResponses[index % dummyAIResponses.length]); 
      setIsLoading(false);
    }, 2000); 
  }, [isLoading, response, index]);

  return (
    <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <span className="text-lg font-bold text-slate-700">리뷰 #{index + 1}</span>
        {/* 부정 리뷰 강조 */}
        <div className="rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
          부정/악성 키워드 감지
        </div>
      </div>
      
      {/* 원본 리뷰 내용 */}
      <div className="mb-6">
        <h4 className="mb-2 text-sm font-semibold text-slate-500">고객 리뷰</h4>
        <p className="text-base text-slate-800 italic bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner">
            {review}
        </p>
      </div>

      {/* AI 답변 영역 */}
      <div className="mt-6 pt-4 border-t border-dashed">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
            {/* AI 아이콘 (Lucide: Sparkle) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                <path d="M18.75 19.5l1.5-1.5m-3 3 1.5-1.5M18.75 4.5l1.5-1.5m-3 3 1.5-1.5" />
            </svg>
            dr.o AI 자동 응답 초안
        </h4>

        {response ? (
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-300 shadow-sm">
            <p className="text-base text-slate-900 whitespace-pre-wrap">
              {response}
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-24 bg-blue-50 rounded-xl border border-blue-300">
            <LoadingSpinner />
            <span className="text-blue-500 font-medium ml-2">AI가 답변을 생성 중입니다...</span>
          </div>
        ) : (
          <div className="text-center p-4">
            <button
              onClick={generateAIResponse}
              className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition duration-150 transform hover:scale-105"
            >
              AI 답변 생성 요청
            </button>
            <p className="mt-3 text-xs text-slate-400">클릭하면 dr.o AI가 리뷰에 최적화된 답변 초안을 생성합니다.</p>
          </div>
        )}
      </div>

      {/* 답변 편집/복사 버튼 */}
      {response && (
        <div className="mt-4 flex justify-end gap-3 border-t pt-4">
            <button 
                className="text-sm px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
                onClick={() => {
                    // 클립보드 복사 시뮬레이션
                    navigator.clipboard.writeText(response);
                    // 실제 환경에서는 사용자에게 성공 메시지를 표시해야 합니다.
                    console.log("답변이 클립보드에 복사되었습니다.");
                }}
            >
                답변 복사
            </button>
            <button className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 transition">
                답변 수정하기
            </button>
        </div>
      )}
    </div>
  );
};

// --- 메인 페이지 컴포넌트 ---
export default function AIManagerPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 상단 바 */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xl font-extrabold text-blue-700">dr.o AI</span>
            <span className="text-sm font-semibold text-slate-700">/ 자동 응답 관리</span>
          </div>
          <a
            href="/" // 대시보드 링크 시뮬레이션
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 font-medium hover:bg-slate-100 transition"
          >
            대시보드로 돌아가기
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            AI 기반 부정 리뷰 응답 초안 생성
          </h1>
          <p className="text-base text-slate-500">
            시스템이 선별한 부정 리뷰에 대해 dr.o AI가 최적화된 고객 응대 답변을 자동으로 생성합니다.
          </p>
        </section>

        {/* AI 답변 리뷰 목록 */}
        <div className="space-y-8">
          {dummyReviews.map((review, index) => (
            <AIReviewCard key={index} review={review} index={index} />
          ))}
        </div>
        
        <div className="mt-10 text-center text-sm text-slate-400">
          <span className="font-semibold text-slate-600">총 관리 대상 리뷰 수:</span> {dummyReviews.length}건
          <p>답변을 생성하려면 'AI 답변 생성 요청' 버튼을 눌러주세요.</p>
        </div>
      </div>
    </div>
  );
}
