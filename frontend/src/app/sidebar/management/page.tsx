import Link from 'next/link'; 
// 1. 방금 만든 데이터 파일에서 데이터를 불러옵니다.
import { blacklistCustomers, allMembers } from '@/app/_data/blacklistData';

// --- 메인 페이지 컴포넌트 ---
export default function ManagementPage() {
  return (
    // 2. 파일 안에 있던 데이터 변수들은 모두 삭제되고, JSX 부분만 남습니다.
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">고객 관리</h1>
        <p className="mt-1 text-base text-gray-500">블랙리스트 및 전체 회원 정보를 관리합니다.</p>
      </header>

      {/* 1. 블랙리스트 고객 관리 */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">블랙리스트 관리</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
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
                <tr key={customer.id} className="border-b border-slate-100 hover:bg-gray-50">
                  <td className="p-4 font-medium text-slate-800">
                    <Link 
                      href={`/management/${customer.id}`} 
                      className="hover:text-blue-600 hover:underline"
                    >
                      {customer.name}
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs font-semibold bg-red-50 text-red-700 rounded-md border border-red-200">
                      {customer.reason}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      customer.status === '차단' ? 'bg-red-100 text-red-800' : 
                      customer.status === '주의 필요' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
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
        <h2 className="text-xl font-semibold text-gray-700 mb-4">전체 회원 정보</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
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
                <tr key={member.id} className="border-b border-slate-100 hover:bg-gray-50">
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