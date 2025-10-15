const performers = [
  { name: 'Bessie Cooper', score: 4.3, avatar: '/path-to-avatar1.png' },
  { name: 'Albert Flores', score: 4.7, avatar: '/path-to-avatar2.png' },
  { name: 'Guy Hawkins', score: 4.4, avatar: '/path-to-avatar3.png' },
];

export default function TopPerformers() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-4">TOP performers</h2>
      <ul className="space-y-4">
        {performers.map(p => (
          <li key={p.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div> {/* 아바타 이미지 */}
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-slate-500">Online</p>
              </div>
            </div>
            <p className="font-bold">{p.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}