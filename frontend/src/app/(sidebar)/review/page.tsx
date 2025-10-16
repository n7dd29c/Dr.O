'use client';

import { useMemo, useState } from 'react';
// Next/Link 오류를 방지하기 위해 일반 <a> 태그로 임포트 제거 및 대체
// import Link from 'next/link'; 

type Sentiment = 'pos' | 'neg';

type KeywordStat = {
  term: string;
  count: number;
  sentiment: Sentiment; // 워드 클라우드 스타일을 위해 필수로 지정
};

// 긍정/부정 키워드 목록을 통합하고 sentiment 필드를 필수로 추가합니다.
// **워드 클라우드 밀집도를 높이기 위해 데이터를 추가했습니다.**
const sampleCorpus: KeywordStat[] = [
  // 긍정 키워드
  { term: '친절', count: 42, sentiment: 'pos' },
  { term: '빠름', count: 31, sentiment: 'pos' },
  { term: '가성비', count: 25, sentiment: 'pos' },
  { term: '맛있음', count: 38, sentiment: 'pos' },
  { term: '깔끔', count: 21, sentiment: 'pos' },
  { term: '재방문', count: 18, sentiment: 'pos' },
  { term: '전문가', count: 15, sentiment: 'pos' },
  { term: '개발자', count: 13, sentiment: 'pos' },
  { term: '팀장', count: 10, sentiment: 'pos' },
  { term: '성장세', count: 17, sentiment: 'pos' },
  { term: '배려', count: 22, sentiment: 'pos' },
  { term: '만족', count: 30, sentiment: 'pos' },
  { term: '추천', count: 40, sentiment: 'pos' },
  { term: '신속', count: 35, sentiment: 'pos' },
  { term: '합리적', count: 27, sentiment: 'pos' },
  { term: '기대이상', count: 19, sentiment: 'pos' },
  { term: '베테랑', count: 12, sentiment: 'pos' },
  
  // 부정 키워드
  { term: '불친절', count: 19, sentiment: 'neg' },
  { term: '늦음', count: 14, sentiment: 'neg' },
  { term: '가격불만', count: 12, sentiment: 'neg' },
  { term: '실망', count: 9, sentiment: 'neg' },
  { term: '재고부족', count: 7, sentiment: 'neg' },
  { term: '스타트업', count: 45, sentiment: 'neg' }, // 빈도 높게 설정
  { term: '출퇴근', count: 35, sentiment: 'neg' },
  { term: '냉난방', count: 16, sentiment: 'neg' },
  { term: '비추천', count: 32, sentiment: 'neg' },
  { term: '지연', count: 28, sentiment: 'neg' },
  { term: '소음', count: 23, sentiment: 'neg' },
  { term: '불만족', count: 40, sentiment: 'neg' },
  { term: '대기시간', count: 11, sentiment: 'neg' },
  { term: '노후화', count: 15, sentiment: 'neg' },
  { term: '오류', count: 13, sentiment: 'neg' },
];

const sampleRatio = { pos: 68, neg: 32 }; // 긍정 68%, 부정 32%

const topKeywords = {
  pos: [
    { term: '친절', count: 42 },
    { term: '맛있음', count: 38 },
    { term: '빠름', count: 31 },
    { term: '가성비', count: 25 },
    { term: '깔끔', count: 21 },
  ],
  neg: [
    { term: '불친절', count: 19 },
    { term: '늦음', count: 14 },
    { term: '가격불만', count: 12 },
    { term: '실망', count: 9 },
    { term: '재고부족', count: 7 },
  ],
};

const TABS = ['한눈에 보기', '긍정·부정 비율', '악성 단어 필터링'] as const;
type Tab = typeof TABS[number];


