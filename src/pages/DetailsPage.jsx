import { useNavigate } from 'react-router-dom';
import './DetailsPage.css';
import placeholderImg from '../assets/MainBanner-1.jpg'; // Using an existing image as placeholder
import HomeIcon from '../assets/Home-icon.svg';
import ArrowIcon from '../assets/Arrow-icon.svg';
import ExhibitionHallIcon from '../assets/Exhibition-hall-image.png';
import InfoIcon from '../assets/Info-icon.svg';

export default function DetailsPage() {
  const navigate = useNavigate();
  return (
    <main id="main-content" className="details-page">
      <h1 className="sr-only">전시 체험 프로그램 상세 안내</h1>

      {/* 브레드크럼 */}
      <div className="details-breadcrumb">
        <button className="btn-breadcrumb" onClick={() => navigate('/')} aria-label="홈화면으로">
          <div className="btn-left">
            <img src={HomeIcon} alt="" className="icon-home" aria-hidden="true" />
            <img src={ArrowIcon} alt="" className="icon-chevron" aria-hidden="true" />
          </div>
        </button>
        <span className="breadcrumb-text">&nbsp;체험하기</span>
      </div>

      {/* 신청하기 상세안내 영역 */}
      <section className="application-details">
        {/* 이미지 신청하기 */}
        <div className="image-apply-container">
          <img src={placeholderImg} alt="프로그램 대표 이미지" className="program-main-image" />
          <button className="btn-apply-program-full" onClick={() => navigate('/apply')}>신청하기</button>
        </div>

        {/* Program description container */}
        <div className="program-desc-container">
          <h2 className="program-title-new">
            &lt;그린그린 뮤지엄: 별가루 신비정원&gt; 어린이 단체 전시해설 프로그램(5월)
          </h2>
          <div className="exhibition-info">
            <img src={ExhibitionHallIcon} alt="수원시립만석전시관 로고" className="exhibition-logo-image" />
            <span className="exhibition-name">수원시립만석전시관</span>
          </div>
        </div>

        {/* 상세안내 섹션 (기존 표 형식) */}
        <div className="details-content">
          <div className="status-badges">
            <span className="label-detail">접수중</span>
            <span className="label-detail">선착순</span>
          </div>

          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">대상</span>
              <span className="info-value">어린이 기관 단체</span>
            </div>
            <div className="info-row">
              <span className="info-label">교육기간</span>
              <span className="info-value">2026-03-24 ~ 2026-07-24</span>
            </div>
            <div className="info-row">
              <span className="info-label">교육시간</span>
              <span className="info-value">10:30-11:30</span>
            </div>
            <div className="info-row">
              <span className="info-label">강의장소</span>
              <span className="info-value">수원시립만석전시관</span>
            </div>
            <div className="info-row">
              <span className="info-label">강사명</span>
              <span className="info-value">배서영</span>
            </div>
            <div className="info-row">
              <span className="info-label">교육비</span>
              <span className="info-value">무료</span>
            </div>
            <div className="info-row">
              <span className="info-label">당일예약</span>
              <span className="info-value">신청회차 시간 전까지 가능</span>
            </div>
          </div>
        </div>
        <div className="recruitment-section">
          {/* 파트 1: 모집 타이틀 */}
          <div className="recruitment-header">
            <span className="label-detail">상세 안내</span>
            <h3 className="recruitment-title">
              &lt;그린그린 뮤지엄: 별가루 신비정원&gt;(3.24. ~ 7.24.) 유아 단체 도슨트 프로그램 4월 모집
            </h3>
            <ul className="recruitment-list">
              <li>1개월 단위로 예약창이 오픈됩니다.</li>
              <li>6월 모집 예약창 : 5월 12일 (화) 오전 10시에 오픈 (※선착순 접수)</li>
              <li>모집 대상 : 어린이 기관 단체</li>
              <li>문의 사항 : 031) 5191-4114</li>
            </ul>
          </div>

          <hr className="divider" />

          {/* 파트 2: 안내사항 */}
          <div className="recruitment-part">
            <div className="part-header">
              <img src={InfoIcon} alt="" className="part-icon" aria-hidden="true" />
              <span className="part-title">안내사항</span>
            </div>
            <ul className="part-list">
              <li>유치원 · 어린이집· 초등학교와 연계하여 유아 및 아동의 눈높이에 맞춘 전시 해설 프로그램입니다.</li>
              <li className="notice-text">※ 단체가 아닌 일반 관람객분들을 위한 상시 해설은 16시(화~토 ※일요일 미운영)에 진행되며 별도 예약은 없습니다.</li>
              <li>어린이 전문 도슨트의 단체 대상 전시 해설이 진행되며, 이후 자유롭게 작품 감상 및 상시 교육 활동 참여가 가능합니다.</li>
            </ul>
          </div>

          {/* 파트 3: 운영일시 */}
          <div className="recruitment-part">
            <div className="part-header">
              <img src={InfoIcon} alt="" className="part-icon" aria-hidden="true" />
              <span className="part-title">운영일시</span>
            </div>
            <ul className="part-list">
              <li>요일 : 화~금 (월요일 휴관)</li>
              <li>시간 : 10:30 ~ 11:30 (도슨트 해설 20분 + 상시 교육활동 30분)</li>
              <li>대상 : 5세 이상 (0~4세 참여 불가)</li>
              <li className="notice-text">※ 즐거운 전시 해설 참여(전시 및 작품 이해, 도슨트와의 소통 등)를 위한 연령입니다.</li>
              <li className="notice-text">※ 어린이 대상 기관이 아닌 단체는 예약이 취소 될 수 있습니다.</li>
              <li>참여인원 : 하루 최대 20인(단체 대상 프로그램으로 최소 10명 이상 신청하셔야 예약이 확정됩니다.)</li>
              <li className="notice-text">※ 안전한 전시 관람을 위해 참여 인원을 제한합니다.</li>
              <li className="notice-text">※ 20명 이상의 인원 수용을 원하시는 경우 2일 이상으로 예약 진행(예: 40명 예약 - 4월 15일:20명 / 4월 16일: 20명)</li>
            </ul>
          </div>

          {/* 파트 4: 신청방법 */}
          <div className="recruitment-part">
            <div className="part-header">
              <img src={InfoIcon} alt="" className="part-icon" aria-hidden="true" />
              <span className="part-title">신청방법</span>
            </div>
            <div className="part-content">
              <p className="instruction-text">비고란에 신청 관련 내용 작성</p>
              <div className="remarks-box">
                <p className="remarks-title">*비고란 입력 사항</p>
                <ol className="remarks-list">
                  <li>기관명, 기관연락</li>
                  <li>대표 교사명, 교사 연락처</li>
                  <li>아동 연령대</li>
                </ol>
              </div>
              <p className="notice-text">※ 예약 확인 및 확정 절차를 위해 담당 매니저 유선 연락이 진행됩니다.</p>
              <ul className="part-list mt-8">
                <li>1) 유선 협의 후 기타 이유(연령대, 인원 등)로 예약이 취소 될 수 있습니다. (031-5191-4114)</li>
                <li>2) 접수는 선착순으로 이루어지며 예약 확정 후 문자 발송 예정입니다.</li>
                <li>3) 관람객 안전을 위하여 인솔 교사 동행은 필수 입니다.</li>
                <li>4) 전시장 내 음료 및 기타 음식물 취식은 엄격히 금지됩니다.</li>
                <li>5) 취소 시, 반드시 유선으로 연락 부탁드립니다.(031-5191-4114)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
