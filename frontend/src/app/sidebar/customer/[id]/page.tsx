'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './styles.module.css';
import { mockCustomerDatabase, Customer } from '../../../_data/customerData';
import { notFound } from 'next/navigation';

// --- 메인 페이지 컴포넌트 ---
export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer: Customer | undefined = mockCustomerDatabase.find(c => c.id === params.id);

  if (!customer) {
    notFound();
  }

  // 1. 페이지를 감싸던 container, sidebar, main 태그를 모두 제거합니다.
  // 2. 이제 return문은 순수한 내용(카드들)으로만 시작합니다.
  // 여러 개의 row를 반환해야 하므로 React Fragment(<>)로 감싸줍니다.
  return (
    <>
      <div className={styles.row}>
        {/* 고객 프로필 카드 */}
        <div className={styles.card}>
          <div className={styles.profile}>
              <div className={styles.avatar}></div>
              <h3>{customer.name}</h3>
              <span className={styles.vipTag}>{customer.loyaltyGrade}</span>
          </div>
          <p><strong>가입일:</strong> {customer.joinDate}</p>
          <p><strong>총 리뷰 수:</strong> <span className={styles.highlight}>{customer.totalReviews}개</span></p>
        </div>

        {/* 만족도 변화 추이 카드 */}
        <div className={styles.card}>
          <h4>만족도 변화 추이</h4>
          <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customer.reviews} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="date" tick={{ fill: '#666', fontSize: 12 }} />
                      <YAxis domain={[1, 5]} tick={{ fill: '#666', fontSize: 12 }} />
                      <Tooltip 
                          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }}
                          labelStyle={{ color: '#333' }}
                      />
                      <Line type="monotone" dataKey="rating" stroke="#ffd700" strokeWidth={3} dot={{ r: 5, fill: '#ffd700' }} activeDot={{ r: 8 }} name="평점"/>
                  </LineChart>
              </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.row}>
          {/* 고객 성향 (DNA) 카드 */}
          <div className={styles.card}>
              <h4>고객 성향 (DNA)</h4>
              <div className={styles.tagContainer}>
                  {customer.analysis.customerDNA.map(dna => (
                      <span key={dna} className={styles.dnaTag}>{dna}</span>
                  ))}
              </div>
          </div>

          {/* 키워드 분석 카드 */}
          <div className={styles.card}>
              <h4>키워드 분석</h4>
              <div className={styles.tagContainer}>
                  {customer.keywords.map(kw => (
                      <span key={kw.word} className={styles.keywordTag}>{kw.word}</span>
                  ))}
              </div>
          </div>
      </div>

      <div className={styles.row}>
        {/* 주요 구매 메뉴 카드 */}
        <div className={styles.card}>
          <h4>주요 구매 메뉴</h4>
          <ul className={styles.productList}>
            {customer.analysis.mainProducts.map(product => (
              <li key={product}>{product}</li>
            ))}
          </ul>
        </div>
        
        {/* 리뷰 히스토리 카드 */}
        <div className={styles.card}>
          <h4>리뷰 히스토리</h4>
          <div className={styles.reviewList}>
              {customer.reviews.slice().reverse().map((review, index) => (
                  <div key={index} className={styles.reviewItem}>
                      <div className={styles.reviewRating}>
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                      <div className={styles.reviewDate}>{review.date}</div>
                      <div className={styles.reviewProduct}>{review.product}</div>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}