// --- 워드 클라우드 스타일 컴포넌트 ---
const WordCloudSection = ({
  title,
  keywords,
  maxCount,
  sentiment,
}: {
  title: string;
  keywords: KeywordStat[];
  maxCount: number;
  sentiment: Sentiment;
}) => {
  const isPos = sentiment === 'pos';
  const baseFontSize = 14; // 최소 폰트 크기 (px)
  
  // 키워드를 빈도순으로 정렬합니다. (중앙 배치를 위해 필수)
  const sortedKeywords = useMemo(() => [...keywords].sort((a, b) => b.count - a.count), [keywords]);

  // 동심원 배치를 위한 설정 (Index 0은 중앙)
  const RING_CONFIG = useMemo(() => ([
    { indexStart: 1, indexEnd: 5, radius: 10 },  // Inner Ring (5 words)
    { indexStart: 6, indexEnd: 10, radius: 22 }, // Middle Ring (5 words)
    { indexStart: 11, indexEnd: sortedKeywords.length - 1, radius: 35 }, // Outer Ring (나머지), 최대 반지름 35%
  ]), [sortedKeywords.length]);


  return (
    <div
      className={`rounded-2xl border ${
        isPos ? 'border-blue-100 bg-blue-50/50' : 'border-rose-100 bg-rose-50/50'
      } p-6 h-full`}
    >
      <h4
        className={`mb-4 text-lg font-extrabold ${
          isPos ? 'text-blue-800' : 'text-rose-800'
        }`}
      >
        {title}
      </h4>
      
      <div className="relative h-[calc(100%-40px)] w-full text-left">
        {sortedKeywords.map((k, index) => {
          // 빈도에 따라 폰트 크기 계산
          const scale = index === 0 
            ? Math.max(1.5, (k.count / maxCount) ** 0.5 * 2.5) 
            : Math.max(0.8, (k.count / maxCount) ** 0.5 * 2.5); 
            
          const size = `${Math.round(baseFontSize * scale)}px`;
          
          // opacity는 빈도에 따라 설정 (min 50% opacity)
          const opacityScale = Math.max(0.5, k.count / maxCount);
          const textColor = isPos ? `text-blue-600` : `text-rose-600`;
          
          let positionStyle: React.CSSProperties = {};
          
          if (index === 0) {
            // 1. 중앙 키워드
            positionStyle = {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', 
              zIndex: 10, 
              textShadow: isPos ? '0 0 10px rgba(59, 130, 246, 0.5)' : '0 0 10px rgba(244, 63, 94, 0.5)',
            };
          } else {
            // 2. 주변 키워드: 다중 링에 분산 배치
            const currentRing = RING_CONFIG.find(r => index >= r.indexStart && index <= r.indexEnd);

            if (currentRing) {
              const batchWords = sortedKeywords.slice(currentRing.indexStart, currentRing.indexEnd + 1);
              const totalWordsInBatch = batchWords.length;
              const indexInBatch = index - currentRing.indexStart;
              const angleOffset = -90; 
              const angle = angleOffset + indexInBatch * (360 / totalWordsInBatch); 
              const radius = currentRing.radius;
              const rad = (angle * Math.PI) / 180;
              const x = radius * Math.cos(rad);
              const y = radius * Math.sin(rad);

              // 랜덤 지터 추가 (방사형 효과)
              const jitterX = (Math.random() - 0.5) * 6; 
              const jitterY = (Math.random() - 0.5) * 6;
              
              positionStyle = {
                position: 'absolute',
                top: `calc(50% + ${y + jitterY}%)`,
                left: `calc(50% + ${x + jitterX}%)`,
                transform: 'translate(-50%, -50%)', 
                transition: 'all 0.5s ease-out',
                zIndex: 5,
              };
            }
          }

          return (
            <span
              key={k.term}
              className={`inline-block font-extrabold ${textColor} hover:scale-110 hover:opacity-100 whitespace-nowrap`}
              style={{ 
                fontSize: size,
                opacity: opacityScale,
                cursor: 'default',
                ...positionStyle, 
              }}
              title={`빈도: ${k.count}`}
            >
              {k.term}
            </span>
          );
        })}
      </div>
    </div>
  );
};
// --- WordCloud 스타일 컴포넌트 끝 ---


// --- 악성 단어 필터링을 위한 더미 데이터 및 로직 ---

const dummyReviews: string[] = [
  "배송은 빨랐지만, 서비스가 너무 개판이고 정말 짜증이 납니다. 이런 식으로 장사하지 마세요. 완전 엉망진창이네요.",
  "제품은 깔끔하고 좋았는데, 직원의 태도가 정말 건방졌습니다. 다시는 오고 싶지 않을 정도로 불쾌했어요.",
  "가성비는 최고지만, 솔직히 조잡스러웠던 점이 많습니다. 이 가격이라 참는 거지, 다음에는 안 올 겁니다. 개선이 필요해요.",
  "팀원 간 소통 문제가 저질스러워요. 개발 프로세스도 엉망이고, 프로젝트 진행이 너무 지연되는 것 같아 짜증나요.",
  "리뷰를 달까 말까 고민했는데, 솔직히 이 정도의 불쾌함은 처음이라 남깁니다. 다음에 방문할 때는 제발 개선되기를 바랍니다."
];

// 필터링할 악성/부정 키워드
const maliciousWords: string[] = [
  '개판이고', '짜증이', '엉망진창', '건방졌습니다', '불쾌', '조잡스러웠던', '지연되는', '불안해요', '저질스러워요', '불쾌함'
];

