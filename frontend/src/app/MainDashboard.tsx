// app/MainDashboard.tsx
"use client";
import React, { useState } from "react";
import Link from 'next/link';

function SplitBar({ pos }: { pos: number }) {
  const p = Math.max(0, Math.min(1, pos));
  const split = p * 100;          // 분할 지점(%) — 왼쪽=긍정 끝나는 지점
  const blend = 3;                 // 경계에서 섞이는 폭(%) — 4~10 사이에서 취향대로 조절
  const a = Math.max(0, split - blend / 2);
  const b = Math.min(100, split + blend / 2);

  // 단일 gradient: 좌측(녹→청) → 경계(a~b)에서 청→주/빨을 부드럽게 섞기 → 우측(주→빨)
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
        // 바탕을 살짝 깔아주면 양 끝이 더 또렷합니다.
        boxShadow: "inset 0 0 0 1px #e5e7eb",
        overflow: "hidden",
      }}
    />
  );
}

const rows = [
  { s: "1", sales: 4.3, rating: 4.3, pos: 0.78 }, // pos = 긍정 비율(0~1)
  { s: "2", sales: 4.9, rating: 4.9, pos: 0.62 },
  { s: "3", sales: 4.0, rating: 4.0, pos: 0.35 },
];

export default function MainDashboard() {
  // ✅ 페이지/탑바 배경색을 상태로 관리 (컬러피커로 즉시 변경)
  const [pageBg, setPageBg] = useState("#ffffff");   // 페이지 전체 배경
  const [topbarBg, setTopbarBg] = useState("#fff98eff"); // 탑바 + 그리팅 배경

  // 공통 색상 팔레트 (필요 시 조정)
  const textDark = "#0b1220";                 // 밝은 배경에서 본문 텍스트
  const textMuted = "#6b7280";                // 보조 텍스트
  const line = "#e5e7eb";                     // 라인
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
          // 헤더 밑 흰줄 제거: borderBottom 미적용
          backgroundColor: topbarBg,
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div className="brand" style={{ fontWeight: 700, fontSize: 40, color: onTopbarText, letterSpacing: 0.2, minWidth: 72 }}>
          Dr.O
        </div>

        <nav className="nav" style={{ flex: 1, display: "flex", justifyContent: "center", gap: 18 }}>
          <a className="active" href="#" style={{ color: onTopbarText, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            대시보드
          </a>
          <Link href="/management" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            고객관리
          </Link>
          <Link href="/review" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            전체리뷰관리
          </Link>
          <a href="#" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            Dr.O AI
          </a>
          <Link href="/customer" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            고객 히스토리
          </Link>
          <Link href="/keyword" style={{ color: onTopbarMuted, textDecoration: "none", padding: "8px 12px", borderRadius: 10 }}>
            키워드 통계
          </Link>
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

      {/* Grid (배치 자체는 기존 클래스 사용) */}
      <main className="grid" style={{ display: "grid", gap: 24, gridTemplateColumns: "1.2fr 1fr 1fr", alignItems: "stretch", padding: "0 24px 36px" }}>
        {/* Task progress */}
        <section className="card row1" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", minHeight: 260 }}>
          <div className="card-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Task progress</h3>
            <span className="badge" style={{ background: "#e7e7e7ff", border: `1px solid ${line}`, borderRadius: 999, color: textMuted, padding: "4px 8px", fontSize: 12 }}>
              This week
            </span>
          </div>

          <div className="bars" style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160, padding: "8px 0" }}>
            {[
              { label: "Sat", v: 12 },
              { label: "Sun", v: 18 },
              { label: "Mon", v: 8 },
              { label: "Tue", v: 6 },
              { label: "Wed", v: 10 },
              { label: "Thu", v: 17 },
              { label: "Fri", v: 14 },
            ].map((d) => (
              <div key={d.label} className="bar" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div className="bar-fill" style={{ width: 18, height: d.v * 6, borderRadius: 8, background: "linear-gradient(180deg,#a78bfa,#8b5cf6)" }} />
                <span className="bar-label" style={{ color: textMuted, fontSize: 12 }}>
                  {d.label}
                </span>
              </div>
            ))}
          </div>

          <div className="legend" style={{ display: "flex", gap: 18, color: textMuted, fontSize: 13, marginTop: 8 }}>
            <span className="dot complete" style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", marginRight: 6, background: "#8b5cf6", border: `1px solid ${line}` }} />
            Complete
            <span className="dot pending" style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", marginRight: 6, background: "#324055", border: `1px solid ${line}` }} />
            Pending
          </div>
        </section>

        {/* Assignments */}
        <section className="card row1" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", minHeight: 260 }}>
          <div className="card-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Assignments</h3>
            <button
              className="ghost"
              style={{
                background: "transparent",
                border: `1px solid ${line}`,
                color: textMuted,
                borderRadius: 10,
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              See all →
            </button>
          </div>
          <ul className="tasks" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            <li
              className="task done"
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr auto",
                gap: 12,
                alignItems: "center",
                background: "#f3f4f6",
                border: `1px solid ${line}`,
                padding: 10,
                borderRadius: 12,
                opacity: 0.75,
              }}
            >
              <input type="checkbox" defaultChecked aria-label="done" />
              <div>
                <p style={{ margin: 0 }}>Human Behaviour – A Study</p>
                <small style={{ color: textMuted }}>18/07/2023</small>
              </div>
              <span className="status ok" style={{ fontSize: 12, color: "#10b981" }}>
                Done
              </span>
            </li>

            <li
              className="task"
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr auto auto",
                gap: 12,
                alignItems: "center",
                background: "#f9fafb",
                border: `1px solid ${line}`,
                padding: 10,
                borderRadius: 12,
              }}
            >
              <input type="checkbox" aria-label="todo" />
              <div>
                <p style={{ margin: 0 }}>Cognitive psychology: Identify notion of emotions</p>
                <small style={{ color: textMuted }}>19/07/2023</small>
              </div>
              <button className="chip warn" style={{ border: "none", borderRadius: 999, padding: "6px 10px", fontSize: 12, background: "rgba(245,158,11,0.15)", color: "#fbbf24" }}>
                Overdue
              </button>
              <button className="btn sm" style={{ background: blue, color: "#fff", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>
                View
              </button>
            </li>

            <li
              className="task"
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr auto",
                gap: 12,
                alignItems: "center",
                background: "#f9fafb",
                border: `1px solid ${line}`,
                padding: 10,
                borderRadius: 12,
              }}
            >
              <input type="checkbox" aria-label="todo" />
              <div>
                <p style={{ margin: 0 }}>Read “Sense and Sensibility” by Jane Austen</p>
                <small style={{ color: textMuted }}>26/07/2023</small>
              </div>
              <span className="status subtle" style={{ fontSize: 12, color: textMuted }}>
                On time
              </span>
            </li>
          </ul>
        </section>

        {/* Attendance */}
        <section className="card row1" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", minHeight: 260 }}>
          <div className="card-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Attendance</h3>
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
            On time
            <span className="dot abs" style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", marginRight: -12, marginTop: 5, background: "#ef4444", border: `1px solid ${line}` }} />
            Absent
            <span className="dot tardy" style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", marginRight: -12, marginTop: 5, background: "#f59e0b", border: `1px solid ${line}` }} />
            Tardy
          </div>
        </section>

        {/* Grades (wide) */}
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
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10 }}>{row.s}</td>
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10 }}>{row.sales.toFixed(1)}</td>
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10 }}>{row.rating.toFixed(1)}</td>

                    {/* ✅ 긍정/부정 스플릿 바 (왼쪽=긍정, 오른쪽=부정) */}
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10, minWidth: 420 }}>
                      <div style={{ display: "grid", gap: 6 }}>
                        <SplitBar pos={row.pos} />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280" }}>
                          <span>긍정 {Math.round(row.pos * 100)}%</span>
                          <span>부정 {Math.round((1 - row.pos) * 100)}%</span>
                        </div>
                      </div>
                    </td>

                    {/* 부정 수치(선택) — 필요 없으면 이 칸 통째로 삭제 가능 */}
                    <td style={{ borderTop: `1px solid ${line}`, padding: 10, textAlign: "right" }}>
                      {Math.round(neg * 100)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Upcoming events */}
        <section className="card" style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column" }}>
          <div className="card-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Upcoming events</h3>
          </div>
          <ul className="timeline" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            <li style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 12, alignItems: "center" }}>
              <div className="time" style={{ color: textMuted }}>
                03:00 pm
              </div>
              <div className="event purple" style={{ background: "#f9fafb", border: `1px solid ${line}`, borderRadius: 12, padding: 10 }}>
                <p style={{ margin: 0 }}>
                  <b>Lesson with Charls Dickenson</b>
                </p>
                <small style={{ color: textMuted }}>Behavioural Psychology</small>
              </div>
            </li>
            <li style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 12, alignItems: "center" }}>
              <div className="time" style={{ color: textMuted }}>
                04:00 pm
              </div>
              <div className="event blue" style={{ background: "#f9fafb", border: `1px solid ${line}`, borderRadius: 12, padding: 10 }}>
                <p style={{ margin: 0 }}>
                  <b>Webinar</b>
                </p>
                <small style={{ color: textMuted }}>New ways of treatment</small>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}