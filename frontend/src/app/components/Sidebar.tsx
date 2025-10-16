"use client";

import React from "react";

// Next.js 모듈 (Link, usePathname)을 주석 처리하여 컴파일 오류 해결
// import Link from "next/link";
// import { usePathname } from "next/navigation";

/** * IDE에서 마우스를 사용하여 색상 피커로 변경할 수 있도록 
 * 상태 관리 없이 단순 상수로 선언합니다.
 */
const THEME = {
  bg: "#0f172a",       // 사이드바 배경
  fg: "#ffffff",       // 활성 글자 색
  inactive: "#cbd5e1", // 비활성 글자 색
  activeBg: "#0b1220", // 활성 메뉴 배경
  hoverBg: "#334155",  // 호버 배경
} as const;

const MENU = [
  { name: "대시보드", href: "/" },
  { name: "고객관리", href: "/management" },
  { name: "고객 히스토리", href: "/customer" },
  { name: "전체 리뷰 관리", href: "/review" },
  { name: "Dr.O AI", href: "/ai-analysis" },
  { name: "키워드 통계", href: "/keyword" },
];

// Next.js 라우팅을 사용할 수 없으므로 임시 isActive 및 usePathname 대체
// 실제 Next.js 환경에서는 이 코드를 제거하고 원본 Link/usePathname을 사용해야 합니다.
const usePathname = () => "/"; 
const isActive = (href: string, pathname: string) => pathname === href;

export default function Sidebar() {
  const pathname = usePathname();

  // THEME 상수를 직접 사용합니다.
  const currentTheme = THEME;
  const activeChecker = (href: string) => isActive(href, pathname);

  // CSS 변수로 내릴 스타일 객체 생성
  const customStyles = {
    background: currentTheme.bg,
    color: currentTheme.fg,
    // CSS 변수로 내려서 :hover 등 순수 CSS로 처리
    ["--sb-fg" as any]: currentTheme.fg,
    ["--sb-inactive" as any]: currentTheme.inactive,
    ["--sb-active-bg" as any]: currentTheme.activeBg,
    ["--sb-hover-bg" as any]: currentTheme.hoverBg,
  } as React.CSSProperties;

  return (
    <aside
      className="sb w-64 h-screen sticky top-0 flex flex-col p-4 shadow-xl"
      style={customStyles}
    >
      {/* Dr.O 로고/타이틀 */}
      <div className="text-3xl font-bold mb-8 text-center py-4">Dr.O</div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex flex-col space-y-2 flex-grow">
        {MENU.map((item) => {
          const active = activeChecker(item.href);
          return (
            // Link 대신 일반 div를 사용하여 컴파일 오류 해결
            <div
              key={item.href}
              className="px-4 py-3 rounded-lg transition-colors font-medium cursor-pointer"
              style={{
                color: active ? "var(--sb-fg)" : "var(--sb-inactive)",
                background: active ? "var(--sb-active-bg)" : "transparent",
              }}
            >
              {item.name}
            </div>
          );
        })}
      </nav>

      {/* 이전의 색상 설정 UI는 제거되었습니다. */}
      <div className="mt-8 pt-4 border-t border-gray-700/50 text-center text-xs text-gray-500">
        색상 설정은 상단 THEME 상수를 직접 수정해주세요.
      </div>

      {/* 호버 스타일은 CSS 변수 사용 */}
      <style jsx>{`
        .sb div:hover {
          background: var(--sb-hover-bg);
          color: var(--sb-fg) !important;
        }
      `}</style>
    </aside>
  );
}