/**
 * 텍스트를 악성 단어 기준으로 분리하여 배열로 반환하는 헬퍼 함수
 */
const processReviewText = (text: string, maliciousWords: string[]) => {
  const parts: { text: string; isMalicious: boolean }[] = [];
  
  // 모든 악성 단어를 정규식 패턴으로 결합
  const pattern = new RegExp(`(${maliciousWords.join('|')})`, 'gi');
  let lastIndex = 0;
  
  // 텍스트를 순회하며 악성 단어 매치
  text.replace(pattern, (match, word, index) => {
    // 1. 악성 단어 앞에 있는 안전한 텍스트 추가
    if (index > lastIndex) {
      parts.push({ text: text.substring(lastIndex, index), isMalicious: false });
    }
    // 2. 악성 단어 자체 추가
    parts.push({ text: word, isMalicious: true });
    lastIndex = index + match.length;
    return match;
  });

  // 3. 마지막 악성 단어 이후의 텍스트 추가
  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), isMalicious: false });
  }
  
  return parts;
};

// 개별 리뷰 박스를 렌더링하는 컴포넌트
const ReviewBox = ({ review, index }: { review: string; index: number }) => {
  const processedParts = useMemo(() => processReviewText(review, maliciousWords), [review]);

  return (
    <div className="rounded-2xl border border-rose-300 bg-rose-50 p-5 shadow-md">
      <div className="mb-2 text-xs font-semibold text-slate-500">
        리뷰 #{index + 1}
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {processedParts.map((part, partIndex) => (
          <span
            key={partIndex}
            className={`
              ${part.isMalicious 
                ? 'text-rose-700 font-bold px-1 mx-0.5 rounded-sm inline-block cursor-pointer' 
                : 'text-slate-700'
              }
              ${part.isMalicious 
                ? 'filter blur-sm bg-rose-200 hover:blur-none hover:bg-rose-300' // 단어별 블러 및 호버 해제
                : 'filter blur-none'
              }
              transition-all duration-300
            `}
            title={part.isMalicious ? "필터링된 단어 (마우스 오버로 확인)" : undefined}
          >
            {part.text}
          </span>
        ))}
      </p>
    </div>
  );
};

// --- 악성 단어 필터링 탭 컴포넌트 ---
const FilteredReviewSection = () => {
  return (
    <section>
      <h3 className="mb-2 text-xl font-bold text-slate-800">
        악성 단어 필터링 현황
      </h3>
      <p className="mb-6 text-sm text-slate-500">
        시스템이 탐지한 악성/부정 단어를 블러 처리했습니다. 마우스를 **각 단어** 위에 올려 내용을 확인하세요.
      </p>

      {/* 리뷰 목록 (스크롤 가능한 컨테이너) */}
      <div className="space-y-4">
        {dummyReviews.map((review, index) => (
          <ReviewBox key={index} review={review} index={index} />
        ))}
      </div>
      
      <div className="mt-6 text-xs text-slate-400">
        <span className="font-semibold text-slate-600">총 리뷰 수:</span> {dummyReviews.length}건
      </div>
    </section>
  );
};
// --- 악성 단어 필터링 탭 컴포넌트 끝 ---


