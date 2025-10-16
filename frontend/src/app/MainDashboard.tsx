"use client";
import React, { useState } from "react";
// Link 컴포넌트 사용 시 컴파일 오류가 발생하므로, a 태그로 대체합니다.

// --- 기존 고객 문의 데이터 ---
export interface Inquiry {
  id: number;
  subject: string;
  customerName: string;
  date: string;
  status: '처리 완료' | '진행 중' | '미확인';
  type: '제품 불만' | '서비스 문의' | '기술 지원' | '일반 문의';
}

export const customerInquiries: Inquiry[] = [
  { id: 1008, subject: "서비스 이용 중 앱 오류 발생 문의", customerName: "김민준", date: "2024-10-16", status: '미확인', type: '기술 지원' },
  { id: 1007, subject: "신규 기능 도입 관련 제안 요청", customerName: "이서연", date: "2024-10-15", status: '진행 중', type: '일반 문의' },
  { id: 1006, subject: "배송 지연에 따른 환불 문의", customerName: "박하준", date: "2024-10-15", status: '처리 완료', type: '제품 불만' },
  { id: 1005, subject: "제품 품질 개선 사항 피드백", customerName: "정지우", date: "2024-10-14", status: '미확인', type: '제품 불만' },
  { id: 1004, subject: "월별 구독료 결제 내역 문의", customerName: "최도윤", date: "2024-10-13", status: '처리 완료', type: '서비스 문의' },
  { id: 1003, subject: "로그인 불가 문제 해결 요청", customerName: "한지아", date: "2024-10-13", status: '진행 중', type: '기술 지원' },
  { id: 1002, subject: "직원 응대 불만 신고", customerName: "강태영", date: "2024-10-12", status: '미확인', type: '제품 불만' },
  { id: 1001, subject: "기타 일반적인 문의사항", customerName: "윤채원", date: "2024-10-11", status: '처리 완료', type: '일반 문의' },
];

// --- ✅ 새로 추가된 블랙리스트 데이터 및 타입 ---
export interface BlacklistCustomer {
  id: string;
  name: string;
  reason: string;
  lastVisit: string;
  status: '활동중' | '차단' | '주의 필요';
}

export const blacklistCustomers: BlacklistCustomer[] = [
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

// --- ✅ 새로 추가된 일반 회원 데이터 및 타입 ---
export interface Member {
  id: string;
  name: string;
  grade: 'VIP' | 'Gold' | 'Silver' | 'New';
  totalSpent: string;
  joinDate: string;
}

export const allMembers: Member[] = [
  { id: 'VIP001', name: '김민준', grade: 'VIP', totalSpent: '2,540,000원', joinDate: '2023-01-15' },
  { id: 'GLD001', name: '이서연', grade: 'Gold', totalSpent: '1,280,000원', joinDate: '2022-11-20' },
  { id: 'SIL001', name: '박도윤', grade: 'Silver', totalSpent: '760,000원', joinDate: '2023-08-01' },
  { id: 'NEW001', name: '최지우', grade: 'New', totalSpent: '120,000원', joinDate: '2024-10-05' },
  { id: 'SIL002', name: '홍길동', grade: 'Silver', totalSpent: '850,000원', joinDate: '2023-04-10' },
  { id: 'NEW002', name: '이순신', grade: 'New', totalSpent: '50,000원', joinDate: '2024-10-14' },
];


// --- 데이터 처리 ---
const recentInquiries = customerInquiries.slice(0, 5);
const topBlacklist = blacklistCustomers.slice(0, 5); // 상위 5명
const recentMembers = allMembers.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()).slice(0, 4); // 최근 가입 4명


