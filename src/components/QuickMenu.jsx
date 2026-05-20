import './QuickMenu.css';
import { StrollerIcon, ChatbotIcon } from './QuickMenuIcons';

export default function QuickMenu() {
  return (
    <aside className="quick-menu" aria-label="빠른 편의시설 메뉴">
      <ul className="quick-list">
        <li>
          <a
            href="/facility/wheelchair"
            className="quick-btn"
            aria-label="유모차 및 휠체어 대여 안내"
            onClick={(e) => {
              e.preventDefault();
              alert('유모차 및 휠체어 대여 안내 서비스는 준비 중입니다.');
              e.currentTarget.blur();
            }}
          >
            <StrollerIcon className="quick-icon-img" />
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
            <ChatbotIcon className="quick-icon-img chatbot-icon" />
          </a>
        </li>
      </ul>
    </aside>
  );
}
