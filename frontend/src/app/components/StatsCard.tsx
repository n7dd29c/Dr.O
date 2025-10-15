// 이미지의 왼쪽 상단 큰 카드를 나타내는 컴포넌트입니다.
export default function StatsCard() {
  return (
    <div className="flex flex-col h-full">
      <p className="text-lg text-teal-100">Visits for today</p>
      <p className="text-8xl font-bold my-4">824</p>
      <div className="flex space-x-8 mt-auto">
        <div>
          <p className="text-teal-200">Popularity</p>
          <p className="font-bold text-xl">93</p>
        </div>
        <div>
          <p className="text-teal-200">General rate</p>
          <p className="font-bold text-xl">4.7</p>
        </div>
      </div>
      <button className="mt-6 bg-white text-teal-600 font-bold py-3 px-6 rounded-full self-start">
        VIEW FULL STATISTIC &gt;
      </button>
    </div>
  );
}