import './Section4.css';

export default function Section4() {
  const links = [
    { id: 'main', name: '수원시립미술관 행궁 본관', url: '/main-branch' },
    { id: 'manseok', name: '수원시립만석전시관', url: '/manseok' },
    { id: 'gwanggyo', name: '수원시립아트스페이스광교', url: '/gwanggyo' },
    { id: 'buksuwon', name: '수원시립북수원전시관', url: '/buksuwon' },
  ];

  return (
    <section className="section-4" aria-labelledby="section4-title">
      <h2 id="section4-title" className="section-4-title">수원시립미술관 알아보기</h2>
      
      <ul className="branch-list">
        {links.map((link) => (
          <li key={link.id} className="branch-item">
            <a href={link.url} className="branch-link">
              <span className="branch-name">{link.name}</span>
              <span className="branch-arrow" aria-hidden="true">{'>'}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
