// src/app/(sidebar)/layout.tsx

// 1. Sidebar 컴포넌트를 불러옵니다.
//    (components 폴더 안에 Sidebar.tsx가 있다고 가정)
import Sidebar from '@/app/components/Sidebar';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. 전체 배경을 연한 회색으로 하고, flex 레이아웃을 적용합니다.
    <div className="flex min-h-screen bg-gray-100">
      
      {/* 3. 사이드바 컴포넌트를 왼쪽에 배치합니다. */}
      <Sidebar />

      {/* 4. 메인 콘텐츠 영역입니다. 이 부분이 간격을 만듭니다. */}
      <main className="flex-1 p-8">
        {/* flex-1 : 사이드바를 제외한 나머지 공간을 모두 차지합니다.
          p-8 :  이 영역의 '안쪽'으로 사방에 32px만큼의 여백을 만듭니다.
                 이 여백 때문에 사이드바와 내용(카드) 사이에 공간이 생깁니다.
        */}
        {children}
      </main>
      
    </div>
  );
}