// --- SplitBar 컴포넌트 (변동 없음) ---
function SplitBar({ pos }: { pos: number }) {
  const p = Math.max(0, Math.min(1, pos));
  const split = p * 100;          // 분할 지점(%) — 왼쪽=긍정 끝나는 지점
  const blend = 3;                 // 경계에서 섞이는 폭(%) — 4~10 사이에서 취향대로 조절
  const a = Math.max(0, split - blend / 2);
  const b = Math.min(100, split + blend / 2);

  const bg = `linear-gradient(
    90deg,
    #60a5fa 0%,
    #60a5fa ${a}%,
    #ef4444 ${b}%,
    #ef4444 100%
  )`;

  return (
    <div
      style={{
        height: 10,
        borderRadius: 999,
        background: bg,
        boxShadow: "inset 0 0 0 1px #e5e7eb",
        overflow: "hidden",
      }}
    />
  );
}

const rows = [
  { s: "제품 A", sales: 4.3, rating: 4.3, pos: 0.78 }, // pos = 긍정 비율(0~1)
  { s: "제품 B", sales: 4.9, rating: 4.9, pos: 0.62 },
  { s: "제품 C", sales: 4.0, rating: 4.0, pos: 0.35 },
];

// --- 상태별 스타일링 유틸리티 ---
const getInquiryStatusStyles = (status: Inquiry['status']) => {
    switch (status) {
        case '처리 완료':
            return { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }; // green
        case '진행 중':
            return { color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' }; // blue
        case '미확인':
            return { color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }; // amber/orange
        default:
            return { color: '#6b7280', background: '#f3f4f6' };
    }
};

const getBlacklistStatusStyles = (status: BlacklistCustomer['status']) => {
    switch (status) {
        case '차단':
            return { color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }; // red
        case '주의 필요':
            return { color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }; // orange
        case '활동중':
        default:
            return { color: '#6b7280', background: 'rgba(107, 114, 128, 0.1)' }; // gray
    }
};

const getMemberGradeStyles = (grade: Member['grade']) => {
    switch (grade) {
        case 'VIP':
            return { color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)' }; // purple
        case 'Gold':
            return { color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }; // amber
        case 'Silver':
            return { color: '#9ca3af', background: 'rgba(156, 163, 175, 0.1)' }; // silver/gray
        case 'New':
        default:
            return { color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' }; // blue
    }
};

export default function MainDashboard() {
  const [pageBg, setPageBg] = useState("#ffffff");
  const [topbarBg, setTopbarBg] = useState("#fff98eff");

  // 공통 색상 팔레트
  const textDark = "#0b1220";                 
  const textMuted = "#6b7280";                
  const line = "#e5e7eb";                     
  const blue = "#2563EB";

  // 탑바/그리팅(어두운 배경)용
  const onTopbarText = "#000000ff";
  const onTopbarMuted = "rgba(2, 2, 2, 0.7)";
  const onTopbarBorder = "rgba(255, 0, 0, 0.12)";
  const onTopbarChipBg = "rgba(192, 63, 63, 0.08)";

  return (
    <div className="wrap" style={{ minHeight: "100vh", backgroundColor: pageBg, color: textDark, fontFamily: "Inter,system-ui,Arial,sans-serif" }}>
      {/* Top Bar */}
      <header
        className="topbar"
        style={{
          height: 92,
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "0 24px",
          backgroundColor: topbarBg,
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div className="brand" style={{ fontWeight: 700, fontSize: 40, color: onTopbarText, letterSpacing: 0.2, minWidth: 72 }}>
          Dr.O
        </div>

        {/* Link 컴포넌트 대신 일반 <a> 태그 사용 */}
        <nav className="nav" style={{ flex: 1, display: "flex", justifyContent: "center", gap: 18 }}>
          <a className="active" href="#" style={{ color: onTopbarText, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            대시보드
          </a>
          <a href="/management" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            고객관리
          </a>
          <a href="/review" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            전체리뷰관리
          </a>
          <a href="/ai" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            Dr.O AI
          </a>
          <a href="/customer" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            고객 히스토리
          </a>
          <a href="/keyword" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            키워드 통계
          </a>
        </nav>

        <div className="actions" style={{ minWidth: 120, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
          <button
            className="icon"
            aria-label="search"
            style={{
              background: onTopbarChipBg,
              border: `1px solid ${onTopbarBorder}`,
              borderRadius: 12,
              color: onTopbarText,
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            🔍
          </button>
          <button
            className="icon"
            aria-label="notifications"
            style={{
              background: onTopbarChipBg,
              border: `1px solid ${onTopbarBorder}`,
              borderRadius: 12,
              color: onTopbarText,
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            🔔
          </button>
          <div className="avatar" aria-label="profile" style={{ width: 32, height: 32, background: "linear-gradient(135deg,#64748b,#0ea5e9)", borderRadius: "50%" }} />
        </div>
      </header>

      {/* Greeting (탑바와 동일 배경) */}
      <section
        className="greet"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          height: 200,
          gap: 24,
          padding: 24,
          backgroundColor: topbarBg,
          color: onTopbarText,
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 10px 0", fontWeight: 510,fontSize: 40, lineHeight: 1.15, color: onTopbarText }}>안녕하세요, 태영님!</h1>
          <p style={{ margin: 0, color: onTopbarMuted, fontSize: 14 }}>그동안의 지난 기록들을 확인해보세요.</p>

          <div className="meta" style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
            <div
              className="pill"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: onTopbarChipBg,
                border: `1px solid ${onTopbarBorder}`,
                borderRadius: 999,
                padding: "8px 12px",
                color: "#000000ff",
              }}
            >
              <span>★</span> <b>4.1</b> 평균 별점
            </div>
            <div
              className="pill"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: onTopbarChipBg,
                border: `1px solid ${onTopbarBorder}`,
                borderRadius: 999,
                padding: "8px 12px",
                color: "#000000ff",
              }}
            >
              <span>🗓</span> <b>76%</b> 만족도 비율
            </div>
            <div
              className="pill"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: onTopbarChipBg,
                border: `1px solid ${onTopbarBorder}`,
                borderRadius: 999,
                padding: "8px 12px",
                color: "#000000ff",
              }}
            >
              <span>👍🏻</span> <b>2549</b> 누적 긍정 리뷰
            </div>
            <div
              className="pill"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: onTopbarChipBg,
                border: `1px solid ${onTopbarBorder}`,
                borderRadius: 999,
                padding: "8px 12px",
                color: "#000000ff",
              }}
            >
              <span>👎🏻</span> <b>633</b> 누적 부정 리뷰
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="grid" style={{ display: "grid", gap: 24, gridTemplateColumns: "1.2fr 1fr 1fr", alignItems: "stretch", padding: "0 24px 36px", marginTop: 20 }}>
        
        {/* 1. 최근 고객 문의 (Inquiries) */}
        <section className="card row1" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", minHeight: 260 }}>
          <div className="card-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>최근 고객 문의 (5건)</h3>
            <a 
              href="/management" 
              className="ghost"
              style={{
                background: "transparent",
                border: `1px solid ${line}`,
                color: textMuted,
                borderRadius: 10,
                padding: "6px 10px",
                cursor: "pointer",
                textDecoration: 'none',
                fontSize: 13
              }}
            >
              전체 보기 →
            </a>
          </div>

          <ul className="inquiries" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: 'auto' }}>
            {recentInquiries.map((inquiry) => {
                const statusStyles = getInquiryStatusStyles(inquiry.status);
                return (
                    <li
                        key={inquiry.id}
                        className="inquiry-item"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            background: "#f9fafb",
                            border: `1px solid ${line}`,
                            padding: 10,
                            borderRadius: 12,
                        }}
                    >
                        {/* ID와 날짜 */}
                        <div style={{ minWidth: 60, fontSize: 12, color: textMuted, textAlign: 'center' }}>
                            <div style={{ fontWeight: 600 }}>#{inquiry.id}</div>
                            <small>{inquiry.date.substring(5)}</small>
                        </div>

                        {/* 문의 제목 */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ margin: 0, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={inquiry.subject}>
                                {inquiry.subject}
                            </p>
                            <small style={{ color: textMuted, fontSize: 12 }}>{inquiry.customerName} / {inquiry.type}</small>
                        </div>

                        {/* 상태 뱃지 */}
                        <span 
                            className="status-badge" 
                            style={{
                                fontSize: 12,
                                fontWeight: 600,
                                borderRadius: 999,
                                padding: "4px 8px",
                                ...statusStyles,
                                minWidth: 70,
                                textAlign: 'center',
                                flexShrink: 0
                            }}
                        >
                            {inquiry.status}
                        </span>
                    </li>
                );
            })}
          </ul>
        </section>


        {/* 2. ✅ 블랙리스트 고객 (Assignments 카드 대체) */}
        <section className="card row1" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", minHeight: 260 }}>
          <div className="card-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0, color: '#ef4444' }}>블랙리스트 Top 5</h3>
            <a 
              href="/management" 
              className="ghost"
              style={{
                background: "transparent",
                border: `1px solid ${line}`,
                color: textMuted,
                borderRadius: 10,
                padding: "6px 10px",
                cursor: "pointer",
                textDecoration: 'none',
                fontSize: 13
              }}
            >
              전체 보기 →
            </a>
          </div>
          <ul className="blacklist" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: 'auto' }}>
            {topBlacklist.map((customer) => {
                const statusStyles = getBlacklistStatusStyles(customer.status);
                return (
                    <li
                        key={customer.id}
                        className="customer-item"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 90px 70px",
                            gap: 10,
                            alignItems: "center",
                            background: "#f9fafb",
                            border: `1px solid ${line}`,
                            padding: 10,
                            borderRadius: 12,
                        }}
                    >
                        {/* 고객 정보 */}
                        <div style={{ minWidth: 0 }}>
                            <p style={{ margin: 0, fontWeight: 600, color: textDark }}>{customer.name}</p>
                            <small style={{ color: textMuted, fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={customer.reason}>{customer.reason}</small>
                        </div>
                        
                        {/* 상태 뱃지 */}
                        <span 
                            className="status-badge" 
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                                borderRadius: 999,
                                padding: "4px 8px",
                                ...statusStyles,
                                textAlign: 'center',
                                flexShrink: 0
                            }}
                        >
                            {customer.status}
                        </span>
                        <small style={{ color: textMuted, fontSize: 11, textAlign: 'right' }}>{customer.lastVisit.substring(5)}</small>
                    </li>
                );
            })}
          </ul>
        </section>

        {/* 3. Attendance (변동 없음) */}
        <section className="card row1" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", minHeight: 260 }}>
          <div className="card-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Attendance (리뷰 만족도)</h3>
            <span className="badge" style={{ background: "#e7e7e7ff", border: `1px solid ${line}`, borderRadius: 999, color: textMuted, padding: "4px 8px", fontSize: 12 }}>
              This week
            </span>
          </div>

          <div className="calendar" style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10, flex: 1 }}>
            {[
              { d: 17, t: "on" },
              { d: 18, t: "on" },
              { d: 19, t: "on" },
              { d: 20, t: "on" },
              { d: 21, t: "off" },
              { d: 18, t: "abs" },
              { d: 19, t: "tardy" },
            ]
              .slice(0, 7)
              .map((x, i) => (
                <div
                  key={i}
                  className={`cal ${x.t}`}
                  style={{
                    background: "#f9fafb",
                    border: `1px solid ${line}`,
                    borderRadius: 10,
                    padding: 10,
                    textAlign: "center",
                    color: textMuted,
                    outline: x.t === "on" ? "2px solid #10b981" : x.t === "abs" ? "2px solid #ef4444" : x.t === "tardy" ? "2px solid #f59e0b" : "2px solid " + line,
                    backgroundColor: x.t === "on" ? "#ecfdf5" : x.t === "abs" ? "#fef2f2" : x.t === "tardy" ? "#fff7ed" : "#f9fafb",
                  }}
                >
                  {x.d}
                </div>
              ))}
          </div>

          <div className="legend" style={{ display: "flex", gap: 18, color: textMuted, fontSize: 13, marginTop: 8 }}>
            <span className="dot on" style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", marginRight: -12, marginTop: 5, background: "#10b981", border: `1px solid ${line}` }} />
            On time (1시간 내)
            <span className="dot abs" style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", marginRight: -12, marginTop: 5, background: "#ef4444", border: `1px solid ${line}` }} />
            Very Slow (24시간 초과)
            <span className="dot tardy" style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", marginRight: -12, marginTop: 5, background: "#f59e0b", border: `1px solid ${line}` }} />
            Slow (3시간 초과)
          </div>
        </section>

        {/* 4. Grades (wide) - 변동 없음 */}
        <section className="card wide" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gridColumn: "1 / span 2" }}>
          <div className="card-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>이번 주 평균 별점</h3>
            <span className="avg" style={{ color: textMuted }}>
              <b>4.7</b> 점
            </span>
          </div>
          <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderTop: `1px solid ${line}`, padding: 10, textAlign: "left" }}>제품명</th>
                <th style={{ borderTop: `1px solid ${line}`, padding: 10, textAlign: "left" }}>판매량</th>
                <th style={{ borderTop: `1px solid ${line}`, padding: 10, textAlign: "left" }}>별점</th>
                <th style={{ borderTop: `1px solid ${line}`, padding: 10, textAlign: "left" }}>긍정</th>
                <th style={{ borderTop: `1px solid ${line}`, padding: 10, textAlign: "right" }}>부정</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const neg = 1 - row.pos;
                return (
                  <tr key={row.s}>
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10, fontWeight: 500 }}>{row.s}</td>
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10 }}>{row.sales.toFixed(1)}</td>
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10, fontWeight: 600 }}>{row.rating.toFixed(1)}</td>

                    {/* 긍정/부정 스플릿 바 (왼쪽=긍정, 오른쪽=부정) */}
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10, minWidth: 420 }}>
                      <div style={{ display: "grid", gap: 6 }}>
                        <SplitBar pos={row.pos} />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280" }}>
                          <span>긍정 {Math.round(row.pos * 100)}%</span>
                          <span>부정 {Math.round((1 - row.pos) * 100)}%</span>
                        </div>
                      </div>
                    </td>

                    {/* 부정 수치(선택) */}
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10, textAlign: "right" }}>
                      {Math.round(neg * 100)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* 5. ✅ 최근 신규 회원 (Upcoming events 카드 대체) */}
        <section className="card" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column" }}>
          <div className="card-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>최근 가입 회원 (New/Silver)</h3>
            <a 
              href="/customer" 
              className="ghost"
              style={{
                background: "transparent",
                border: `1px solid ${line}`,
                color: textMuted,
                borderRadius: 10,
                padding: "6px 10px",
                cursor: "pointer",
                textDecoration: 'none',
                fontSize: 13
              }}
            >
              전체 보기 →
            </a>
          </div>
          <ul className="members" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1, overflowY: 'auto' }}>
            {recentMembers.map((member) => {
                const gradeStyles = getMemberGradeStyles(member.grade);
                return (
                    <li
                        key={member.id}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 60px 80px",
                            gap: 12,
                            alignItems: "center",
                            background: "#f9fafb",
                            border: `1px solid ${line}`,
                            borderRadius: 12,
                            padding: 10,
                        }}
                    >
                        {/* 이름 및 가입일 */}
                        <div style={{ minWidth: 0 }}>
                            <p style={{ margin: 0, fontWeight: 600, color: textDark }}>{member.name}</p>
                            <small style={{ color: textMuted, fontSize: 11 }}>가입: {member.joinDate}</small>
                        </div>
                        
                        {/* 등급 뱃지 */}
                        <span 
                            className="grade-badge" 
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                                borderRadius: 999,
                                padding: "4px 8px",
                                ...gradeStyles,
                                textAlign: 'center',
                                flexShrink: 0
                            }}
                        >
                            {member.grade}
                        </span>
                        {/* 금액 */}
                        <div style={{ color: textDark, fontSize: 12, fontWeight: 500, textAlign: 'right' }}>
                            {member.totalSpent.split(',')[0]}
                        </div>
                    </li>
                );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
