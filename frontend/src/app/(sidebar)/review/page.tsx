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

const TABS = ['키워드 말뭉치', '긍정·부정 비율', '상위 키워드'] as const;
type Tab = typeof TABS[number];


// --- WordCloud 스타일 컴포넌트 ---
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
  // 방사형 배치를 위해 반지름을 10, 22, 35로 조정하고, 랜덤 지터를 줄여 밀도를 높였습니다.
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
      
      {/* 상대적인 위치 지정을 위해 relative 설정 및 높이/너비를 꽉 채웁니다. 
          컨테이너 높이에서 제목/마진 공간(40px)을 뺌. */}
      <div className="relative h-[calc(100%-40px)] w-full text-left">
        {sortedKeywords.map((k, index) => {
          // 빈도에 따라 폰트 크기 계산: 중앙 키워드의 폰트 스케일을 줄여 주변 단어와의 겹침을 최소화합니다.
          const scale = index === 0 
            // 중앙 키워드 스케일을 기존 3.5배에서 2.5배로 더 줄여 중앙 공간을 확보
            ? Math.max(1.5, (k.count / maxCount) ** 0.5 * 2.5) 
            : Math.max(0.8, (k.count / maxCount) ** 0.5 * 2.5); // 주변 키워드 (2.5배 유지)
            
          const size = `${Math.round(baseFontSize * scale)}px`;
          
          // opacity는 빈도에 따라 설정 (min 50% opacity)
          const opacityScale = Math.max(0.5, k.count / maxCount);
          const textColor = isPos ? `text-blue-600` : `text-rose-600`;
          
          let positionStyle: React.CSSProperties = {};
          
          if (index === 0) {
            // 1. 중앙 키워드: 가장 큰 키워드를 정중앙에 배치합니다.
            positionStyle = {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', // 요소의 중심을 중앙에 맞춥니다.
              zIndex: 10, // 가장 위에 표시되도록 설정
              textShadow: isPos ? '0 0 10px rgba(59, 130, 246, 0.5)' : '0 0 10px rgba(244, 63, 94, 0.5)',
            };
          } else {
            // 2. 주변 키워드: 다중 링에 분산 배치합니다.
            const currentRing = RING_CONFIG.find(r => index >= r.indexStart && index <= r.indexEnd);

            if (currentRing) {
              // 현재 링에 속하는 키워드들만 추출합니다.
              const batchWords = sortedKeywords.slice(currentRing.indexStart, currentRing.indexEnd + 1);
              const totalWordsInBatch = batchWords.length;
              
              // 현재 링에서 이 키워드의 순서 (0부터 시작)
              const indexInBatch = index - currentRing.indexStart;
              
              // 각도 계산: -90도(위)에서 시작하여 시계 방향으로 배치
              const angleOffset = -90; 
              const angle = angleOffset + indexInBatch * (360 / totalWordsInBatch); // 현재 링의 총 단어 수로 각도 계산
              
              // 반지름을 축소된 값으로 사용
              const radius = currentRing.radius;
              
              // 각도를 라디안으로 변환
              const rad = (angle * Math.PI) / 180;
              
              // 위치 계산 (x, y)
              const x = radius * Math.cos(rad);
              const y = radius * Math.sin(rad);

              // **랜덤 지터 추가 (방사형 효과)**
              // -3%에서 +3% 사이의 무작위 값 추가하여 링 정렬 방지 (기존 5%에서 축소)
              const jitterX = (Math.random() - 0.5) * 6; 
              const jitterY = (Math.random() - 0.5) * 6;
              
              positionStyle = {
                position: 'absolute',
                // 50%를 중앙 기준으로 삼고, 계산된 x/y 값과 지터(Jitter)를 더하여 배치
                top: `calc(50% + ${y + jitterY}%)`,
                left: `calc(50% + ${x + jitterX}%)`,
                // 요소의 중심이 계산된 위치에 오도록 변환
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
                ...positionStyle, // 계산된 위치 스타일 적용
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


export default function ManagementPage() {
  const [tab, setTab] = useState<Tab>('키워드 말뭉치');

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
                tab === '키워드 말뭉치'
                  ? 'bg-blue-50 font-semibold text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setTab('키워드 말뭉치')}
            >
              키워드분석 (워드 클라우드)
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
                tab === '상위 키워드'
                  ? 'bg-blue-50 font-semibold text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setTab('상위 키워드')}
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
            {tab === '키워드 말뭉치' && (
              <section>
                <h3 className="mb-2 text-xl font-bold text-slate-800">
                  리뷰 키워드 워드 클라우드 분석 (방사형 배치)
                </h3>
                <p className="mb-6 text-sm text-slate-500">
                  키워드를 중앙에서 바깥으로 흩뿌린 듯한 **방사형 배치**로 변경하여, 단어 간 겹침을 최소화하고 시각적인 분산 효과를 극대화했습니다.
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

            {tab === '긍정·부정 비율' && (
              <section>
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
            )}

            {tab === '상위 키워드' && (
              <section>
                <h3 className="mb-3 text-base font-bold text-slate-800">
                  긍정/부정 상위 키워드(샘플)
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
