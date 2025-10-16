"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

// 메뉴 데이터 구조는 기존과 동일합니다.
const menuItems = [
    { name: '대시보드', href: '/' },
    {
        name: '고객 관리',
        href: '/management',
        children: [
            { name: '블랙리스트 관리', href: '/management' },
            { name: '전체 회원 목록', href: '/management/members' },
            { name: '신규/이탈 고객 분석', href: '/management/churn' },
        ],
    },
    {
        name: '고객 히스토리',
        href: '/customer',
        children: [
            { name: '개별 고객 상세 조회', href: '/customer/search' },
            { name: '리뷰 행동 패턴 분석', href: '/customer/patterns' },
            { name: 'CS 처리 기록', href: '/customer/cs-log' },
        ],
    },
    {
        name: '키워드 통계',
        href: '/keyword',
        children: [
            { name: 'AI 핵심 리포트', href: '/keyword' },
            { name: '제품 키워드 통계', href: '/product' },
            { name: '경쟁사 키워드 비교', href: '/keyword/competitor' },
        ],
    },
    { name: '전체 리뷰 관리', href: '/reviews' },
    { name: 'Dr.O AI', href: '/ai-analysis' },
    { name: '고객 스토리', href: '/story' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const initialOpenMenu = menuItems.find(item => item.children && pathname.startsWith(item.href))?.name || null;
    const [openMenu, setOpenMenu] = useState(initialOpenMenu);

    const handleMenuToggle = (name: string) => {
        setOpenMenu(openMenu === name ? null : name);
    };

    return (
        // 1. 사이드바 전체 스타일 변경
        <aside className="w-64 bg-yellow-400 text-slate-800 h-screen sticky top-0 flex flex-col p-4">
            {/* 로고 스타일 변경 */}
            <div className="text-3xl font-bold mb-8 text-center py-4 text-slate-900">Dr.O</div>

            <nav className="flex flex-col space-y-2">
                {menuItems.map(item => {
                    const hasChildren = !!item.children;
                    const isParentActive = pathname.startsWith(item.href);
                    const isExpanded = openMenu === item.name;

                    // 하위 메뉴가 없는 경우
                    if (!hasChildren) {
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                // 2. 하위 메뉴 없는 아이템 스타일 변경
                                className={`
                                    px-4 py-3 rounded-lg font-medium transition-colors
                                    ${pathname === item.href
                                        ? 'bg-black/10 text-slate-900' // 활성화 상태
                                        : 'hover:bg-black/5'          // 비활성화 & 호버 상태
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        );
                    }

                    // 하위 메뉴가 있는 경우
                    return (
                        <div key={item.name}>
                            <button
                                onClick={() => handleMenuToggle(item.name)}
                                // 3. 하위 메뉴 있는 아이템 스타일 변경
                                className={`
                                    flex justify-between items-center w-full px-4 py-3 rounded-lg font-medium text-left transition-colors
                                    ${isParentActive && !isExpanded ? 'bg-black/5' : ''}
                                    ${isExpanded ? 'bg-black/10' : 'hover:bg-black/5'}
                                `}
                            >
                                <span>{item.name}</span>
                                <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'transform rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                            {/* 하위 메뉴 리스트 */}
                            {isExpanded && (
                                <div className="mt-2 ml-4 pl-3 border-l-2 border-yellow-500 space-y-1">
                                    {item.children?.map(child => {
                                        const isChildActive = pathname === child.href;
                                        return (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                // 4. 하위 메뉴 아이템 스타일 변경
                                                className={`
                                                    block px-3 py-2 rounded-md text-sm transition-colors
                                                    ${isChildActive
                                                        ? 'font-semibold text-slate-900' // 활성화 상태
                                                        : 'hover:text-slate-900'        // 비활성화 & 호버 상태
                                                    }
                                                `}
                                            >
                                                {child.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}