"use client";
import React, { useState, useEffect } from "react";

// --- Props 타입 정의 ---
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// --- 컴포넌트 외부 상수: 색상 팔레트 ---
const PALETTE = {
  cardBg: "#ffffff", textDark: "#1f2937", textMuted: "#6b7280",
  line: "#e5e7eb", pageBg: "#f9fafb", blue: "#2563EB",
  green: "#10b981", red: "#ef4444",
};

export default function SummaryPopup({ isOpen, onClose }: Props) {
  // --- 컴포넌트 내부 상태 (State) ---
  const [modalPage, setModalPage] = useState(1); // 모달 페이지 상태 (1 또는 2)

  // isOpen이 false이면 아무것도 렌더링하지 않음
  if (!isOpen) {
    return null;
  }

  // --- 모달 데이터 ---
  const reviewSummary = {
    totalReviews: 128, positiveReviews: 112, negativeReviews: 16,
    positiveKeywords: [
      { keyword: "맛있어요", count: 42 }, { keyword: "친절해요", count: 25 },
      { keyword: "재방문", count: 18 }, { keyword: "분위기", count: 15 },
    ],
    negativeKeywords: [
      { keyword: "주차", count: 8 }, { keyword: "대기시간", count: 5 },
      { keyword: "가격", count: 3 },
    ],
  };

  // --- 모달 스타일 객체 ---
  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', zIndex: 1000, padding: '1rem',
    animation: 'fadeIn 0.3s ease-out forwards',
  };
  const modalWrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '720px',
  };
  const modalCardStyle: React.CSSProperties = {
    backgroundColor: PALETTE.cardBg, border: `1px solid ${PALETTE.line}`,
    borderRadius: '24px', padding: '32px', width: '100%',
    color: PALETTE.textDark, display: 'flex', flexDirection: 'column',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', transform: 'scale(0.95)',
    animation: 'scaleUp 0.4s 0.1s ease-out forwards', position: 'relative',
    minHeight: '420px', overflow: 'hidden',
  };
  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute', top: '16px', right: '16px', background: PALETTE.pageBg,
    border: `1px solid ${PALETTE.line}`, color: PALETTE.textMuted, width: '32px',
    height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '18px', cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.2s', zIndex: 10,
  };

  const handleClose = () => {
    console.log("SummaryPopup 닫기 함수 호출됨"); // 디버깅용
    onClose();
  };

  // ESC 키로 팝업 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);
  const arrowButtonStyle: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    background: PALETTE.cardBg, border: `1px solid ${PALETTE.line}`,
    color: PALETTE.textMuted, width: '40px', height: '40px',
    borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '24px', cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)', transition: 'all 0.2s',
  };
  const modalContentStyle: React.CSSProperties = { display: 'flex', gap: '24px' };
  const leftPaneStyle: React.CSSProperties = { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(145deg, ${PALETTE.blue}, #3b82f6)`, borderRadius: '16px', padding: '24px', color: '#ffffff' };
  const rightPaneStyle: React.CSSProperties = { flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' };
  const statBoxStyle: React.CSSProperties = { flex: 1, backgroundColor: PALETTE.pageBg, borderRadius: '16px', padding: '20px', border: `1px solid ${PALETTE.line}` };
  const keywordBoxStyle: React.CSSProperties = { flex: 1.5, backgroundColor: PALETTE.pageBg, borderRadius: '16px', padding: '20px', border: `1px solid ${PALETTE.line}` };
  const keywordTagStyle: React.CSSProperties = { display: 'inline-block', padding: '6px 12px', borderRadius: '999px', fontSize: '13px', marginRight: '8px', marginBottom: '8px', fontWeight: 500 };

  const animationStyles = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .modal-page { position: absolute; top: 0; left: 0; right: 0; bottom: 0; padding: 32px; transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out; }
    .modal-page.hidden-left { transform: translateX(-100%); opacity: 0; }
    .modal-page.hidden-right { transform: translateX(100%); opacity: 0; }
  `;

  return (
    <div style={modalOverlayStyle} onClick={handleClose}>
      <style>{animationStyles}</style>
      <div style={modalWrapperStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalCardStyle}>
          <button style={closeButtonStyle} onClick={handleClose} aria-label="Close modal">&times;</button>

          <div className={`modal-page ${modalPage !== 1 ? 'hidden-left' : ''}`}>
            <h2 style={{ margin: '0 0 24px 0', textAlign: 'center', fontSize: '24px', fontWeight: 700 }}>✨ 오늘의 리뷰 요약 ✨</h2>
            <div style={modalContentStyle}>
              <div style={leftPaneStyle}>
                <p style={{ margin: 0, fontSize: '16px', color: 'rgba(255,255,255,.8)' }}>총 리뷰</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '64px', fontWeight: 'bold' }}>{reviewSummary.totalReviews}</p>
                <small>건</small>
              </div>
              <div style={rightPaneStyle}>
                <div style={{ flex: 1, display: 'flex', gap: '16px' }}>
                  <div style={statBoxStyle}>
                    <p style={{ margin: 0, fontSize: '14px', color: PALETTE.textMuted, whiteSpace: 'nowrap' }}><span style={{ color: PALETTE.green }}>●</span> 긍정 리뷰</p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '32px', fontWeight: 'bold' }}>{reviewSummary.positiveReviews}</p>
                  </div>
                  <div style={statBoxStyle}>
                    <p style={{ margin: 0, fontSize: '14px', color: PALETTE.textMuted, whiteSpace: 'nowrap' }}><span style={{ color: PALETTE.red }}>●</span> 부정 리뷰</p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '32px', fontWeight: 'bold' }}>{reviewSummary.negativeReviews}</p>
                  </div>
                </div>
                <div style={keywordBoxStyle}>
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: PALETTE.textMuted }}>주요 키워드</p>
                  <div>
                    {reviewSummary.positiveKeywords.slice(0, 4).map(kw => (<span key={kw.keyword} style={{ ...keywordTagStyle, backgroundColor: '#d1fae5', color: '#065f46' }}># {kw.keyword}</span>))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`modal-page ${modalPage !== 2 ? 'hidden-right' : ''}`}>
            <h2 style={{ margin: '0 0 24px 0', textAlign: 'center', fontSize: '24px', fontWeight: 700 }}>🔑 오늘의 키워드 분석 🔑</h2>
            <div style={modalContentStyle}>
              <div style={{ ...rightPaneStyle, flex: 1.2 }}>
                <p style={{ margin: 0, fontWeight: 600, color: PALETTE.green }}>긍정 키워드</p>
                {reviewSummary.positiveKeywords.map(item => (
                  <div key={item.keyword} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: PALETTE.pageBg, padding: '8px 12px', borderRadius: '8px', border: `1px solid ${PALETTE.line}` }}>
                    <span>{item.keyword}</span>
                    <span style={{ fontSize: '14px', color: PALETTE.textMuted }}>{item.count}회 언급</span>
                  </div>
                ))}
              </div>
              <div style={{ ...rightPaneStyle, flex: 0.8 }}>
                <p style={{ margin: 0, fontWeight: 600, color: PALETTE.red }}>부정 키워드</p>
                {reviewSummary.negativeKeywords.map(item => (
                  <div key={item.keyword} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: PALETTE.pageBg, padding: '8px 12px', borderRadius: '8px', border: `1px solid ${PALETTE.line}` }}>
                    <span>{item.keyword}</span>
                    <span style={{ fontSize: '14px', color: PALETTE.textMuted }}>{item.count}회 언급</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {modalPage === 1 && (
          <button
            style={{ ...arrowButtonStyle, right: '-50px' }}
            onClick={() => setModalPage(2)}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = PALETTE.cardBg }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = PALETTE.pageBg }}
          >→</button>
        )}
        {modalPage === 2 && (
          <button
            style={{ ...arrowButtonStyle, left: '-50px' }}
            onClick={() => setModalPage(1)}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = PALETTE.cardBg }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = PALETTE.pageBg }}
          >←</button>
        )}
      </div>
    </div>
  );
}