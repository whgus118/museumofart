import './Section1.css';

export default function Section1() {
  const menuItems = [
    { title: '이용안내', sub: '운영시간', icon: 'guide-icon.svg', link: '/guide' },
    { title: '시설안내', sub: '편의시설', icon: 'facility-icon.svg', link: '/facility' },
    { title: '체험하기', sub: '예약/신청', icon: 'experience-icon.svg', link: '/experience' },
    { title: '문화 프로그램', sub: '살펴보기', icon: 'program-icon.svg', link: '/program' },
  ];

  return (
    <section className="section-1" aria-labelledby="section1-title">
      <div className="section-1-container">
        <h2 id="section1-title" className="section-1-title">
          수원시립미술관이 처음이신가요?
        </h2>
        <div className="section-1-grid">
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href={item.link} 
              className="section-1-btn"
              aria-label={`${item.title} ${item.sub} 페이지로 이동`}
            >
              <div className="btn-text-group">
                <strong className="btn-title">{item.title}</strong>
                <span className="btn-sub">{item.sub}</span>
              </div>
              <div className="btn-icon" aria-hidden="true">
                <img 
                  src={new URL(`../assets/${item.icon}`, import.meta.url).href} 
                  alt="" 
                  className="menu-icon-img" 
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