export default function ManagementPage() {
  const [tab, setTab] = useState<Tab>('한눈에 보기');

  // 전체 키워드 중 최대 빈도 계산
  const maxCount = useMemo(
    () => Math.max(...sampleCorpus.map((k) => k.count)),
    []
  );

  // 긍정 키워드와 부정 키워드 분리
  const posKeywords = useMemo(
    // 빈도순으로 정렬
    () => sampleCorpus.filter((k) => k.sentiment === 'pos').sort((a, b) => b.count - a.count),
    []
  );
  const negKeywords = useMemo(
    // 빈도순으로 정렬
    () => sampleCorpus.filter((k) => k.sentiment === 'neg').sort((a, b) => b.count - a.count),
    []
  );


  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 상단 바 (Link 컴포넌트 제거) */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-sm font-semibold text-slate-700">리뷰관리</span>
          </div>
          <a
            href="/"
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            대시보드로 돌아가기
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-6">
        {/* 사이드바 */}
        <aside className="col-span-12 h-fit rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-4 lg:col-span-3">
          <div className="mb-3 text-xs font-bold text-slate-500">리뷰 분석</div>
          <h2 className="mb-6 text-lg font-extrabold text-slate-800">키워드 통계</h2>

          <nav className="space-y-1">
            <button
              className={`w-full rounded-xl px-3 py-2 text-left text-sm ${
                tab === '한눈에 보기'
                  ? 'bg-blue-50 font-semibold text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setTab('한눈에 보기')}
            >
              한눈에 보기
            </button>
            <button
              className={`w-full rounded-xl px-3 py-2 text-left text-sm ${
                tab === '긍정·부정 비율'
                  ? 'bg-blue-50 font-semibold text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setTab('긍정·부정 비율')}
            >
              긍정/부정 비율
            </button>
            <button
              className={`w-full rounded-xl px-3 py-2 text-left text-sm ${
                tab === '악성 단어 필터링'
                  ? 'bg-blue-50 font-semibold text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setTab('악성 단어 필터링')}
            >
              필터링 현황
            </button>
          </nav>
        </aside>

        {/* 메인 */}
        <main className="col-span-12 lg:col-span-9">
          <div className="min-h-[500px] rounded-2xl border border-slate-200 bg-white p-5">
            {/* 탭 헤더 */}
            <div className="mb-5 flex items-center gap-2">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-xl px-3 py-1.5 text-sm transition ${
                    tab === t
                      ? 'bg-slate-900 font-semibold text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* 탭 콘텐츠 */}
            {tab === '한눈에 보기' && (
              <section>
                <h3 className="mb-2 text-xl font-bold text-slate-800">
                  리뷰 키워드 분석
                </h3>
                <p className="mb-6 text-sm text-slate-500">
                  최근 리뷰에서 나타났던 키워드를 한눈에 모아볼게요.
                </p>

                {/* 워드 클라우드 섹션 (2분할) */}
                <div className="grid h-[500px] gap-6 md:grid-cols-2">
                  {/* 긍정 섹션 (장점) */}
                  <WordCloudSection
                    title="장점 (긍정 키워드)"
                    keywords={posKeywords}
                    maxCount={maxCount}
                    sentiment="pos"
                  />

                  {/* 부정 섹션 (단점) */}
                  <WordCloudSection
                    title="단점 (부정 키워드)"
                    keywords={negKeywords}
                    maxCount={maxCount}
                    sentiment="neg"
                  />
                </div>
              </section>
            )}

            {/* 긍정·부정 비율 탭 */}
            {tab === '긍정·부정 비율' && (
              <>
                <section className="mb-8">
                  <h3 className="mb-3 text-base font-bold text-slate-800">
                    긍정/부정 비율(샘플)
                  </h3>
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                    <span>긍정 {sampleRatio.pos}%</span>
                    <span>부정 {sampleRatio.neg}%</span>
                  </div>
                  {/* 긍정/부정 바 */}
                  <div className="h-8 w-full overflow-hidden rounded-full border border-slate-200 relative">
                    <div
                      className="h-full bg-emerald-500 absolute left-0 top-0"
                      style={{ width: `${sampleRatio.pos}%` }}
                      title={`긍정 ${sampleRatio.pos}%`}
                    />
                    <div
                      className="h-full bg-rose-500 absolute right-0 top-0"
                      style={{ width: `${sampleRatio.neg}%` }}
                      title={`부정 ${sampleRatio.neg}%`}
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <div className="mb-1 text-sm font-semibold text-emerald-900">긍정</div>
                      <p className="text-sm text-emerald-800">
                        응답의 다수는 친절·맛·속도 관련 긍정적 피드백입니다.
                      </p>
                    </div>
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                      <div className="mb-1 text-sm font-semibold text-rose-900">부정</div>
                      <p className="text-sm text-rose-800">
                        불친절·지연·가격 이슈가 주요 불만 요인으로 나타납니다.
                      </p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h3 className="mb-3 text-base font-bold text-slate-800">
                    긍정/부정 키워드 TOP 5
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* 긍정 */}
                    <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-bold text-emerald-900">긍정 TOP 5</span>
                      </div>
                      <ul className="space-y-2">
                        {topKeywords.pos.map((k) => (
                          <li
                            key={`pos-${k.term}`}
                            className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2"
                          >
                            <span className="text-sm font-semibold text-emerald-800">{k.term}</span>
                            <span className="text-xs text-emerald-700">x{k.count}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 부정 */}
                    <div className="rounded-2xl border border-rose-200 bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span className="text-sm font-bold text-rose-900">부정 TOP 5</span>
                      </div>
                      <ul className="space-y-2">
                        {topKeywords.neg.map((k) => (
                          <li
                            key={`neg-${k.term}`}
                            className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50 px-3 py-2"
                          >
                            <span className="text-sm font-semibold text-rose-800">{k.term}</span>
                            <span className="text-xs text-rose-700">x{k.count}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </>
            )}
            
            {/* 악성 단어 필터링 탭 */}
            {tab === '악성 단어 필터링' && (
              <FilteredReviewSection />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
