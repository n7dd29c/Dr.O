import Link from 'next/link';

// 임시 VIP 고객 목록 데이터
const vipCustomers = [
  {
    id: 'user123',
    name: '김민준',
    loyaltyGrade: 'VIP',
    totalReviews: 28,
    joinDate: '2023-01-15',
    avatarUrl: "/avatar-placeholder.png",
    lastReview: "역시 신메뉴는 실망시키지 않네요...",
  },
  {
    id: 'user456',
    name: '이서연',
    loyaltyGrade: 'VIP',
    totalReviews: 25,
    joinDate: '2022-11-20',
    avatarUrl: "/avatar-placeholder.png",
    lastReview: "언제 와도 직원분들이 친절해서 좋아요.",
  },
  {
    id: 'user789',
    name: '박도윤',
    loyaltyGrade: 'Gold',
    totalReviews: 18,
    joinDate: '2023-08-01',
    avatarUrl: "/avatar-placeholder.png",
    lastReview: "분위기가 좋아서 자주 방문합니다.",
  }
];

export default function CustomerListPage() {
  return (
    <div className="bg-slate-100 min-h-screen p-8 font-sans">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-800">우수 고객 히스토리</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vipCustomers.map(customer => {
          const gradeColor = customer.loyaltyGrade === 'VIP' ? 'bg-purple-600 text-white' : 'bg-amber-500 text-white';

          return (
            // Link 컴포넌트로 전체 카드를 감싸서 클릭 가능하게 만듭니다.
            <Link href={`/customer/${customer.id}`} key={customer.id} className="block bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-slate-200 rounded-full mr-4"></div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{customer.name}</h2>
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full mt-1 inline-block ${gradeColor}`}>
                    {customer.loyaltyGrade}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600"><strong>가입일:</strong> {customer.joinDate}</p>
                <p className="text-slate-600"><strong>총 리뷰:</strong> {customer.totalReviews}개</p>
                <p className="text-slate-500 italic mt-3">"{customer.lastReview}"</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}