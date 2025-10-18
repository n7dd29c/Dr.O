#!/usr/bin/env python3
"""
샘플 리뷰 데이터를 데이터베이스에 추가하는 스크립트
"""
import sys
import os
from datetime import datetime, timedelta
import random

# 현재 디렉토리를 Python 경로에 추가
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import get_db
from app.models import Review, SystemLog

def add_sample_reviews():
    """샘플 리뷰 데이터 추가"""
    db = next(get_db())
    
    # 기존 데이터 삭제 (선택사항)
    db.query(Review).delete()
    db.query(SystemLog).delete()
    db.commit()
    
    # 샘플 리뷰 데이터
    sample_reviews = [
        {
            "source_id": "review_001",
            "customer_name": "김민수",
            "review_text": "정말 맛있어요! 친절한 서비스도 좋았습니다. 다음에 또 방문하겠습니다.",
            "review_date": datetime.now() - timedelta(days=1),
            "keywords": ["맛있어요", "친절해요", "재방문"],
            "sentiment": "긍정",
            "generated_reply": "안녕하세요 김민수님! 맛있게 드셨다니 정말 기쁩니다. 친절한 서비스로 보답하겠습니다. 다음에도 좋은 서비스로 만나뵐게요!",
            "reply_posted": True,
            "reply_posted_at": datetime.now() - timedelta(hours=2)
        },
        {
            "source_id": "review_002", 
            "customer_name": "이서연",
            "review_text": "분위기가 정말 좋아요. 데이트하기에 완벽한 곳이었습니다.",
            "review_date": datetime.now() - timedelta(days=2),
            "keywords": ["분위기", "데이트"],
            "sentiment": "긍정",
            "generated_reply": "이서연님, 좋은 분위기에서 즐거운 시간 보내셨다니 다행입니다! 다음에도 특별한 순간을 만들어드리겠습니다.",
            "reply_posted": True,
            "reply_posted_at": datetime.now() - timedelta(days=1, hours=5)
        },
        {
            "source_id": "review_003",
            "customer_name": "박지훈", 
            "review_text": "주차하기 어려워요. 대기시간도 너무 길었습니다.",
            "review_date": datetime.now() - timedelta(days=3),
            "keywords": ["주차", "대기시간"],
            "sentiment": "부정",
            "generated_reply": "박지훈님, 주차와 대기시간으로 불편을 드려 죄송합니다. 주차 공간 확보와 대기시간 단축을 위해 노력하겠습니다.",
            "reply_posted": False
        },
        {
            "source_id": "review_004",
            "customer_name": "최수진",
            "review_text": "가격이 조금 비싸긴 하지만 품질은 좋네요.",
            "review_date": datetime.now() - timedelta(days=4),
            "keywords": ["가격", "품질"],
            "sentiment": "중립",
            "generated_reply": "최수진님, 가격에 대한 의견 주셔서 감사합니다. 더 나은 가치를 제공할 수 있도록 노력하겠습니다.",
            "reply_posted": False
        },
        {
            "source_id": "review_005",
            "customer_name": "정민호",
            "review_text": "직원분들이 정말 친절하시고 맛도 최고예요! 강력 추천합니다.",
            "review_date": datetime.now() - timedelta(days=5),
            "keywords": ["친절해요", "맛있어요", "추천"],
            "sentiment": "긍정",
            "generated_reply": "정민호님, 정말 감사합니다! 직원들과 함께 최선을 다해 좋은 서비스를 제공하겠습니다. 추천해주셔서 더욱 감사해요!",
            "reply_posted": True,
            "reply_posted_at": datetime.now() - timedelta(days=1)
        },
        {
            "source_id": "review_006",
            "customer_name": "한소영",
            "review_text": "음식이 차갑게 나왔어요. 서비스도 별로였습니다.",
            "review_date": datetime.now() - timedelta(days=6),
            "keywords": ["차갑게", "서비스"],
            "sentiment": "부정",
            "generated_reply": "한소영님, 음식 온도와 서비스로 불편을 드려 정말 죄송합니다. 즉시 개선하여 더 나은 경험을 제공하겠습니다.",
            "reply_posted": False
        },
        {
            "source_id": "review_007",
            "customer_name": "윤태영",
            "review_text": "분위기 좋고 맛도 괜찮아요. 친구들과 가기 좋은 곳입니다.",
            "review_date": datetime.now() - timedelta(days=7),
            "keywords": ["분위기", "맛있어요", "친구"],
            "sentiment": "긍정",
            "generated_reply": "윤태영님, 친구들과 즐거운 시간 보내셨다니 기쁩니다! 다음에도 좋은 추억 만들어드리겠습니다.",
            "reply_posted": True,
            "reply_posted_at": datetime.now() - timedelta(days=2)
        },
        {
            "source_id": "review_008",
            "customer_name": "김다은",
            "review_text": "대기시간이 너무 길어요. 주차도 어렵고...",
            "review_date": datetime.now() - timedelta(days=8),
            "keywords": ["대기시간", "주차"],
            "sentiment": "부정",
            "generated_reply": "김다은님, 대기시간과 주차 문제로 불편을 드려 죄송합니다. 운영 방식을 개선하여 더 나은 서비스를 제공하겠습니다.",
            "reply_posted": False
        }
    ]
    
    # 리뷰 데이터 추가
    for review_data in sample_reviews:
        review = Review(**review_data)
        db.add(review)
    
    # 시스템 로그 추가
    system_logs = [
        {
            "log_type": "info",
            "message": "샘플 리뷰 데이터가 추가되었습니다",
            "details": f"총 {len(sample_reviews)}개의 리뷰가 추가됨"
        },
        {
            "log_type": "info", 
            "message": "데이터베이스 초기화 완료",
            "details": "시스템이 정상적으로 시작되었습니다"
        }
    ]
    
    for log_data in system_logs:
        log = SystemLog(**log_data)
        db.add(log)
    
    db.commit()
    print(f"✅ {len(sample_reviews)}개의 샘플 리뷰가 추가되었습니다!")
    print(f"✅ {len(system_logs)}개의 시스템 로그가 추가되었습니다!")
    
    # 통계 출력
    total_reviews = db.query(Review).count()
    positive_reviews = db.query(Review).filter(Review.sentiment == '긍정').count()
    negative_reviews = db.query(Review).filter(Review.sentiment == '부정').count()
    neutral_reviews = db.query(Review).filter(Review.sentiment == '중립').count()
    replied_reviews = db.query(Review).filter(Review.generated_reply.isnot(None)).count()
    
    print(f"\n📊 현재 통계:")
    print(f"  - 총 리뷰: {total_reviews}개")
    print(f"  - 긍정 리뷰: {positive_reviews}개")
    print(f"  - 부정 리뷰: {negative_reviews}개") 
    print(f"  - 중립 리뷰: {neutral_reviews}개")
    print(f"  - 답변 완료: {replied_reviews}개")
    print(f"  - 답변 대기: {total_reviews - replied_reviews}개")

if __name__ == "__main__":
    add_sample_reviews()
