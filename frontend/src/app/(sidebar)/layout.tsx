// src/app/(sidebar)/layout.tsx

// 1. components 폴더에 있는 Sidebar 부품을 불러옵니다.
import Sidebar from '@/components/layout/Sidebar';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. flex를 이용해 사이드바와 메인 콘텐츠를 가로로 나란히 배치합니다.
    //    전체 배경색은 최상위 layout.tsx에서 관리하므로 여기서는 지정하지 않습니다.
    <div className="flex min-h-screen">
      
      {/* 3. 왼쪽에 사이드바 컴포넌트를 배치합니다. */}
      <Sidebar />

      {/* 4. 오른쪽 메인 콘텐츠 영역입니다. */}
      <main className="flex-1 p-8">
        {/* flex-1: 사이드바를 제외한 나머지 공간을 모두 차지합니다.
          p-8:    이 영역의 안쪽에 사방으로 32px의 여백을 만들어
                  사이드바와 내용물 사이에 보기 좋은 간격을 만듭니다.
        */}
        {children}
      </main>
      
    </div>
  );
}