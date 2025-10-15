"use client";
import { useState } from "react";
import MainDashboard from "./MainDashboard";
import SummaryPopup from "./components/SummaryPopup";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  return (
    <>
      <MainDashboard />
      <SummaryPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}