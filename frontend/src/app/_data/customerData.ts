// 고객 데이터의 타입을 정의해서 실수를 방지합니다.
export interface Customer {
  id: string;
  name: string;
  joinDate: string;
  totalReviews: number;
  loyaltyGrade: 'VIP' | 'Gold' | 'Silver';
  analysis: {
    customerDNA: string[];
    mainProducts: string[];
  };
  keywords: { word: string; count: number }[];
  reviews: { date: string; rating: number; product: string }[];
}

// 여러 고객의 정보를 담는 배열
export const mockCustomerDatabase: Customer[] = [
  {
    id: "user123",
    name: "김민준",
    joinDate: "2023-01-15",
    totalReviews: 28,
    loyaltyGrade: 'VIP',
    analysis: {
      customerDNA: ["품질 중시", "신메뉴 탐험가", "분위기 선호", "편의성 민감"],
      mainProducts: ["시그니처 스테이크", "오늘의 파스타", "하우스 와인"],
    },
    keywords: [
      { word: "맛", count: 18 }, { word: "분위기", count: 12 },
      { word: "친절", count: 9 }, { word: "주차", count: 4 },
      { word: "대기", count: 3 }, { word: "신메뉴", count: 7 },
    ],
    reviews: [
      { date: "23.05", rating: 4, product: "시그니처 스테이크" }, { date: "23.08", rating: 5, product: "오늘의 파스타" },
      { date: "23.11", rating: 3, product: "하우스 와인" }, { date: "24.03", rating: 5, product: "신메뉴" },
      { date: "24.07", rating: 4, product: "시그니처 스테이크" }, { date: "24.09", rating: 5, product: "오늘의 파스타" },
    ],
  },
  {
    id: "user456",
    name: "이서연",
    joinDate: "2022-11-20",
    totalReviews: 15,
    loyaltyGrade: 'Gold',
    analysis: {
      customerDNA: ["가성비 중시", "단골 메뉴 선호", "빠른 서비스", "SNS 공유"],
      mainProducts: ["크림 리조또", "에이드", "샐러드"],
    },
    keywords: [
      { word: "가성비", count: 10 }, { word: "친절", count: 8 },
      { word: "인테리어", count: 6 }, { word: "재방문", count: 5 },
    ],
    reviews: [
      { date: "23.06", rating: 5, product: "크림 리조또" }, { date: "23.09", rating: 4, product: "에이드" },
      { date: "24.01", rating: 5, product: "크림 리조또" }, { date: "24.05", rating: 4, product: "샐러드" },
    ],
  },
  {
    id: "user789",
    name: "박도윤",
    joinDate: "2023-08-05",
    totalReviews: 8,
    loyaltyGrade: 'Silver',
    analysis: {
      customerDNA: ["조용한 분위기", "특정 메뉴 집중", "주차 편의성"],
      mainProducts: ["오일 파스타", "아메리카노"],
    },
    keywords: [
        { word: "조용함", count: 7 }, { word: "주차", count: 5 },
        { word: "파스타", count: 4 }, { word: "커피", count: 3 },
    ],
    reviews: [
      { date: "23.10", rating: 4, product: "오일 파스타" }, { date: "24.02", rating: 5, product: "오일 파스타" },
      { date: "24.06", rating: 4, product: "아메리카노" },
    ],
  },
];