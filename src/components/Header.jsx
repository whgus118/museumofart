import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logoImage from '../assets/logo.jpg';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
  window.addEventListener('scroll', handleScroll);
  return () => { 
    window.removeEventListener('scroll', handleScroll); 
  };
}, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo" aria-label="미술관 홈으로 이동">
          <img src={logoImage} alt="미술관 로고" className='header-logo-img' />
        </Link>
        <div className="header-actions">
          <button className="icon-btn search-btn" aria-label="검색">
            <span aria-hidden="true">🔍</span>
          </button>
          <button className="icon-btn menu-btn" aria-label="메뉴 열기">
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>
    </header>
  );
}
