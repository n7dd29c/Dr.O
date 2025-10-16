"use client";
import React, { useState } from "react";

// --- 아이콘 (인라인 SVG) ---
const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const ArrowLeftIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

// --- 컴포넌트 외부 상수: 색상 팔레트 ---
const PALETTE = {
  cardBg: "#ffffff", textDark: "#1f2937", textMuted: "#6b7280",
  line: "#e5e7eb", pageBg: "#f9fafb", blue: "#2563EB",
  green: "#10b981", red: "#ef4444",
};

export default function SummaryPopup({ isOpen, onClose }) {
  // 모달을 닫을 때 항상 1페이지로 리셋
  const handleClose = () => {
    setModalPage(1); 
    onClose();
  }

  const [modalPage, setModalPage] = useState(1);

  if (!isOpen) {
    return null;
  }

  // --- 모달 데이터 (Mock Data) ---
  const reviewSummary = {
    totalReviews: 128, positiveReviews: 112, negativeReviews: 16,
    positiveKeywords: [
      { keyword: "맛있어요", count: 42 }, { keyword: "친절해요", count: 25 },
      { keyword: "재방문", count: 18 }, { keyword: "분위기", count: 15 },
      { keyword: "청결", count: 12 }, { keyword: "가성비", count: 10 },
    ],
    negativeKeywords: [
      { keyword: "주차", count: 8 }, { keyword: "대기시간", count: 5 },
      { keyword: "가격", count: 3 }, { keyword: "위치", count: 2 },
    ],
  };

  // --- 인라인 CSS 스타일링 객체 ---
  const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', zIndex: 1000, padding: '1rem',
    backdropFilter: 'blur(4px)',
    animation: 'fadeIn 0.3s ease-out forwards',
  };
  const modalWrapperStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '720px',
  };
  const modalCardStyle = {
    backgroundColor: PALETTE.cardBg, border: `1px solid ${PALETTE.line}`,
    borderRadius: '24px', width: '100%',
    color: PALETTE.textDark, display: 'flex', flexDirection: 'column',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)', transform: 'scale(0.95)',
    animation: 'scaleUp 0.4s 0.1s ease-out forwards', position: 'relative',
    minHeight: '520px', overflow: 'hidden',
  };
  const closeButtonStyle = {
    position: 'absolute', top: '16px', right: '16px', background: PALETTE.pageBg,
    border: `1px solid ${PALETTE.line}`, color: PALETTE.textMuted, width: '36px',
    height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '18px', cursor: 'pointer',
    transition: 'all 0.2s', zIndex: 10, boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  };

  // **TS 에러 해결을 위해 base 스타일 분리 및 필수 속성 포함**
  const baseArrowButtonStyle = {
    background: PALETTE.cardBg, border: `1px solid ${PALETTE.line}`,
    color: PALETTE.textMuted, width: '48px', height: '48px',
    borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '24px', cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: 'all 0.2s',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  };
  
  const leftPaneStyle = {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: `linear-gradient(135deg, ${PALETTE.blue}, #3b82f6)`,
    borderRadius: '16px', padding: '32px 24px', color: '#ffffff',
    boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)',
  };
  const statBoxStyle = { flex: 1, backgroundColor: PALETTE.pageBg, borderRadius: '16px', padding: '20px', border: `1px solid ${PALETTE.line}` };
  const keywordTagStyle = {
    display: 'inline-block', padding: '8px 14px', borderRadius: '999px',
    fontSize: '14px', marginRight: '8px', marginBottom: '8px', fontWeight: 600,
    transition: 'transform 0.2s', cursor: 'default',
  };

  // --- 헬퍼 컴포넌트: 키워드 태그 ---
  const KeywordTag = ({ keyword, count, isPositive }) => (
    <span
      style={{
        ...keywordTagStyle,
        backgroundColor: isPositive ? '#d1fae5' : '#fee2e2',
        color: isPositive ? '#065f46' : '#991b1b',
      }}
      title={`${count}회 언급`}
      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      # {keyword}
    </span>
  );


  // --- CSS 애니메이션 및 반응형 스타일 정의 (클래스로 분리) ---
  const animationAndResponsiveStyles = `
    /* 기본 애니메이션 */
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    /* 페이지 슬라이딩 */
    .modal-page { 
      position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
      padding: 32px; 
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease-in-out; 
    }
    .modal-page.hidden-left { transform: translateX(-100%); opacity: 0; pointer-events: none; }
    .modal-page.hidden-right { transform: translateX(100%); opacity: 0; pointer-events: none; }

    /* 모바일 반응형 (600px 이하) */
    @media (max-width: 600px) {
      .modal-card { 
        padding: 20px; 
        min-height: 85vh !important;
        max-width: 95vw !important;
        width: 100%;
      }
      .modal-page { padding: 20px; }
      .page-content { flex-direction: column !important; gap: 16px !important; }
      .page1-right-pane { padding: 0 !important; flex: none !important; }
      .page1-stats { flex-direction: column !important; gap: 16px !important; }
      .arrow-button { right: 8px !important; left: 8px !important; }
    }
  `;

  // 페이지 클래스를 동적으로 결정하는 로직 (슬라이딩 방향 유지)
  const getClassForPage = (pageNumber) => {
    if (modalPage === pageNumber) return '';
    
    // 현재 페이지보다 작으면 왼쪽으로 사라지거나 왼쪽에서 등장 (hidden-left)
    if (pageNumber < modalPage) return 'hidden-left';
    
    // 현재 페이지보다 크면 오른쪽으로 사라지거나 오른쪽에서 등장 (hidden-right)
    if (pageNumber > modalPage) return 'hidden-right';

    return '';
  }


  return (
    <div style={modalOverlayStyle} onClick={handleClose}>
      <style>{animationAndResponsiveStyles}</style>
      <div style={modalWrapperStyle} onClick={e => e.stopPropagation()}>
        <div style={modalCardStyle} className="modal-card">
          <button
            style={closeButtonStyle}
            onClick={handleClose}
            aria-label="모달 닫기"
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = PALETTE.pageBg}
          >
            <XIcon />
          </button>

          {/* ======================= 페이지 1: 주요 요약 ======================= */}
          <div className={`modal-page ${getClassForPage(1)}`}>
            <h2 style={{ margin: '0 0 28px 0', textAlign: 'center', fontSize: '26px', fontWeight: 700 }}>✨ 주간 리뷰 요약 대시보드 ✨</h2>
            <div style={{ display: 'flex', gap: '24px' }} className="page-content">
              {/* 왼쪽: 총 리뷰 수 */}
              <div style={{ ...leftPaneStyle, minHeight: '180px' }}>
                <p style={{ margin: 0, fontSize: '18px', color: 'rgba(255,255,255,.9)' }}>총 분석 리뷰 수</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '80px', fontWeight: 'bold' }}>{reviewSummary.totalReviews}</p>
                <small style={{ fontSize: '16px', color: 'rgba(255,255,255,.7)' }}>지난 7일 기준</small>
              </div>

              {/* 오른쪽: 상세 통계 및 키워드 */}
              <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 0 0 24px' }} className="page1-right-pane">
                {/* 상단: 긍정/부정 통계 */}
                <div style={{ display: 'flex', gap: '16px' }} className="page1-stats">
                  <div style={statBoxStyle}>
                    <p style={{ margin: 0, fontSize: '14px', color: PALETTE.textMuted, whiteSpace: 'nowrap' }}><span style={{ color: PALETTE.green, fontSize: '12px' }}>●</span> 긍정</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '36px', fontWeight: 'bold', color: PALETTE.green }}>{reviewSummary.positiveReviews}</p>
                    <small style={{ color: PALETTE.textMuted }}>({Math.round(reviewSummary.positiveReviews / reviewSummary.totalReviews * 100)}%)</small>
                  </div>
                  <div style={statBoxStyle}>
                    <p style={{ margin: 0, fontSize: '14px', color: PALETTE.textMuted, whiteSpace: 'nowrap' }}><span style={{ color: PALETTE.red, fontSize: '12px' }}>●</span> 부정</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '36px', fontWeight: 'bold', color: PALETTE.red }}>{reviewSummary.negativeReviews}</p>
                    <small style={{ color: PALETTE.textMuted }}>({Math.round(reviewSummary.negativeReviews / reviewSummary.totalReviews * 100)}%)</small>
                  </div>
                </div>
                {/* 하단: 주요 키워드 태그 */}
                <div style={{ ...statBoxStyle, flex: 1 }}>
                  <p style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: PALETTE.textDark }}>핵심 키워드</p>
                  <div>
                    {reviewSummary.positiveKeywords.slice(0, 3).map(kw => (<KeywordTag key={kw.keyword} {...kw} isPositive={true} />))}
                    {reviewSummary.negativeKeywords.slice(0, 1).map(kw => (<KeywordTag key={kw.keyword} {...kw} isPositive={false} />))}
                    <span style={{...keywordTagStyle, backgroundColor: PALETTE.line, color: PALETTE.textMuted, cursor: 'pointer', transition: 'all 0.2s'}}
                      onClick={() => setModalPage(2)}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = PALETTE.line}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = PALETTE.line}
                    >
                      상세 분석 →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================= 페이지 2: 키워드 상세 분석 ======================= */}
          <div className={`modal-page ${getClassForPage(2)}`}>
            <h2 style={{ margin: '0 0 28px 0', textAlign: 'center', fontSize: '26px', fontWeight: 700 }}>🔑 키워드 상세 분석 (탑 10) 🔑</h2>
            <div style={{ display: 'flex', gap: '24px' }} className="page-content">
              {/* 긍정 키워드 목록 */}
              <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, color: PALETTE.green, fontSize: '18px' }}>긍정 키워드</p>
                {reviewSummary.positiveKeywords.map(item => (
                  <div key={item.keyword} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f0fdf4', padding: '10px 16px', borderRadius: '12px', border: `1px solid ${PALETTE.line}`, transition: 'background 0.2s', cursor: 'default' }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#dcfce7'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#f0fdf4'}
                  >
                    <span style={{ fontWeight: 500 }}>{item.keyword}</span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: PALETTE.green }}>{item.count}회 언급</span>
                  </div>
                ))}
              </div>
              {/* 부정 키워드 목록 */}
              <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: 700, color: PALETTE.red, fontSize: '18px' }}>부정 키워드</p>
                {reviewSummary.negativeKeywords.map(item => (
                  <div key={item.keyword} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fef2f2', padding: '10px 16px', borderRadius: '12px', border: `1px solid ${PALETTE.line}`, transition: 'background 0.2s', cursor: 'default' }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#fee4e4'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
                  >
                    <span style={{ fontWeight: 500 }}>{item.keyword}</span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: PALETTE.red }}>{item.count}회 언급</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* ======================= 페이지 3: 실행 가능한 인사이트 ======================= */}
          <div className={`modal-page ${getClassForPage(3)}`}>
            <h2 style={{ margin: '0 0 28px 0', textAlign: 'center', fontSize: '26px', fontWeight: 700, color: PALETTE.blue }}>💡 실행 가능한 개선점 💡</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ padding: '20px', borderRadius: '16px', background: PALETTE.pageBg, border: `1px solid ${PALETTE.red}` }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 600, color: PALETTE.red }}>주차 문제 해결 (최우선)</h3>
                    <p style={{ margin: 0, color: PALETTE.textDark, fontSize: '15px' }}>
                        부정 키워드 중 **"주차"**가 8회로 가장 많이 언급되었습니다. 
                        **액션 플랜:** 주말/피크 타임에 주차 공간을 확보하거나, 근처 공영 주차장 할인 쿠폰 제공 등 구체적인 해결책을 마련해야 합니다.
                    </p>
                </div>
                <div style={{ padding: '20px', borderRadius: '16px', background: PALETTE.pageBg, border: `1px solid ${PALETTE.green}` }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 600, color: PALETTE.green }}>친절함 유지 및 강화</h3>
                    <p style={{ margin: 0, color: PALETTE.textDark, fontSize: '15px' }}>
                        긍정 키워드 중 **"친절해요"**가 25회로 높은 비중을 차지했습니다. 
                        **액션 플랜:** 이 강점을 유지하기 위해 서비스 교육을 정례화하고, 우수 직원을 포상하여 서비스 품질을 표준화해야 합니다.
                    </p>
                </div>
                <div style={{ padding: '20px', borderRadius: '16px', background: PALETTE.pageBg, border: `1px solid ${PALETTE.line}` }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 600, color: PALETTE.red }}>대기 시간 관리</h3>
                    <p style={{ margin: 0, color: PALETTE.textDark, fontSize: '15px' }}>
                        **"대기시간"** 언급은 5회로 적지만, 고객 경험에 치명적입니다. 
                        **액션 플랜:** 웨이팅 알림 시스템 도입을 고려하고, 대기 고객에게 작은 간식을 제공하는 등 경험을 개선해야 합니다.
                    </p>
                </div>
                
                <p style={{ margin: '10px 0 0 0', textAlign: 'center', fontSize: '14px', color: PALETTE.textMuted }}>
                    이러한 인사이트를 바탕으로 다음 주 운영 계획을 수립하세요.
                </p>
            </div>
          </div>
        </div>

        {/* ======================= 이전/다음 페이지 버튼 로직 ======================= */}
        
        {/* 다음 페이지 버튼 (1페이지 또는 2페이지일 때) */}
        {modalPage < 3 && (
          <button
            className="arrow-button"
            style={{ 
              ...baseArrowButtonStyle, 
              right: '-70px',
            }}
            onClick={() => setModalPage(modalPage + 1)}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = PALETTE.cardBg }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = PALETTE.pageBg }}
          >
            <ArrowRightIcon />
          </button>
        )}
        
        {/* 이전 페이지 버튼 (2페이지 또는 3페이지일 때) */}
        {modalPage > 1 && (
          <button
            className="arrow-button"
            style={{ 
              ...baseArrowButtonStyle, 
              left: '-70px',
            }}
            onClick={() => setModalPage(modalPage - 1)}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = PALETTE.cardBg }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = PALETTE.pageBg }}
          >
            <ArrowLeftIcon />
          </button>
        )}
      </div>
    </div>
  );
}
