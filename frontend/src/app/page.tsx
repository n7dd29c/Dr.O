"use client";
import { useState } from "react";
import MainDashboard from "../components/dashboard/MainDashboard";
import SummaryPopup from "../components/common/SummaryPopup";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleClosePopup = () => {
    console.log("팝업 닫기 버튼 클릭됨"); // 디버깅용
    setIsPopupOpen(false);
  };

  return (
    <>
      {/* MainDashboard는 이제 스스로 데이터를 가져올 것입니다. */}
      <MainDashboard />
      
      {/* 팝업 관련 로직은 여기에 그대로 둡니다. */}
      <SummaryPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  );
}