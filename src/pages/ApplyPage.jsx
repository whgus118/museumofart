import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../assets/Home-icon.svg';
import ExhibitionHallIcon from '../assets/Exhibition-hall-image.png';
import './ApplyPage.css';

export default function ApplyPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: '',
    time: '오전 10시 30분', // 피그마 사양으로 변경
    applicant: '',
    participants: '1', // 기본값 1
    phone: '',
    email: '',
    remarks: '', // 비고 신설
  });

  // 연락처 분할 관리를 위한 로컬 상태
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');

  // 이메일 분할 관리를 위한 로컬 상태
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [emailDomainSelect, setEmailDomainSelect] = useState('direct');

  // 개인정보 수집 동의 상태 신설
  const [agreed, setAgreed] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);

  // 커스텀 날짜 선택 드롭다운 제어 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 커스텀 연락처 선택 드롭다운 제어 상태
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const phoneDropdownRef = useRef(null);

  // 커스텀 이메일 도메인 선택 드롭다운 제어 상태
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);
  const emailDropdownRef = useRef(null);

  // 드롭다운 바깥 클릭 시 닫히도록 감지
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(e.target)) {
        setIsPhoneDropdownOpen(false);
      }
      if (emailDropdownRef.current && !emailDropdownRef.current.contains(e.target)) {
        setIsEmailDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // 2026년 5월 달력 일수 데이터 (1일은 금요일이므로 앞에 5개의 빈 칸이 필요함)
  const calendarDays = [
    { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, // 일~목 빈칸
    { day: 1, status: 'closed' },
    { day: 2, status: 'none' },
    { day: 3, status: 'none' },
    { day: 4, status: 'none' },
    { day: 5, status: 'closed' },
    { day: 6, status: 'closed' },
    { day: 7, status: 'closed' },
    { day: 8, status: 'available', fullDate: '2026-05-08', label: '2026년 5월 8일 (금요일)' },
    { day: 9, status: 'none' },
    { day: 10, status: 'none' },
    { day: 11, status: 'none' },
    { day: 12, status: 'closed' },
    { day: 13, status: 'closed' },
    { day: 14, status: 'closed' },
    { day: 15, status: 'closed' },
    { day: 16, status: 'none' },
    { day: 17, status: 'none' },
    { day: 18, status: 'none' },
    { day: 19, status: 'available', fullDate: '2026-05-19', label: '2026년 5월 19일 (화요일)' },
    { day: 20, status: 'closed' },
    { day: 21, status: 'closed' },
    { day: 22, status: 'closed' },
    { day: 23, status: 'none' },
    { day: 24, status: 'none' },
    { day: 25, status: 'none' },
    { day: 26, status: 'closed' },
    { day: 27, status: 'closed' },
    { day: 28, status: 'closed' },
    { day: 29, status: 'closed' },
    { day: 30, status: 'none' },
    { day: 31, status: 'none' }
  ];

  // 선택된 날짜 레이블 반환 함수
  const getSelectedDateLabel = () => {
    if (!form.date) return '날짜 선택';
    const found = calendarDays.find(d => d.fullDate === form.date);
    return found ? found.label : '날짜 선택';
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleEmailDomainChange = (val) => {
    setEmailDomainSelect(val);
    if (val !== 'direct') {
      setEmail2(val);
    } else {
      setEmail2('');
    }
  };

  // 참여인원 직접 입력 및 한계 제어 로직
  const handleParticipantsChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외 제거
    setForm(prev => ({ ...prev, participants: val }));
  };

  const handleParticipantsBlur = () => {
    const num = parseInt(form.participants, 10);
    if (isNaN(num) || num < 1) {
      setForm(prev => ({ ...prev, participants: '1' }));
    } else if (num > 20) {
      setForm(prev => ({ ...prev, participants: '20' }));
    }
  };

  // 참여인원 증감 로직
  const decreaseParticipants = () => {
    const current = parseInt(form.participants || '1', 10);
    setForm(prev => ({
      ...prev,
      participants: Math.max(1, current - 1).toString()
    }));
  };

  const increaseParticipants = () => {
    const current = parseInt(form.participants || '1', 10);
    setForm(prev => ({
      ...prev,
      participants: Math.min(20, current + 1).toString()
    }));
  };

  const handleApplyClick = (e) => {
    if (!agreed) {
      setShowAgreementError(true);
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      setShowAgreementError(true);
      return;
    }
    setShowAgreementError(false);

    // 최종 폼 제출 시점에 연락처와 이메일 정보를 조합하여 전달 객체 구성
    const finalPhone = (phone2 || phone3) ? `${phone1}-${phone2}-${phone3}` : '';
    let domain = email2;
    if (emailDomainSelect !== 'direct') {
      domain = emailDomainSelect;
    }
    const finalEmail = email1 ? `${email1}@${domain}` : '';

    const finalForm = {
      ...form,
      phone: finalPhone,
      email: finalEmail
    };

    navigate('/apply-complete', { state: { formData: finalForm } });
  };

  return (
    <main id="main-content" className="apply-page">
      <h1 className="sr-only">전시 체험 프로그램 예약 신청</h1>

      {/* 브레드크럼 */}
      <div className="apply-breadcrumb-static">
        <div className="btn-breadcrumb-static" aria-hidden="true">
          <div className="btn-left">
            <img src={HomeIcon} alt="" className="icon-home" aria-hidden="true" />
          </div>
        </div>
        <span className="breadcrumb-text">∙&nbsp;&nbsp;체험하기&nbsp;&nbsp;∙&nbsp;&nbsp;예약/신청</span>
      </div>

      {/* 예약신청 내용 */}
      <section className="apply-content">

        {/* 프로그램 상단 정보 */}
        <div className="apply-program-info">
          <h2 className="apply-program-title">
            &lt;그린그린 뮤지엄: 별가루 신비정원&gt; 어린이 단체 전시해설 프로그램(5월)
          </h2>
          <div className="apply-exhibition-info">
            <img src={ExhibitionHallIcon} alt="수원시립만석전시관 로고" className="apply-exhibition-logo" />
            <span className="apply-exhibition-name">수원시립만석전시관</span>
          </div>
        </div>

        {/* 신청 폼 */}
        <form className="apply-form" onSubmit={handleSubmit}>

          {/* 참여일 */}
          <div className="form-field apply-date-dropdown-container" ref={dropdownRef}>
            <div className="form-label-header">
              <label className="form-label" htmlFor="apply-date">
                참여일 <span className="form-required">*</span>
              </label>
              <span className="form-required-hint">*는 필수입력 항목입니다.</span>
            </div>

            {/* 커스텀 드롭다운 버튼 */}
            <div
              id="apply-date"
              className={`form-select custom-dropdown ${isDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className={`apply-date-text ${form.date ? 'has-date' : ''}`}>
                {getSelectedDateLabel()}
              </span>
            </div>

            {/* 실제 폼 전송을 위한 hidden input */}
            <input type="hidden" name="date" value={form.date} required />

            {/* 달력 드롭다운 팝업 */}
            {isDropdownOpen && (
              <div className="calendar-dropdown-popup">
                {/* 달력 상단 (2026. 5) */}
                <div className="calendar-dropdown-header">
                  2026. 5
                </div>

                {/* 요일 헤더 */}
                <div className="calendar-dropdown-weekdays">
                  <span className="weekday-sun">일</span>
                  <span>월</span>
                  <span>화</span>
                  <span>수</span>
                  <span>목</span>
                  <span>금</span>
                  <span className="weekday-sat">토</span>
                </div>

                {/* 날짜 그리드 */}
                <div className="calendar-dropdown-grid">
                  {calendarDays.map((cell, index) => {
                    const isSunday = index % 7 === 0;
                    const isSaturday = index % 7 === 6;

                    if (cell.day === null) {
                      return <div key={`empty-${index}`} />;
                    }

                    // 날짜 셀 렌더링
                    if (cell.status === 'available') {
                      return (
                        <div
                          key={`day-${cell.day}`}
                          onClick={() => {
                            setForm({ ...form, date: cell.fullDate });
                            setIsDropdownOpen(false);
                          }}
                          className="calendar-cell cell-available"
                        >
                          <span className="cell-available-day">{cell.day}</span>
                          <span className="cell-available-label">신청가능</span>
                        </div>
                      );
                    } else if (cell.status === 'closed') {
                      return (
                        <div
                          key={`day-${cell.day}`}
                          className="calendar-cell cell-closed"
                        >
                          <span className="cell-closed-day">{cell.day}</span>
                          <span className="cell-closed-label">정원마감</span>
                        </div>
                      );
                    } else {
                      // none 상태 (선택 불가능한 일반 날짜)
                      const textColorClass = isSunday ? 'text-sun' : isSaturday ? 'text-sat' : 'text-default';

                      return (
                        <div
                          key={`day-${cell.day}`}
                          className={`calendar-cell cell-none ${textColorClass}`}
                        >
                          <span className="cell-none-day">{cell.day}</span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 참여시간 */}
          <div className="form-field">
            <label className="form-label" htmlFor="apply-time">참여시간</label>
            <input
              id="apply-time"
              type="text"
              name="time"
              className="form-input form-input--readonly"
              value={form.time}
              readOnly
            />
          </div>

          {/* 신청자 */}
          <div className="form-field">
            <label className="form-label" htmlFor="apply-applicant">
              신청자 <span className="form-required">*</span>
            </label>
            <input
              id="apply-applicant"
              type="text"
              name="applicant"
              className="form-input"
              placeholder="이름"
              value={form.applicant}
              onChange={handleChange}
              required
            />
          </div>

          {/* 참여인원 */}
          <div className="form-field">
            <label className="form-label" htmlFor="apply-participants">
              참여인원 <span className="form-required">*</span>
            </label>
            <div className="participants-row">
              <input
                id="apply-participants"
                type="text"
                inputMode="numeric"
                name="participants"
                className="form-input participants-input"
                value={form.participants}
                onChange={handleParticipantsChange}
                onBlur={handleParticipantsBlur}
                required
              />
              <span className="participants-text">명 (최대 20명)</span>
              <div className="participants-buttons-group">
                <button
                  type="button"
                  onClick={decreaseParticipants}
                  className="participants-btn participants-btn-minus"
                  aria-label="참여인원 감소"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={increaseParticipants}
                  className="participants-btn participants-btn-plus"
                  aria-label="참여인원 증가"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 연락처 */}
          <div className="form-field">
            <label className="form-label">
              연락처 <span className="form-required">*</span>
            </label>
            <div className="phone-input-group">
              <div className="phone-dropdown-container" ref={phoneDropdownRef}>
                <div
                  className={`form-select custom-dropdown ${isPhoneDropdownOpen ? 'active' : ''} phone-select`}
                  onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                >
                  <span className="apply-date-text has-date">{phone1}</span>
                </div>
                
                {isPhoneDropdownOpen && (
                  <div className="phone-dropdown-popup">
                    {['010', '011', '016', '017', '018', '019'].map((num) => (
                      <div
                        key={num}
                        className="phone-dropdown-item"
                        onClick={() => {
                          setPhone1(num);
                          setIsPhoneDropdownOpen(false);
                        }}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="phone-separator">-</span>
              <input
                type="text"
                className="form-input phone-input"
                placeholder="번호"
                maxLength="4"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value.replace(/[^0-9]/g, ''))}
                required
                aria-label="연락처 중간 번호"
              />
              <span className="phone-separator">-</span>
              <input
                type="text"
                className="form-input phone-input"
                placeholder="번호"
                maxLength="4"
                value={phone3}
                onChange={(e) => setPhone3(e.target.value.replace(/[^0-9]/g, ''))}
                required
                aria-label="연락처 마지막 번호"
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className="form-field">
            <label className="form-label">이메일</label>
            <div className="email-input-group">
              {/* 1행: 계정 + @ */}
              <div className="email-input-row">
                <input
                  type="text"
                  className="form-input email-input"
                  placeholder="계정"
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                  aria-label="이메일 계정"
                />
                <span className="email-at">@</span>
              </div>
              {/* 2행: 도메인 직접입력 + 도메인 선택 select */}
              <div className="email-input-row">
                <input
                  type="text"
                  className="form-input email-input"
                  placeholder="도메인"
                  value={email2}
                  onChange={(e) => setEmail2(e.target.value)}
                  disabled={emailDomainSelect !== 'direct'}
                  aria-label="이메일 도메인 직접입력"
                />
                <div className="phone-dropdown-container" ref={emailDropdownRef}>
                  <div
                    className={`form-select custom-dropdown ${isEmailDropdownOpen ? 'active' : ''} email-select`}
                    onClick={() => setIsEmailDropdownOpen(!isEmailDropdownOpen)}
                  >
                    <span className={`apply-date-text ${emailDomainSelect ? 'has-date' : ''}`}>
                      {emailDomainSelect === 'direct' ? '직접입력' : emailDomainSelect}
                    </span>
                  </div>
                  
                  {isEmailDropdownOpen && (
                    <div className="phone-dropdown-popup">
                      {['direct', 'naver.com', 'hanmail.net', 'gmail.com', 'nate.com'].map((domain) => (
                        <div
                          key={domain}
                          className="phone-dropdown-item"
                          onClick={() => {
                            handleEmailDomainChange(domain);
                            setIsEmailDropdownOpen(false);
                          }}
                        >
                          {domain === 'direct' ? '직접입력' : domain}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 교육비 */}
          <div className="form-field">
            <label className="form-label">교육비</label>
            <div className="form-fee-display">무료</div>
          </div>

          {/* 비고 */}
          <div className="form-field">
            <label className="form-label" htmlFor="apply-remarks">비고</label>
            <textarea
              id="apply-remarks"
              name="remarks"
              className="form-input remarks-input"
              placeholder="신청 관련 내용을 작성해 주세요."
              value={form.remarks}
              onChange={handleChange}
            />
            <p className="form-hint remarks-hint">
              1. 기관명, 기관연락{'\n'}
              2. 대표 교사명, 교사 연락처{'\n'}
              3. 아동 연령대
            </p>
          </div>

          {/* 신청시 유의사항 */}
          <div className="notice-section">
            <h3 className="notice-title">
              신청시 유의사항
            </h3>
            <ul className="notice-list">
              <li>
                개인정보보호를 위해 주민번호, 주소, 전화번호 등 글 작성시 유의하여 주시기 바랍니다.
              </li>
            </ul>

            {/* 개인정보 수집 동의 체크박스 */}
            <div
              onClick={() => {
                setAgreed(!agreed);
                setShowAgreementError(false);
              }}
              className="agreement-wrapper"
            >
              <div className={`checkbox-box ${agreed ? 'active' : ''}`}>
                {agreed && (
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5L5 9.5L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`agreement-text ${agreed ? 'active' : ''}`}>
                위와 같은 사항을 확인 후 개인정보 수집에 동의합니다
              </span>
            </div>
            {showAgreementError && (
              <p className="agreement-error">개인정보 수집 및 신청 유의사항에 동의해주세요.</p>
            )}
          </div>

          {/* 제어 버튼 세트 수평 정렬 */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/details')}
              className="btn-back"
            >
              돌아가기
            </button>
            <button
              type="submit"
              onClick={handleApplyClick}
              className="btn-submit"
            >
              신청하기
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

