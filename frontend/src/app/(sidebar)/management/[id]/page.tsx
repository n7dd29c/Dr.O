// Next.js에서 동적 경로의 파라미터를 받기 위한 타입 정의
interface CustomerDetailPageProps {
  params: {
    id: string; // URL에서 넘어오는 블랙리스트 고객 ID (예: BL001)
  };
}

// 고객 ID로 상세 정보를 찾는 함수
const findCustomerById = (id: string) => detailedBlacklistData.find(c => c.id === id);


// ⚠️ 10명의 블랙리스트 고객 상세 정보 데이터 (분석 결과 및 2줄 요약 추가됨)
const detailedBlacklistData = [
    // BL001 - 김진상
    { 
        id: 'BL001', name: '김진상', grade: 'evil', reason: '악성 리뷰 작성 (3회)', 
        originalReview: "여기는 맛도 없고 서비스도 최악인데, 특히 직원 태도가 문제였습니다. 다시는 방문 안 합니다. 별점 1개도 아깝네요.",
        reviewDate: '2024-09-18', statusHistory: ['2024-09-20: 악성 리뷰로 블랙리스트 등재', '2024-10-01: 상태 \'활동중\'으로 변경'], status: '활동중',
        analysisResults: {
            sentiment: '부정적 (98%)',
            keywords: ['직원 태도', '서비스 불만', '재방문 거부'],
            maliciousScore: 9.5, 
            topic: '서비스 품질 및 직원 응대',
            summary: "고의성이 높은 악성 리뷰 작성으로 분류됩니다. 직원의 응대 태도에 대한 비방을 핵심으로 하며, 재방문 거부 의사를 명확히 밝혔습니다." 
        }
    },
    // BL002 - 박민폐
    { 
        id: 'BL002', name: '박민폐', grade: 'New', reason: '허위 사실 유포 / 부당 환불 요구', 
        originalReview: "음식에서 이물질이 나왔는데 사장이 적반하장으로 나왔어요. 위생 상태가 심각하니 모두 조심하세요. (환불 요구 후 차단)",
        reviewDate: '2024-08-14', statusHistory: ['2024-08-15: 허위 사실 유포 및 소란으로 \'차단\' 등재'], status: '차단',
        analysisResults: {
            sentiment: '매우 부정적 (100%)',
            keywords: ['이물질', '사장이 적반하장', '위생 심각', '환불 요구'],
            maliciousScore: 9.9, 
            topic: '허위 클레임 및 위생 문제 공격',
            summary: "사실과 다른 허위 사실 유포 및 부당한 환불 요구가 확인되었습니다. 위생 상태를 악의적으로 공격하는 패턴이 발견되어 즉시 차단이 필요합니다."
        }
    },
    // BL003 - 이민수
    { 
        id: 'BL003', name: '이민수', grade: 'bad', reason: '반복적 불만 제기 (제품 문제)', 
        originalReview: "포장 상태가 불량해서 내용물이 조금 새었습니다. 이 문제로 벌써 세 번째 컴플레인입니다. 매번 같은 문제가 반복되네요.",
        reviewDate: '2024-10-01', statusHistory: ['2024-10-03: 반복적 불만으로 \'주의 필요\' 등재', '2024-10-10: 상태 \'활동중\'으로 재설정'], status: '활동중',
        analysisResults: {
            sentiment: '부정적 (85%)',
            keywords: ['포장 불량', '내용물 샘', '세 번째 컴플레인', '문제 반복'],
            maliciousScore: 7.0, 
            topic: '반복적인 포장 품질 불만',
            summary: "실제 제품 문제에 대한 반복적인 불만을 제기했습니다. 악의성은 낮지만, 지속적인 컴플레인 누적으로 관리 대상에 포함되었습니다."
        }
    },
    // BL004 - 정하나
    { 
        id: 'BL004', name: '정하나', grade: 'New', reason: '별점 테러 (이유 불명)', 
        originalReview: "그냥 마음에 안 듭니다. 별 한 개. (추가 텍스트 없음)",
        reviewDate: '2024-07-25', statusHistory: ['2024-07-26: 무근거 별점 테러로 \'차단\' 등재'], status: '차단',
        analysisResults: {
            sentiment: '중립 (50%)', 
            keywords: ['별 한 개', '마음에 안 듦'],
            maliciousScore: 8.5, 
            topic: '무근거/의도성 별점 테러',
            summary: "텍스트는 짧으나 이유 없는 최저점 별점 테러 행위로 악의성 점수가 높습니다. 의도적인 평점 하락 시도로 판단됩니다."
        }
    },
    // BL005 - 최경태
    { 
        id: 'BL005', name: '최경태', grade: 'worst', reason: '사장 비방 및 명예 훼손', 
        originalReview: "사장님이 손님을 대하는 태도가 인격적으로 문제가 많습니다. (구체적 비방 내용 다수 포함)",
        reviewDate: '2024-09-11', statusHistory: ['2024-09-12: 명예 훼손 우려로 즉시 \'차단\' 등재'], status: '차단',
        analysisResults: {
            sentiment: '매우 부정적 (100%)',
            keywords: ['사장 태도', '인격 문제', '비방'],
            maliciousScore: 9.8, 
            topic: '명예 훼손 및 인신공격',
            summary: "구체적인 인격적 비방 내용이 포함되어 명예 훼손 가능성이 높습니다. 감정적인 분노 표출과 인신공격이 주를 이룹니다."
        }
    },
    // BL006 - 윤지아
    { 
        id: 'BL006', name: '윤지아', grade: 'worst', reason: '서비스 요구 과도 / 직원 불만', 
        originalReview: "직원이 제가 요구한 서비스를 무시했어요. VIP 대우가 이렇습니까? 직원 교육 다시 시키세요.",
        reviewDate: '2024-10-15', statusHistory: ['2024-10-16: 과도한 서비스 요구로 \'주의 필요\' 등재'], status: '주의 필요',
        analysisResults: {
            sentiment: '부정적 (90%)',
            keywords: ['서비스 무시', 'VIP 대우', '직원 교육'],
            maliciousScore: 6.5, 
            topic: '과도한 특별 대우 요구',
            summary: "VIP 등급을 내세우며 과도한 서비스를 요구하는 패턴입니다. 악의적 비방보다는 고객 지위 남용에 가깝습니다."
        }
    },
    // BL007 - 강동원
    { 
        id: 'BL007', name: '강동원', grade: 'New', reason: '경쟁사 언급 및 비하', 
        originalReview: "이 매장보다는 근처 OOO(경쟁사)이 훨씬 낫습니다. 굳이 여기 올 필요는 없는 듯.",
        reviewDate: '2024-06-03', statusHistory: ['2024-06-04: 경쟁사 언급 및 악성 리뷰로 \'차단\' 등재'], status: '차단',
        analysisResults: {
            sentiment: '부정적 (75%)',
            keywords: ['경쟁사', '훨씬 낫다', '비하'],
            maliciousScore: 8.0, 
            topic: '경쟁사 홍보/비하성 리뷰',
            summary: "경쟁사를 직접 언급하며 현 매장을 비하하는 내용입니다. 순수한 불만보다는 영업 방해 의도가 의심됩니다."
        }
    },
    // BL008 - 한소리
    { 
        id: 'BL008', name: '한소리', grade: 'bad', reason: '허위 구매 인증 후 리뷰 작성', 
        originalReview: "사진만 보고 구매했지만 별로였어요. 다른 분들은 속지 마세요.",
        reviewDate: '2024-08-28', statusHistory: ['2024-08-29: 구매 내역 확인 불가 및 허위 리뷰로 \'차단\' 등재'], status: '차단',
        analysisResults: {
            sentiment: '부정적 (65%)',
            keywords: ['사진만 보고 구매', '속지 마세요', '별로였어요'],
            maliciousScore: 7.5, 
            topic: '허위 구매 및 기만',
            summary: "구매 내역이 확인되지 않는 허위 리뷰입니다. 고객 기만 및 평판 조작 의도가 있어 차단 조치되었습니다."
        }
    },
    // BL009 - 주철민
    { 
        id: 'BL009', name: '주철민', grade: 'worst', reason: '부당한 금전적 보상 요구 (5회)', 
        originalReview: "제품에 미세한 스크래치가 있는데, 전액 환불 및 보상 없이는 이 리뷰를 내리지 않겠습니다.",
        reviewDate: '2024-09-05', statusHistory: ['2024-09-06: 5회 이상의 부당 보상 요구로 \'활동중\' 주의 처리'], status: '활동중',
        analysisResults: {
            sentiment: '부정적 (88%)',
            keywords: ['미세한 스크래치', '전액 환불', '보상 요구', '리뷰 내리지 않겠다'],
            maliciousScore: 9.0, 
            topic: '금전적 보상을 위한 협박성 리뷰',
            summary: "경미한 흠을 이유로 리뷰를 인질 삼아 과도한 금전적 보상을 요구하는 블랙 컨슈머 패턴입니다. 상습성이 매우 높습니다."
        }
    },
    // BL010 - 임은희
    { 
        id: 'BL010', name: '임은희', grade: 'New', reason: '책임 전가 (본인 실수)', 
        originalReview: "제가 사용법을 잘못 알았는데, 매장에서 제대로 설명해주지 않았기 때문에 문제가 발생한 겁니다. 책임지세요.",
        reviewDate: '2024-10-12', statusHistory: ['2024-10-13: 본인 과실의 책임 전가로 \'활동중\' 주의 처리'], status: '활동중',
        analysisResults: {
            sentiment: '부정적 (70%)',
            keywords: ['사용법 잘못', '설명 안 함', '책임지세요'],
            maliciousScore: 5.5, 
            topic: '본인 과실의 책임 전가',
            summary: "본인의 실수를 매장의 설명 부족으로 책임 전가하려는 시도입니다. 악의성은 낮으나 불필요한 비용 발생 가능성이 있어 주의가 필요합니다."
        }
    },
];


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

  // 상태에 따른 색상 설정 (고객 관리 페이지와 동일)
  const statusColor = customer.status === '차단' ? 'bg-red-600 text-white' : 
                      customer.status === '주의 필요' ? 'bg-orange-500 text-white' : 
                      'bg-yellow-500 text-slate-800';

  // 악의성 점수에 따른 색상 지정
  const scoreColor = customer.analysisResults.maliciousScore >= 9.0 ? 'text-red-600' :
                     customer.analysisResults.maliciousScore >= 7.0 ? 'text-orange-500' :
                     'text-blue-500';

  // 등급에 따른 색상 설정 (evil/bad/worst/New 반영)
  const gradeColor = customer.grade === 'evil' ? 'bg-purple-100 text-purple-800' : 
                     customer.grade === 'worst' ? 'bg-red-100 text-red-800' :
                     customer.grade === 'bad' ? 'bg-amber-100 text-amber-800' :
                     'bg-slate-100 text-slate-800'; // New 등급 및 기타

  // 분석 키워드를 뱃지 형태로 표시하는 컴포넌트 (편의상 함수 내부에서 정의)
  const KeywordBadge = ({ keyword }: { keyword: string }) => (
    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-2 mb-2">
      {keyword}
    </span>
  );


  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">블랙리스트 고객 상세 관리</h1>
      <p className="text-xl text-slate-600 mb-8">{customer.name}님의 악성 리뷰 상세 정보</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* L-Column (1. 기본 정보 + 2. AI 분석 결과) */}
        <div className="lg:col-span-1 space-y-8">
            {/* 1. 기본 정보 카드 (등급 스타일링 로직 수정됨) */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-slate-700">고객 개요</h2>
                <div className="space-y-3">
                    <p><span className="font-bold w-24 inline-block">고객명:</span> {customer.name}</p>
                    <p>
                        <span className="font-bold w-24 inline-block">등급:</span> 
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ml-1 ${gradeColor}`}>{customer.grade}</span>
                    </p>
                    <p>
                        <span className="font-bold w-24 inline-block">현재 상태:</span> 
                        <span className={`px-3 py-1 text-sm font-bold rounded-lg ${statusColor}`}>
                          {customer.status}
                        </span>
                    </p>
                    <p>
                        <span className="font-bold w-24 inline-block">블랙 사유:</span> 
                        <span className="text-red-700 font-semibold">{customer.reason}</span>
                    </p>
                </div>
            </div>

            {/* 2. ✅ AI 리뷰 분석 결과 섹션 추가 (요청 사항 반영) */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-fit border-l-4 border-blue-500">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-blue-700">AI 리뷰 분석 결과</h2>
                
                {/* 2줄 요약 (요청 사항) */}
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-base font-semibold text-blue-800 whitespace-pre-wrap">
                        {customer.analysisResults.summary}
                    </p>
                </div>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="font-bold text-slate-600">감성 분석 결과:</span>
                        <span className="text-lg font-extrabold text-red-500">{customer.analysisResults.sentiment}</span>
                    </div>
                    
                    <div className="pb-2 border-b border-dashed">
                        <p className="font-bold text-slate-600 mb-1">핵심 주제:</p>
                        <p className="text-slate-800 font-semibold">{customer.analysisResults.topic}</p>
                    </div>

                    <div className="pb-2 border-b border-dashed">
                        <p className="font-bold text-slate-600 mb-2">악의성 점수 (10점 만점):</p>
                        <p className="text-3xl font-extrabold">
                            <span className={scoreColor}>{customer.analysisResults.maliciousScore}</span> / 10
                        </p>
                    </div>

                    <div>
                        <p className="font-bold text-slate-600 mb-2">주요 키워드:</p>
                        <div className="flex flex-wrap">
                          {customer.analysisResults.keywords.map(keyword => (
                            <KeywordBadge key={keyword} keyword={keyword} />
                          ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* R-Column (3. 원본 리뷰 및 조치 내역) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* A. 원본 악성 리뷰 내용 */}
          <div className="bg-red-50 p-6 rounded-xl shadow-lg border-2 border-red-200">
            <h2 className="text-2xl font-semibold mb-4 text-red-800 flex justify-between items-center">
                <span>원본 악성 리뷰 내용</span>
                <span className="text-sm font-normal text-red-600">작성일: {customer.reviewDate}</span>
            </h2>
            <div className="p-4 bg-white border border-red-300 rounded-lg whitespace-pre-wrap text-slate-800 italic">
              {customer.originalReview}
            </div>
            <p className="mt-4 text-sm text-red-700 font-medium">
              * 해당 리뷰는 AI 분석 결과 '악의적 의도' 키워드가 높게 검출되어 블랙리스트 사유로 지정되었습니다.
            </p>
          </div>

          {/* B. 블랙리스트 조치 히스토리 */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-slate-700">블랙리스트 조치 히스토리</h2>
            <ul className="space-y-3 text-slate-600">
              {customer.statusHistory.map((history, index) => (
                <li key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  {history}
                </li>
              ))}
            </ul>
          </div>
          
          {/* C. 관리자 조치 버튼 */}
          <div className="flex justify-end space-x-4 pt-4">
            <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-150">
              영구 차단 (Block)
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-150">
              상태 변경 및 메모 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}