import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainBanner.css';
import banner1 from '../assets/MainBanner-1.jpg';
import banner2 from '../assets/MainBanner-2.jpg';
import banner3 from '../assets/MainBanner-3.jpg';
import banner4 from '../assets/MainBanner-4.png';

const banners = [
  { src: banner1, alt: '메인 배너 이미지 1' },
  { src: banner2, alt: '메인 배너 이미지 2' },
  { src: banner3, alt: '메인 배너 이미지 3' },
  { src: banner4, alt: '메인 배너 이미지 4' },
];

export default function MainBanner() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBannerClick = () => {
    navigate('/details');
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, goNext]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    setIsDesktop(mediaQuery.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section className="main-banner" aria-label="메인 배너">
      <div className="banner-content" style={isDesktop ? { maxWidth: '1280px' } : {}}>
        <div 
          className="banner-image-wrapper" 
          tabIndex="0" 
          role="button" 
          aria-label={`배너 ${current + 1} 상세 보기`}
          onClick={handleBannerClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleBannerClick();
            }
          }}
          style={isDesktop ? { cursor: 'pointer', aspectRatio: '1280 / 540' } : { cursor: 'pointer' }}
        >
          <img src={banners[current].src} alt={banners[current].alt} className="banner-image" />
        </div>
        
        {/* 하단 컨트롤: 왼쪽(인디케이터) + 오른쪽(화살표+재생) */}
        <div className="banner-controls" style={isDesktop ? { left: '64px', right: '64px', bottom: '32px' } : {}}>
          <div className="indicator" aria-live="polite">
            <span className="sr-only">현재 {current + 1}번째 배너, 총 {banners.length}개</span>
            <span className="indicator-num" aria-hidden="true">{current + 1}</span>
            <span className="indicator-total" aria-hidden="true">/ {banners.length}</span>
          </div>

          <div className="banner-btns">
            <button className="control-btn prev-btn" onClick={goPrev} aria-label="이전 배너">
              <span aria-hidden="true">&#8249;</span>
            </button>
            <button className="control-btn next-btn" onClick={goNext} aria-label="다음 배너">
              <span aria-hidden="true">&#8250;</span>
            </button>
            <button 
              className="control-btn play-pause-btn" 
              onClick={togglePlay}
              aria-pressed={!isPlaying}
              aria-label={isPlaying ? "배너 자동 재생 일시정지" : "배너 자동 재생 시작"}
            >
              <span aria-hidden="true">{isPlaying ? "❚❚" : "▶"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
