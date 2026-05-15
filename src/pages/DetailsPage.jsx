import React from 'react';
import './DetailsPage.css';
import placeholderImg from '../assets/MainBanner-1.jpg'; // Using an existing image as placeholder

export default function DetailsPage() {
  return (
    <main id="main-content" className="details-page">
      <h2 className="sr-only">상세안내 페이지</h2>

      {/* 상단 액션 버튼 */}
      <section className="try-action-container">
        <button className="btn-try-homepage-banner" aria-label="홈화면 체험하기">
          <div className="btn-left">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-home" aria-hidden="true">
              <path d="M8 1L1 7V17H15V7L8 1Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-chevron" aria-hidden="true">
              <path d="M1 1.5L5.5 6.5L1 11.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text">체험하기</span>
        </button>
      </section>

      {/* 신청하기 상세안내 영역 */}
      <section className="application-details">
        {/* 이미지 신청하기 */}
        <div className="image-apply-container">
          <img src={placeholderImg} alt="프로그램 대표 이미지" className="program-main-image" />
          <button className="btn-apply-program-full">신청하기</button>
        </div>

        {/* Program description container */}
        <div className="program-desc-container">
          <h3 className="program-title-new">
            &lt;그린그린 뮤지엄: 별가루 신비정원&gt; 어린이 단체 전시해설 프로그램(5월)
          </h3>
          <div className="exhibition-info">
            <div className="exhibition-logo-placeholder" aria-label="수원시립만석전시관 로고"></div>
            <span className="exhibition-name">수원시립만석전시관</span>
          </div>
        </div>

        {/* 상세안내 푸터 (안내사항 영역) */}
        <div className="details-content">
          <h4 className="details-subtitle">상세안내</h4>
          <ul className="notice-list">
            <li className="notice-item">
              <strong>모집 기간:</strong> 상시 모집 중입니다.
            </li>
            <li className="notice-item">
              <strong>참여 방법:</strong> 상단의 '체험하기' 버튼을 눌러주세요.
            </li>
            <li className="notice-item">
              <strong>유의 사항:</strong> 본 체험은 데모 버전이며, 실제 환경과 차이가 있을 수 있습니다.
            </li>
          </ul>
        </div>

        {/* 푸터 영역 (페이지 내부 푸터 느낌의 정보) */}
        <div className="details-info-footer">
          <p className="inquiry-info">
            관련 문의사항 : 031-5191-4114 (9:00 ~ 18:00 / 12:00~13:00 휴게시간 미운영/ 공휴일 미운영)
          </p>
          <div className="sns-buttons">
            <button aria-label="페이스북 공유">f</button>
            <button aria-label="트위터 공유">t</button>
            <button aria-label="카카오톡 공유">k</button>
          </div>
          <p className="terms-text">이용약관 및 개인정보처리방침</p>
        </div>
      </section>
    </main>
  );
}
