import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr.O - 고객 분석 시스템",
  description: "고객 리뷰 데이터 분석 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* ★★★ 바로 이 부분! ★★★
          사이트 전체의 기본 배경색을 흰색(bg-white)으로 변경합니다.
          기존에 어두운 배경색 클래스가 있다면 이 코드로 교체해주세요.
      */}
      <body className="bg-white">{children}</body>
    </html>
  );
}