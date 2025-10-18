// src/lib/apiClient.ts

import axios from 'axios';

// 백엔드 API의 기본 주소. 환경 변수를 사용하는 것이 가장 좋습니다.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// --- 통계 데이터 API ---
export const getStats = async () => {
  try {
    const response = await apiClient.get('/stats');
    return response.data; // { total_reviews: 10, ... } 와 같은 데이터 반환
  } catch (error) {
    console.error("통계 데이터 조회 실패:", error);
    throw error; // 에러를 상위 컴포넌트로 전달
  }
};

// --- 최근 리뷰 목록 API ---
export const getRecentReviews = async (limit: number = 20) => {
  try {
    const response = await apiClient.get(`/reviews/recent?limit=${limit}`);
    return response.data; // 리뷰 객체 배열 반환
  } catch (error) {
    console.error("최근 리뷰 조회 실패:", error);
    throw error;
  }
};

// --- 답변 대기 리뷰 목록 API ---
export const getPendingReviews = async () => {
  try {
    const response = await apiClient.get('/reviews/pending');
    return response.data;
  } catch (error) {
    console.error("답변 대기 리뷰 조회 실패:", error);
    throw error;
  }
};

// --- 특정 리뷰 조회 API ---
export const getReview = async (reviewId: number) => {
  try {
    const response = await apiClient.get(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("리뷰 조회 실패:", error);
    throw error;
  }
};

// --- 감성 추이 데이터 API ---
export const getSentimentTrend = async (days: number = 7) => {
  try {
    const response = await apiClient.get(`/stats/sentiment-trend?days=${days}`);
    return response.data;
  } catch (error) {
    console.error("감성 추이 데이터 조회 실패:", error);
    throw error;
  }
};

// --- 스크래핑 실행 API ---
export const triggerScraping = async () => {
  try {
    const response = await apiClient.post('/scrape');
    return response.data;
  } catch (error) {
    console.error("스크래핑 실행 실패:", error);
    throw error;
  }
};

// --- 답변 생성 API ---
export const generateReplies = async (maxCount: number = 10) => {
  try {
    const response = await apiClient.post(`/generate-replies?max_count=${maxCount}`);
    return response.data;
  } catch (error) {
    console.error("답변 생성 요청 실패:", error);
    throw error;
  }
};

// --- 답변 재생성 API ---
export const regenerateReply = async (reviewId: number) => {
  try {
    const response = await apiClient.post(`/reviews/${reviewId}/regenerate-reply`);
    return response.data;
  } catch (error) {
    console.error("답변 재생성 실패:", error);
    throw error;
  }
};

// --- 답변 게시 API ---
export const postReplies = async (maxCount: number = 10) => {
  try {
    const response = await apiClient.post(`/post-replies?max_count=${maxCount}`);
    return response.data;
  } catch (error) {
    console.error("답변 게시 실패:", error);
    throw error;
  }
};

// --- 시스템 로그 조회 API ---
export const getRecentLogs = async (limit: number = 50) => {
  try {
    const response = await apiClient.get(`/logs/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("시스템 로그 조회 실패:", error);
    throw error;
  }
};