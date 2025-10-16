'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Sentiment = 'pos' | 'neg';

type KeywordStat = {
  term: string;
  count: number;
  sentiment?: Sentiment; // 말뭉치 탭 표현용(선택)
};

const sampleCorpus: KeywordStat[] = [
  { term: '친절', count: 42, sentiment: 'pos' },
  { term: '빠름', count: 31, sentiment: 'pos' },
  { term: '가성비', count: 25, sentiment: 'pos' },
  { term: '맛있음', count: 38, sentiment: 'pos' },
  { term: '깔끔', count: 21, sentiment: 'pos' },
  { term: '불친절', count: 19, sentiment: 'neg' },
  { term: '늦음', count: 14, sentiment: 'neg' },
  { term: '가격불만', count: 12, sentiment: 'neg' },
  { term: '재방문', count: 18, sentiment: 'pos' },
  { term: '실망', count: 9, sentiment: 'neg' },
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

export default function ManagementPage() {
  const [tab, setTab] = useState<Tab>('키워드 말뭉치');

  const maxCount = useMemo(
    () => Math.max(...sampleCorpus.map((k) => k.count)),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 바 */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-sm font-semibold text-slate-700">리뷰관리</span>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            대시보드로 돌아가기
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-6">
        {/* 사이드바 */}
        <aside className="col-span-12 h-fit rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-4 lg:col-span-3">
          <div className="mb-3 text-xs font-bold text-slate-500">제목</div>
          <h2 className="mb-6 text-lg font-extrabold text-slate-800">리뷰관리</h2>

          <nav className="space-y-1">
            <button
              className={`w-full rounded-xl px-3 py-2 text-left text-sm ${
                tab === '키워드 말뭉치'
                  ? 'bg-blue-50 font-semibold text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setTab('키워드 말뭉치')}
            >
              키워드분석
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
        <main className="col-span-12 rounded-2xl border border-slate-200 bg-white p-5 sm:col-span-8 lg:col-span-9">
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
              <h3 className="mb-3 text-base font-bold text-slate-800">
                샘플 키워드 말뭉치
              </h3>
              <p className="mb-4 text-sm text-slate-500">
                빈도에 따라 글자 크기가 달라집니다. (색: 긍정/부정 구분)
              </p>

              <div className="flex flex-wrap gap-3">
                {sampleCorpus.map((k) => {
                  const scale = Math.max(0.9, (k.count / maxCount) * 1.8);
                  const size = `${Math.round(14 * scale)}px`;
                  const color =
                    k.sentiment === 'pos'
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-rose-700 bg-rose-50 border-rose-200';
                  return (
                    <span
                      key={k.term}
                      className={`rounded-xl border px-3 py-1`}
                      style={{ fontSize: size }}
                    >
                      <span className={`font-semibold ${color} rounded-md px-2 py-0.5`}>
                        {k.term}
                      </span>
                      <span className="ml-2 align-middle text-slate-400">x{k.count}</span>
                    </span>
                  );
                })}
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
              <div className="h-8 w-full overflow-hidden rounded-full border border-slate-200">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${sampleRatio.pos}%` }}
                  title={`긍정 ${sampleRatio.pos}%`}
                />
                <div
                  className="h-full bg-rose-500"
                  style={{ width: `${sampleRatio.neg}%`, marginTop: '-2rem' /* visually stacked */ }}
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
        </main>
      </div>
    </div>
  );
}
