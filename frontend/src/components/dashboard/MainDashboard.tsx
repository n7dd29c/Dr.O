// src/components/dashboard/MainDashboard.tsx

// 'use client'는 이 컴포넌트가 브라우저에서 실행되며,
// 데이터를 불러오고 상태를 변경하는 등의 동적인 작업을 수행함을 의미합니다.
'use client'; 

import React, { useState, useEffect } from 'react';
// API 통신 함수들을 불러옵니다.
import { getStats, getRecentReviews } from '@/lib/apiClient'; 

// 백엔드의 StatsResponse 모델과 타입을 맞춰주면 실수를 줄일 수 있습니다.
interface DashboardStats {
  total_reviews: number;
  replied_reviews: number;
  pending_reviews: number;
  positive_reviews: number;
  negative_reviews: number;
  neutral_reviews: number;
}

// 리뷰 데이터 타입
interface Review {
  id: number;
  customer_name: string;
  review_text: string;
  review_date: string;
  generated_reply: string | null;
  keywords: string[] | null;
  sentiment: string | null;
  reply_posted: boolean;
}

export default function MainDashboard() {
  // 1. 데이터를 담을 그릇 (State) 만들기
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. 컴포넌트가 처음 화면에 나타났을 때, 딱 한 번만 데이터 불러오기 (useEffect)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 통계 데이터와 최근 리뷰를 병렬로 가져오기
        const [statsData, reviewsData] = await Promise.all([
          getStats(),
          getRecentReviews(5) // 최근 5개 리뷰만 가져오기
        ]);
        
        setStats(statsData);
        setRecentReviews(reviewsData);
      } catch (err) {
        setError("데이터 로딩에 실패했습니다. 백엔드 서버가 켜져 있는지 확인해주세요.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 3. 상황에 따라 다른 화면 보여주기

  // 로딩 중일 때 보여줄 화면
  if (isLoading) {
    return <div className="p-6">데이터를 불러오는 중입니다... ⏳</div>;
  }

  // 에러가 발생했을 때 보여줄 화면
  if (error) {
    return <div className="p-6 text-red-600">{error} ❌</div>;
  }
  
  // 데이터가 없을 때 보여줄 화면 (정상적이지만 비어있는 경우)
  if (!stats) {
    return <div className="p-6">표시할 데이터가 없습니다.</div>
  }

  // 4. 성공적으로 데이터를 가져왔을 때 보여줄 실제 대시보드 화면
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">실시간 리뷰 대시보드</h1>
      
      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* 총 리뷰 카드 */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600">총 리뷰</h2>
          <p className="text-4xl font-bold mt-2 text-gray-800">{stats.total_reviews}개</p>
        </div>
        
        {/* 답변 완료 카드 */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600">답변 완료</h2>
          <p className="text-4xl font-bold mt-2 text-green-600">{stats.replied_reviews}개</p>
          <p className="text-sm text-gray-500 mt-1">
            {stats.total_reviews > 0 ? Math.round((stats.replied_reviews / stats.total_reviews) * 100) : 0}% 완료
          </p>
        </div>
        
        {/* 답변 대기 카드 */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600">답변 대기</h2>
          <p className="text-4xl font-bold mt-2 text-yellow-600">{stats.pending_reviews}개</p>
        </div>

        {/* 긍정 리뷰 비율 카드 */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600">긍정 리뷰</h2>
          <p className="text-4xl font-bold mt-2 text-blue-600">{stats.positive_reviews}개</p>
          <p className="text-sm text-gray-500 mt-1">
            {stats.total_reviews > 0 ? Math.round((stats.positive_reviews / stats.total_reviews) * 100) : 0}% 비율
          </p>
        </div>
      </div>

      {/* 감성 분석 통계 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">감성 분석</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-green-600">긍정</span>
              <span className="font-bold">{stats.positive_reviews}개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-600">부정</span>
              <span className="font-bold">{stats.negative_reviews}개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">중립</span>
              <span className="font-bold">{stats.neutral_reviews}개</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">만족도</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats.total_reviews > 0 ? Math.round((stats.positive_reviews / stats.total_reviews) * 100) : 0}%
            </div>
            <p className="text-gray-600">긍정 리뷰 비율</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">답변률</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {stats.total_reviews > 0 ? Math.round((stats.replied_reviews / stats.total_reviews) * 100) : 0}%
            </div>
            <p className="text-gray-600">답변 완료 비율</p>
          </div>
        </div>
      </div>

      {/* 최근 리뷰 목록 */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">최근 리뷰</h3>
        </div>
        <div className="p-6">
          {recentReviews.length > 0 ? (
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800">{review.customer_name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.sentiment === '긍정' ? 'bg-green-100 text-green-800' :
                        review.sentiment === '부정' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {review.sentiment}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.review_date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{review.review_text}</p>
                  {review.keywords && review.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {review.keywords.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          #{keyword}
                        </span>
                      ))}
                    </div>
                  )}
                  {review.generated_reply && (
                    <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600">
                        <strong>AI 답변:</strong> {review.generated_reply}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">최근 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}