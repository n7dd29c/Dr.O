"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

// 메뉴 데이터 구조 (나중에 이 부분도 data 파일로 분리할 수 있습니다)
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
            { name: '개별 고객 상세 조회', href: '/customer' }, // 목록 페이지로 연결
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
    { name: '전체 리뷰 관리', href: '/review' }, // review로 경로 수정
    { name: 'Dr.O AI', href: '/ai-analysis' },
    { name: '고객 스토리', href: '/story' },
];

export default function Sidebar() {
    const pathname = usePathname();
    
    // 페이지 로드 시 현재 경로에 맞는 메뉴를 펼치기 위한 로직
    const initialOpenMenu = menuItems.find(item => item.children && pathname.startsWith(item.href))?.name || null;
    const [openMenu, setOpenMenu] = useState(initialOpenMenu);

    // 메뉴를 클릭했을 때 펼치거나 닫는 함수
    const handleMenuToggle = (name: string) => {
        setOpenMenu(openMenu === name ? null : name);
    };

    return (
        // 사이드바 전체 스타일: 너비, 배경색, 글자색, 높이 등
        <aside className="w-64 bg-yellow-300 text-slate-800 h-screen sticky top-0 flex flex-col p-4">
            {/* 로고 */}
            <div className="text-3xl font-bold mb-8 text-center py-4 text-slate-900">Dr.O</div>

            <nav className="flex flex-col space-y-2">
                {menuItems.map(item => {
                    const hasChildren = !!item.children;
                    // 현재 경로가 메뉴의 경로로 시작하는지 확인 (하위 메뉴 활성화 표시용)
                    const isParentActive = pathname.startsWith(item.href);
                    // 메뉴가 펼쳐져 있는지 확인
                    const isExpanded = openMenu === item.name;

                    // 1. 하위 메뉴가 없는 경우 (단일 링크)
                    if (!hasChildren) {
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    px-4 py-3 rounded-lg font-medium transition-colors
                                    ${pathname === item.href
                                        ? 'bg-black/10 text-slate-900' // 현재 페이지일 때 (활성화)
                                        : 'hover:bg-black/5'          // 마우스를 올렸을 때
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        );
                    }

                    // 2. 하위 메뉴가 있는 경우 (펼쳐지는 버튼 + 링크 목록)
                    return (
                        <div key={item.name}>
                            <button
                                onClick={() => handleMenuToggle(item.name)}
                                className={`
                                    flex justify-between items-center w-full px-4 py-3 rounded-lg font-medium text-left transition-colors
                                    ${isParentActive && !isExpanded ? 'bg-black/5' : ''}
                                    ${isExpanded ? 'bg-black/10' : 'hover:bg-black/5'}
                                `}
                            >
                                <span>{item.name}</span>
                                <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'transform rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                            
                            {/* 하위 메뉴 리스트 (펼쳐졌을 때만 보임) */}
                            {isExpanded && (
                                <div className="mt-2 ml-4 pl-3 border-l-2 border-yellow-500 space-y-1">
                                    {item.children?.map(child => {
                                        const isChildActive = pathname === child.href;
                                        return (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={`
                                                    block px-3 py-2 rounded-md text-sm transition-colors
                                                    ${isChildActive
                                                        ? 'font-semibold text-slate-900' // 활성화 상태
                                                        : 'hover:text-slate-900'
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