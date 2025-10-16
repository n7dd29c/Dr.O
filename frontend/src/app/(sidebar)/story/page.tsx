// CustomerStoryPage.tsx

import Link from 'next/link';
// --- 1. 우수 고객 스토리텔링 데이터를 위한 임시 데이터 구조 ---
const customerStoryData = {
    // 1. 분석 대상 고객 정보
    customer: {
        id: 'VIP007',
        name: '정현우',
        grade: 'VIP',
        totalReviews: 45,
        positiveRatio: '98%',
        joinDate: '2022-05-10',
    },
    // 2. AI 분석 단계별 결과
    analysisProcess: [
        { 
            step: 1, 
            title: '리뷰 타임라인 및 키워드 수집', 
            icon: '🗓️',
            detail: '2022년 5월부터 현재까지 45개의 모든 리뷰를 수집했습니다. 초기에는 가성비 키워드, 최근에는 최애 메뉴, 직원 추천 키워드 언급이 주를 이룹니다.',
            dataSnippet: ['"벌써 세 번째 방문이네요!"', '"늘 만족하는 곳"', '"직원분 센스 최고"']
        },
        { 
            step: 2, 
            title: '감성 및 관계 변화 분석', 
            icon: '📈',
            detail: '시간이 지남에 따라 리뷰 감성 점수가 꾸준히 95점 이상으로 상승했습니다. 이는 단순한 고객을 넘어 충성도 높은 팬으로 관계가 발전했음을 의미합니다.',
            dataSnippet: ['2022년 평균 감성: 92점', '2024년 평균 감성: 98점', '충성도 지수: 9.7/10']
        },
        { 
            step: 3, 
            title: '핵심 가치 및 스토리 추출', 
            icon: '🔑',
            detail: 'AI는 정현우 고객의 리뷰 전체에서 편안함, 일관된 품질, 직원과의 교감이라는 핵심 가치를 추출했습니다. 이 가치를 기반으로 스토리를 생성합니다.',
            dataSnippet: ['핵심 테마: 일상 속 작은 행복', '스토리 컨셉: 숨겨진 아지트']
        },
    ],
    // 3. 최종 AI 생성 스토리
    finalStory: {
        title: "✨ 단골의 시간: 정현우 고객님의 '쉼표'가 되어준 1,250일의 기록",
        content: "2022년, 정현우 고객님은 일상 속에서 잠시 쉴 곳을 찾았습니다. 처음에는 저희 매장의 '가성비 좋은 커피'에 끌려 방문하셨지만, 시간이 지나면서 늘 한결같은 '일관된 품질'과, 이름을 기억하고 먼저 안부를 건네는 '따뜻한 직원들의 미소'에 이곳을 '일상 속의 쉼표'이자 '나만의 아지트'로 여기게 되었습니다. 45개의 리뷰에 담긴 긍정 에너지는 저희 Dr.O 매장의 성장을 이끈 가장 소중한 기록입니다. 앞으로도 고객님의 소중한 시간을 함께하겠습니다."
    }
};

// --- 컴포넌트 시작 ---
export default function CustomerStoryPage() {
    const data = customerStoryData;

    // --- RENDER ---
    return (
        <div className="p-8 font-sans bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2 border-b pb-2">우수 고객 리뷰 스토리텔링</h1>
            <p className="text-lg text-slate-500 mb-8">AI가 선정한 우수 고객의 리뷰를 분석하여 마케팅에 활용할 수 있는 스토리를 생성합니다.</p>

            {/* A. 분석 대상 고객 정보 카드 */}
            <section className="mb-10 p-6 bg-white rounded-xl shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-bold text-green-700 mb-4">👑 분석 대상: {data.customer.name} 고객님</h2>
                <div className="flex space-x-6 text-slate-600">
                    <p><strong>등급:</strong> <span className="font-bold text-green-600">{data.customer.grade}</span></p>
                    <p><strong>총 리뷰 수:</strong> {data.customer.totalReviews}건</p>
                    <p><strong>긍정 감성 비율:</strong> {data.customer.positiveRatio}</p>
                    <p><strong>첫 방문일:</strong> {data.customer.joinDate}</p>
                </div>
            </section>

            {/* B. AI 스토리 생성 과정 (타임라인/플로우) */}
            <section className="mb-10">
                <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-2">AI 스토리 생성 과정</h2>
                <div className="space-y-8 relative">
                    {/* 타임라인 선 */}
                    <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>

                    {data.analysisProcess.map((step, index) => (
                        <div key={step.step} className={`flex items-center w-full ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                            
                            {/* 내용 카드 */}
                            <div className={`w-full md:w-1/2 p-6 bg-white rounded-xl shadow-lg border-t-4 ${index % 2 === 0 ? 'border-blue-500 md:mr-10' : 'border-purple-500 md:ml-10'}`}>
                                <h3 className="text-xl font-semibold mb-3 flex items-center">
                                    <span className="text-2xl mr-3">{step.icon}</span>
                                    Step {step.step}: {step.title}
                                </h3>
                                <p className="text-slate-700 mb-3">{step.detail}</p>
                                <div className="p-3 bg-gray-50 rounded-md border border-gray-200 text-sm italic text-gray-600">
                                    {step.dataSnippet.map((snippet, i) => (
                                        <p key={i}>{snippet}</p>
                                    ))}
                                </div>
                            </div>
                            
                            {/* 타임라인 원형 마커 */}
                            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-xl ring-4 ring-white">
                                {step.step}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* C. 최종 생성 스토리 */}
            <section className="mb-10 p-8 bg-indigo-50 rounded-xl shadow-2xl border-2 border-indigo-300">
                <h2 className="text-3xl font-bold text-indigo-700 mb-6">📝 {data.finalStory.title}</h2>
                <div className="p-6 bg-white rounded-lg border-l-4 border-indigo-400 text-xl leading-relaxed text-slate-800 whitespace-pre-wrap font-serif">
                    {data.finalStory.content}
                </div>
                <p className="mt-6 text-sm text-indigo-600 font-medium">
                    * 이 스토리는 고객 리뷰 데이터를 기반으로 AI가 생성한 것으로, 마케팅 자료, 감사 메일, 또는 고객 인터뷰 시 참고 자료로 활용될 수 있습니다.
                </p>
            </section>

            {/* D. 마케팅 활용 버튼 */}
            <div className="flex justify-end space-x-4 pt-4">
                <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-150">
                    스토리 복사 (Copy)
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-150">
                    감사 메시지 발송 템플릿 생성
                </button>
            </div>
        </div>
    );
}