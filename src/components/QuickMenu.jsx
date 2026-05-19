import './QuickMenu.css';

export default function QuickMenu() {
  return (
    <aside className="quick-menu" aria-label="빠른 편의시설 메뉴">
      <ul className="quick-list">
        <li>
          <a 
            href="/facility/wheelchair" 
            className="quick-btn" 
            aria-label="의자 및 휠체어 안내"
            onClick={(e) => {
              e.preventDefault();
              alert('의자 및 휠체어 안내 서비스는 준비 중입니다.');
              e.currentTarget.blur();
            }}
          >
            <span aria-hidden="true">🪑</span>
          </a>
        </li>
        <li>
          <a 
            href="/service/chatbot" 
            className="quick-btn" 
            aria-label="챗봇 상담"
            onClick={(e) => {
              e.preventDefault();
              alert('챗봇 상담 서비스는 준비 중입니다.');
              e.currentTarget.blur();
            }}
          >
            <span aria-hidden="true">💬</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
