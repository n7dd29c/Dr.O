import Link from 'next/link'; 

// --- 임시 데이터 ---

// ✅ 블랙리스트 고객 10명 및 리뷰 관련 키워드 반영
const blacklistCustomers = [
  { id: 'BL001', name: '김진상', reason: '악성 리뷰 작성 (3회)', lastVisit: '2024-09-20', status: '활동중' }, 
  { id: 'BL002', name: '박민폐', reason: '허위 사실 유포 / 부당 환불 요구', lastVisit: '2024-08-15', status: '차단' },
  { id: 'BL003', name: '이민수', reason: '반복적 불만 제기 (제품 문제)', lastVisit: '2024-10-01', status: '활동중' },
  { id: 'BL004', name: '정하나', reason: '별점 테러 (이유 불명)', lastVisit: '2024-07-25', status: '차단' },
  { id: 'BL005', name: '최경태', reason: '사장 비방 및 명예 훼손', lastVisit: '2024-09-11', status: '차단' },
  { id: 'BL006', name: '윤지아', reason: '서비스 요구 과도 / 직원 불만', lastVisit: '2024-10-15', status: '주의 필요' },
  { id: 'BL007', name: '강동원', reason: '경쟁사 언급 및 비하', lastVisit: '2024-06-03', status: '차단' },
  { id: 'BL008', name: '한소리', reason: '허위 구매 인증 후 리뷰 작성', lastVisit: '2024-08-28', status: '차단' },
  { id: 'BL009', name: '주철민', reason: '부당한 금전적 보상 요구 (5회)', lastVisit: '2024-09-05', status: '활동중' },
  { id: 'BL010', name: '임은희', reason: '책임 전가 (본인 실수)', lastVisit: '2024-10-12', status: '활동중' },
];

const allMembers = [
  { id: 'VIP001', name: '김민준', grade: 'VIP', totalSpent: '2,540,000원', joinDate: '2023-01-15' },
  { id: 'GLD001', name: '이서연', grade: 'Gold', totalSpent: '1,280,000원', joinDate: '2022-11-20' },
  { id: 'SIL001', name: '박도윤', grade: 'Silver', totalSpent: '760,000원', joinDate: '2023-08-01' },
  { id: 'NEW001', name: '최지우', grade: 'New', totalSpent: '120,000원', joinDate: '2024-10-05' },
];


// --- 메인 페이지 컴포넌트 ---
export default function ManagementPage() {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">고객 관리</h1>

      {/* 1. 블랙리스트 고객 관리 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-700 mb-4">블랙리스트 관리</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 text-sm font-semibold text-slate-500">고객명</th>
                <th className="p-3 text-sm font-semibold text-slate-500">사유</th>
                <th className="p-3 text-sm font-semibold text-slate-500">상태</th>
                <th className="p-3 text-sm font-semibold text-slate-500">마지막 방문일</th>
              </tr>
            </thead>
            <tbody>
              {blacklistCustomers.map(customer => (
                <tr key={customer.id} className="border-b border-slate-100">
                  {/* ✅ 고객명 클릭 시 리뷰 상세 페이지로 이동하도록 Link 컴포넌트로 감싸기 */}
                  <td className="p-4 font-medium text-slate-800">
                    <Link 
                      // 예: /customer/BL001 페이지에는 해당 고객의 리뷰 내용이 상세하게 표시되어야 합니다.
                      href={`/management/${customer.id}`} 
                      className="hover:text-blue-600 hover:underline cursor-pointer transition-colors"
                    >
                      {customer.name}
                    </Link>
                  </td>
                  {/* ✅ 사유(키워드)를 리뷰 분석 결과임을 강조하는 뱃지 스타일로 변경 */}
                  <td className="p-4">
                    <span className="px-3 py-1 text-sm font-semibold bg-red-50 text-red-700 rounded-lg border border-red-200">
                      {customer.reason}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      customer.status === '차단' ? 'bg-red-100 text-red-800' : 
                      customer.status === '주의 필요' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800' // 활동중
                    }`}>{customer.status}</span>
                  </td>
                  <td className="p-4 text-slate-500">{customer.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. 전체 회원 정보 */}
      <section>
        <h2 className="text-xl font-bold text-slate-700 mb-4">전체 회원 정보</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
           <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 text-sm font-semibold text-slate-500">고객명</th>
                <th className="p-3 text-sm font-semibold text-slate-500">등급</th>
                <th className="p-3 text-sm font-semibold text-slate-500">총 사용 금액</th>
                <th className="p-3 text-sm font-semibold text-slate-500">가입일</th>
              </tr>
            </thead>
            <tbody>
              {allMembers.map(member => (
                <tr key={member.id} className="border-b border-slate-100">
                  <td className="p-4 font-medium text-slate-800">{member.name}</td>
                  <td className="p-4">
                     <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                       member.grade === 'VIP' ? 'bg-purple-100 text-purple-800' :
                       member.grade === 'Gold' ? 'bg-amber-100 text-amber-800' :
                       member.grade === 'Silver' ? 'bg-gray-200 text-gray-800' :
                       'bg-slate-100 text-slate-800'
                     }`}>{member.grade}</span>
                  </td>
                  <td className="p-4 text-slate-600">{member.totalSpent}</td>
                  <td className="p-4 text-slate-500">{member.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}