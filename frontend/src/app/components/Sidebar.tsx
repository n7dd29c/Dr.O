"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: '대시보드', href: '/' },
  { name: '고객 히스토리', href: '/customer' },
  { name: '전체 리뷰 관리', href: '/reviews' }, // 예시 경로
  { name: 'Dr.O AI', href: '/ai-analysis' }, // 예시 경로
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-800 text-white h-screen sticky top-0 flex flex-col p-4">
      <div className="text-3xl font-bold mb-8 text-center py-4">Dr.O</div>
      <nav className="flex flex-col space-y-2">
        {menuItems.map(item => {
          const isActive = pathname.startsWith(item.href) && item.href !== '/' || pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors ${
                isActive ? 'bg-slate-900 text-white font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}