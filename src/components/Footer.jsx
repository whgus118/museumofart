import React from 'react';
import './Footer.css';

export default function Footer() {
  const snsLinks = [
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Youtube', icon: '▶️', url: '#' },
    { name: 'Naver Blog', icon: '📗', url: '#' },
    { name: 'Kakao Channel', icon: '💬', url: '#' },
  ];

  return (
    <footer className="footer" aria-label="사이트 정보">
      <div className="footer-container">
        
        {/* 푸터 상단 SNS 버튼 */}
        <ul className="sns-list" aria-label="소셜 미디어 링크">
          {snsLinks.map((sns, index) => (
            <li key={index} className="sns-item">
              <a href={sns.url} className="sns-link" aria-label={`${sns.name} 바로가기`}>
                <span aria-hidden="true">{sns.icon}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* 푸터 약관 및 소개 버튼 */}
        <ul className="terms-list" aria-label="법적 고지 및 사이트 안내">
          <li><a href="/terms" className="term-link">이용약관</a></li>
          <li><a href="/privacy" className="term-link privacy-link">개인정보 처리방침</a></li>
          <li><a href="/about" className="term-link">미술관 소개</a></li>
        </ul>

        {/* 푸터 텍스트 정보 */}
        <div className="footer-info">
          <p className="footer-address">
            (우 16252) 경기도 수원시 팔달구 정조로 833 (신풍동)
          </p>
          <p className="footer-phone">
            대표전화 <a href="tel:031-5191-3800" aria-label="전화걸기">031-5191-3800</a>
          </p>
          
          <div className="footer-copyright">
            <p>홈페이지의 모든 내용들은 무단 복제가 불가합니다.</p>
            <p>Copyright © 2019 SUWON MUSEUM OF ART. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
