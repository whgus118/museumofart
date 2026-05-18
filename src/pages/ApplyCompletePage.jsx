import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '../assets/Home-icon.svg';
import ArrowIcon from '../assets/Arrow-icon.svg';
import './ApplyCompletePage.css';

export default function ApplyCompletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ApplyPage에서 전달한 폼 데이터 추출 (없으면 빈 객체 처리)
  const formData = location.state?.formData || {};

  return (
    <main id="main-content" className="apply-complete-page">
      <h1 className="sr-only">전시 체험 프로그램 예약 신청 완료</h1>

      {/* 브레드크럼 */}
      <div className="apply-breadcrumb">
        <button className="btn-breadcrumb" onClick={() => navigate('/')} aria-label="홈화면으로">
          <div className="btn-left">
            <img src={HomeIcon} alt="" className="icon-home" aria-hidden="true" />
            <img src={ArrowIcon} alt="" className="icon-chevron" aria-hidden="true" />
          </div>
        </button>
        <span className="breadcrumb-text">체험하기</span>
        <div className="btn-breadcrumb" aria-hidden="true">
          <div className="btn-left">
            <img src={ArrowIcon} alt="" className="icon-chevron" aria-hidden="true" />
          </div>
        </div>
        <span className="breadcrumb-text">예약/신청 완료</span>
      </div>

      <section className="complete-content">
        <h2 className="complete-title">예약 신청이 완료되었습니다.</h2>

        <div className="complete-info-container">
          
          {/* 상단 텍스트 그룹 */}
          <div className="info-group">
            <div className="info-row">
              <span className="info-label">프로그램</span>
              <span className="info-value">&lt;그린그린 뮤지엄: 별가루 신비정원&gt; 어린이 단체 전시해설 프로그램(5월)</span>
            </div>
            <div className="info-row">
              <span className="info-label">장소</span>
              <span className="info-value">수원시립만석전시관</span>
            </div>
            <div className="info-row">
              <span className="info-label">참여일시</span>
              <span className="info-value">
                {formData.date || '2026-05-08 (금)'} {formData.time || '오전 10:30 ~ 11:30'}
              </span>
            </div>
          </div>

          {/* 하단 텍스트 그룹 */}
          <div className="info-group">
            <div className="info-row">
              <span className="info-label">신청자</span>
              <span className="info-value">{formData.applicant || '미기입'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">참여인원</span>
              <span className="info-value">{formData.participants ? `${formData.participants}명` : '1명'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">연락처</span>
              <span className="info-value">{formData.phone || '미기입'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">이메일</span>
              <span className="info-value">{formData.email || '미기입'}</span>
            </div>
          </div>

          {/* 교육비 */}
          <div className="info-group">
            <div className="info-row">
              <span className="info-label">교육비</span>
              <span className="info-value">무료</span>
            </div>
          </div>

          {/* 요청내용 (비고) */}
          <div className="info-group">
            <div className="info-row">
              <span className="info-label">요청내용</span>
              <span className="info-value">{formData.remarks || '없음'}</span>
            </div>
          </div>

        </div>

        {/* 확인 버튼 영역 */}
        <div className="complete-actions">
          <button 
            className="btn-confirm"
            onClick={() => navigate('/')}
          >
            확인
          </button>
        </div>
      </section>
    </main>
  );
}
