'use client';
type Item = { term: string; count: number };

export default function WordCloud({
  items,
  color = 'blue',            // 'blue' | 'red'
  maxFont = 44,
  minFont = 14,
}: {
  items: Item[];
  color?: 'blue' | 'red';
  maxFont?: number;
  minFont?: number;
}) {
  if (!items?.length) return null;
  const max = Math.max(...items.map((d) => d.count));
  const min = Math.min(...items.map((d) => d.count));

  const scale = (c: number) => {
    if (max === min) return (maxFont + minFont) / 2;
    const t = (c - min) / (max - min);
    return Math.round(minFont + t * (maxFont - minFont));
  };

  const colorClass =
    color === 'red'
      ? 'text-rose-600 border-rose-200 bg-rose-50'
      : 'text-blue-600 border-blue-200 bg-blue-50';

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2 leading-none">
      {items.map((d) => (
        <span
          key={d.term}
          className={`rounded-xl border ${colorClass} px-2.5 py-1 font-semibold`}
          style={{ fontSize: `${scale(d.count)}px` }}
          title={`${d.term} x${d.count}`}
        >
          {d.term}
        </span>
      ))}
    </div>
  );
}