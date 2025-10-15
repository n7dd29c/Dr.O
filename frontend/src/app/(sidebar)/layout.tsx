import Sidebar from "../components/Sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      <main className="flex-1">
        {/* 이 children이 page.tsx 파일의 내용으로 채워집니다. */}
        {children}
      </main>
    </div>
  );
}