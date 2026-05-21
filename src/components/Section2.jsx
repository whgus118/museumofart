import { useState, useRef, useCallback } from 'react';
import './Section2.css';

import image1 from '../assets/container-image-1.jpg';
import image2 from '../assets/container-image-2.jpg';
import image3 from '../assets/container-image-3.jpg';
import image4 from '../assets/container-image-4.jpg';
import image5 from '../assets/container-image-5.jpg';
import image6 from '../assets/container-image-6.jpg';
import image7 from '../assets/container-image-7.jpg';
import image8 from '../assets/container-image-8.jpg';
import image9 from '../assets/container-image-9.jpg';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

export default function Section2() {
  const [activeTab, setActiveTab] = useState('current');

  const tabs = [
    { id: 'current', label: '현재 전시' },
    { id: 'past', label: '지난 전시' },
    { id: 'upcoming', label: '예정 전시' }
  ];

  const contentData = {
    current: [
      { id: 1, title: '괴물정원: 아츠츠 박사와 기억의 세계', location: '수원시립아트스페이스광교', description: '"기억은 보존하는 것이 아니라 공유하고 순환하는 것"', image: images[0] },
      { id: 2, title: 'B와 초콜릿의 게릴라 파티', location: '수원시립미술관 행궁 본관', description: '"전북도립미술관과 수원시립미술관은 협력 기획전 <B와 초콜릿의 게릴라 파티>를 선보입니다."', image: images[1] },
      { id: 3, title: '머무르는 순간, 흐르는 마음', location: '수원시립미술관 행궁 본관', description: '"수원시립미술관은 개관 10주년을 기념하여 한국 근현대미술 <머무르는 순간, 흐르는 마음>전시를 마련했습니다."', image: images[2] },
    ],
    past: [
      { id: 4, title: '감각운동,장', location: '수원시립아트스페이스광교', description: '"수원시립아트스페이스광교는 개관 5주년을 맞아 신체와 감각을 활용하여 예술작품과 상호작용하며 다양한 예술적 표현을 이해하고 소통하는 가족체험전<감각운동,장>을 개최합니다."', image: images[3] },
      { id: 5, title: '올리비에 드브레: 마인드스케이프', location: '수원시립미술관 행궁 본관', description: '"수원시립미술관은 프랑스 투르(Tours)의 올리비에 드브레 현대창작센터(CCC OD)와 협력하여 올리비에 드브레(Olivier Debré, 1920-1999)의 예술 세계를 조명하는 <올리비에 드브레: 마인드스케이프> 전시를 개최한다."', image: images[4] },
      { id: 6, title: '2024 아워세트 : 성능경×이랑', location: '수원시립아트스페이스광교', description: '"<2024 아워세트 : 성능경ｘ이랑>은 서로 다른 장르에서 활동하는 창작자가 만나 협업을 제시하는 ‘아워세트(Our Set)’의 형식과 조건에서 출발한 전시입니다."', image: images[5] },
    ],
    upcoming: [
      { id: 7, title: '당신을 사랑하지 않는 방법', location: '수원시립미술관 행궁 본관', description: '"여자들은 일해왔다. 과거든 현재든, 유급이든 무급이든, 보이는 곳에서든 보이지 않는 곳에서든 항상 일해왔다. 눈에 띄지 않는 곳에서 끊임없이 일해 온 여자들이 우리네 삶 속 어디에나 있어 왔다."', image: images[6] },
      { id: 8, title: '마당: 마중합니다 당신을', location: '수원시립미술관 행궁 본관', description: '"마당은 이웃 간 서로의 일과 안녕을 묻고 새로운 이웃을 맞이하는 만남과 열림의 장소입니다."', image: images[7] },
      { id: 9, title: '이야기 유랑선', location: '수원시립아트스페이스광교', description: '"그림 속 숨은 이야기를 찾아 유랑한다’라는 주제를 담고 있는 이번 전시는 어린이들의 눈높이에서 현대미술의 다양한 모습을 살피고, 작품에 숨겨진 메시지를 전달하고자 합니다."', image: images[8] },
    ]
  };

  const activeCards = contentData[activeTab];

  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const rafId = useRef(null);

  const onMouseDown = useCallback((e) => {
    cancelAnimationFrame(rafId.current);
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
    lastX.current = e.pageX;
    velocity.current = 0;
    carouselRef.current.style.cursor = 'grabbing';
    carouselRef.current.style.userSelect = 'none';
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    velocity.current = e.pageX - lastX.current;
    lastX.current = e.pageX;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUpOrLeave = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    carouselRef.current.style.cursor = 'grab';
    carouselRef.current.style.userSelect = '';

    // 관성 스크롤
    const momentum = () => {
      if (Math.abs(velocity.current) < 0.5) return;
      carouselRef.current.scrollLeft -= velocity.current * 1.2;
      velocity.current *= 0.92; // 감속 계수
      rafId.current = requestAnimationFrame(momentum);
    };
    rafId.current = requestAnimationFrame(momentum);
  }, []);


  return (
    <section className="section-2" aria-labelledby="section2-title">
      <div className="section-2-container">
        <div className="section-2-header">
          <h2 id="section2-title" className="section-2-title">전시 둘러보기</h2>
          <a 
            href="/exhibitions" 
            className="more-link" 
            aria-label="전시 둘러보기 더보기" 
            onClick={(e) => {
              e.preventDefault();
              e.currentTarget.blur();
            }}
          >
            더보기 +
          </a>
        </div>

        <div className="tab-list" role="tablist" aria-label="전시 상태 선택">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div 
          id={`panel-${activeTab}`} 
          role="tabpanel" 
          aria-labelledby={`tab-${activeTab}`}
          className="carousel-container"
          tabIndex="0"
          aria-label={`${tabs.find(t => t.id === activeTab).label} 리스트. 좌우로 스크롤하여 더 많은 전시를 볼 수 있습니다.`}
          ref={carouselRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          style={{ cursor: 'grab' }}
        >
          <div className="carousel-track">
            {activeCards.map(card => (
              <div key={card.id} className="card-item">
                <div className="card-image-wrapper">
                  <img src={card.image} alt={`${card.title} 포스터 이미지`} className="card-image" />
                </div>
                <div className="card-info">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-location">{card.location}</p>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
