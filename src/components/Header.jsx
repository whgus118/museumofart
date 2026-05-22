import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

import logoImage from '../assets/logo.jpg';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => { 
      window.removeEventListener('scroll', handleScroll); 
    };
  }, []);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      e.preventDefault();
      navigate('/');
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link 
          to="/" 
          className="logo" 
          aria-label="미술관 홈으로 이동"
          onClick={handleLogoClick}
        >
          <img src={logoImage} alt="미술관 로고" className='header-logo-img' />
        </Link>
        <div className="header-actions">
          <button className="icon-btn search-btn" aria-label="검색">
            <img 
              src={new URL('../assets/Search-icon.svg', import.meta.url).href} 
              alt="" 
              className="header-icon-img" 
            />
          </button>
          <button className="icon-btn menu-btn" aria-label="메뉴 열기">
            <img 
              src={new URL('../assets/Menu-icon.svg', import.meta.url).href} 
              alt="" 
              className="header-icon-img" 
            />
          </button>
        </div>
      </div>

      {/* 데스크탑 GNB (1280px 해상도 이상 전체화면에서만 정교하게 표시) */}
      <nav className="desktop-gnb">
        <ul className="gnb-list">
          <li className="gnb-item">
            <span className="gnb-link">관람</span>
          </li>
          <li className="gnb-item">
            <span className="gnb-link">전시</span>
          </li>
          <li className="gnb-item">
            <span 
              className={`gnb-link ${
                location.pathname.startsWith('/apply') || 
                location.pathname.startsWith('/details') || 
                location.pathname.startsWith('/apply-complete') 
                  ? 'active' : ''
              }`}
            >
              체험하기(예약/신청)
            </span>
          </li>
          <li className="gnb-item">
            <span className="gnb-link">문화 프로그램</span>
          </li>
          <li className="gnb-item">
            <span className="gnb-link">라이브러리·소장품</span>
          </li>
          <li className="gnb-item">
            <span className="gnb-link">소식·홍보</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
