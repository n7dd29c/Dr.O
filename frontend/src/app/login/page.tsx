'use client'; // 이 파일을 클라이언트 컴포넌트로 만듭니다!

import { useRouter } from 'next/navigation'; // 페이지 이동 기능을 불러옵니다.
import styles from '@/styles/Login.module.css';
import Link from 'next/link';
import React from 'react'; // React.FormEvent 타입을 위해 불러옵니다.

function LoginPage() {
  // 1. useRouter 기능 준비
  const router = useRouter();

  // 2. 로그인 버튼을 눌렀을 때 실행될 함수
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지합니다.

    // 여기에 실제 아이디/비밀번호를 확인하는 로직이 들어갑니다.
    // 지금은 기능 구현이 목표이므로, 성공했다고 가정하고 바로 페이지를 이동시킵니다.
    console.log('로그인 시도...');

    // 3. 지정된 경로로 페이지 이동!
    // 고객 상세 페이지의 예시 경로로 이동하도록 설정했습니다.
    // 원하시는 대시보드의 메인 경로로 수정하셔도 됩니다.
    router.push('/');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Dr.O</h1>
        <p className={styles.subtitle}>로그인하여 분석 리포트를 확인하세요.</p>

        {/* 4. form에 onSubmit 이벤트 연결 */}
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className={styles.inputField}
          />
          {/* form 안에서 버튼을 누르면 자동으로 onSubmit 이벤트가 발생합니다. */}
          <button type="submit" className={styles.loginButton}>
            로그인
          </button>
        </form>

        <div className={styles.links}>
          <Link href="/find-account" className={styles.link}>
            아이디/비밀번호 찾기
          </Link>
          <Link href="/signup" className={styles.link}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;