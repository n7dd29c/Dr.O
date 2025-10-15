import Link from "next/link";

export default function ReviewsPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#ffffffff",
        fontFamily: "Inter, system-ui, Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          position: "sticky",
          top: 0,
          alignSelf: "start",
          height: "100dvh",
          borderRight: "1px solid #e5e7eb",
          background: "#000000ff",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Link
                href="/"
                style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "#fff",
                color: "#0b1220",
                textDecoration: "none",
                fontWeight: 700,
                }}
            >
                ← 대시보드로 돌아가기
            </Link>
        </div>

        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Dr.O</h1>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>전체리뷰관리</h1>

        <nav style={{ display: "grid", gap: 6, marginTop: 8 }}>
          <button
            style={{
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            키워드분석
          </button>
          <button
            style={{
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            긍정/부정 비율
          </button>
          <button
            style={{
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            필터링 현황
          </button>
        </nav>
      </aside>

      {/* Main (비움) */}
      <main style={{ padding: 24 }}>
        {/* 여기는 비워둡니다. 이후 표/차트/필터 UI 붙이시면 됩니다. */}
      </main>
    </div>
  );
}
