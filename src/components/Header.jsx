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
    </header>
  );
}
