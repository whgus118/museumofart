import React, { useState } from 'react';
import './Section3.css';

import mapImage from '../assets/map.jpg';

export default function Section3() {
  const [activeTransport, setActiveTransport] = useState('transit');

  return (
    <section className="section-3" aria-labelledby="section3-title">
      <div className="section-3-header">
        <h2 id="section3-title" className="section-3-title">찾아오시는 길</h2>
        <a href="/location" className="more-link" aria-label="찾아오시는 길 더보기">더보기 +</a>
      </div>

      <div className="map-container">
        <div className="map-image-wrapper">
          {/* 실제 지도가 들어갈 자리 */}
          <img src={mapImage} alt="수원시립미술관 위치 지도" className="map-image" />
        </div>
        <div className="map-info">
          <div className="map-info-header">
            <span className="map-badge" aria-hidden="true">kakaomap</span>
            <strong className="map-place-name">수원시립미술관 행궁 본관</strong>
          </div>
          <p className="address-text">
            [16252] 경기도 수원시 팔달구 정조로 833 (신풍동 238-1)
          </p>
        </div>
      </div>

      <div className="transport-container">
        <div className="transport-tabs" role="tablist" aria-label="안내 수단 선택">
          <button 
            role="tab"
            aria-selected={activeTransport === 'transit'}
            aria-controls="panel-transit"
            id="tab-transit"
            className={`tab-btn ${activeTransport === 'transit' ? 'active' : ''}`}
            onClick={() => setActiveTransport('transit')}
          >
            지하철/버스
          </button>
          <button 
            role="tab"
            aria-selected={activeTransport === 'parking'}
            aria-controls="panel-parking"
            id="tab-parking"
            className={`tab-btn ${activeTransport === 'parking' ? 'active' : ''}`}
            onClick={() => setActiveTransport('parking')}
          >
            주차 안내
          </button>
        </div>

        <div 
          id={`panel-${activeTransport}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTransport}`}
          className="timeline-panel"
        >
          {activeTransport === 'transit' ? (
            <ul className="timeline-list">
              <li className="timeline-item">
                <div className="timeline-icon" aria-hidden="true">🏁</div>
                <div className="timeline-content">
                  <strong className="timeline-step">출발</strong>
                  <span>수원역 7번 출구 진출 후 도보 3분 이동</span>
                </div>
              </li>
              <li className="timeline-item">
                <div className="timeline-icon" aria-hidden="true">🚌</div>
                <div className="timeline-content">
                  <strong className="timeline-step">문화맨션 정류장 승차</strong>
                  <span>20-1, 25-1, 45, 112, 25, 64, 25-2, 25-5</span>
                </div>
              </li>
              <li className="timeline-item">
                <div className="timeline-icon" aria-hidden="true">🚏</div>
                <div className="timeline-content">
                  <strong className="timeline-step">하차</strong>
                  <span>팔달구청, 화성행궁 정류장 하차<br/>도보 3분 이동</span>
                </div>
              </li>
              <li className="timeline-item">
                <div className="timeline-icon" aria-hidden="true">🏛️</div>
                <div className="timeline-content">
                  <strong className="timeline-step">도착</strong>
                  <span>수원시립미술관</span>
                </div>
              </li>
            </ul>
          ) : (
            <div className="parking-panel">
              {/* 주차장 위치 / 무인정산 / 운영시간 */}
              <div className="parking-info-list">
                <div className="parking-info-row">
                  <span className="parking-dot" aria-hidden="true"></span>
                  <div className="parking-info-text">
                    <strong>주차장은 미술관 지하에 위치</strong>
                    <span className="parking-sub-text">※ 주차공간이 협소하여 주말에는 대중교통을 이용하시는 것이 편리합니다. (주차면수: 77대)</span>
                  </div>
                </div>
                <div className="parking-info-row">
                  <span className="parking-dot" aria-hidden="true"></span>
                  <div className="parking-info-text">
                    <strong>무인정산(카드결제만 가능)</strong>
                  </div>
                </div>
                <div className="parking-info-row">
                  <span className="parking-dot filled" aria-hidden="true"></span>
                  <div className="parking-info-text">
                    <strong>운영시간</strong>
                    <div className="parking-schedule">
                      <div className="schedule-row">
                        <span className="schedule-label">입차</span>
                        <span>09:30 ~ 21:00</span>
                      </div>
                      <div className="schedule-row">
                        <span className="schedule-label">출차</span>
                        <span>주차요금 정산 후 상시 가능</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 주차요금 */}
              <div className="parking-fee-section">
                <div className="parking-fee-header">
                  <span className="parking-dot filled" aria-hidden="true"></span>
                  <strong>주차요금</strong>
                  <span className="fee-note">* 회차 - 10분 무료</span>
                </div>
                <div className="parking-fee-table">
                  <div className="fee-grid">
                    <span className="fee-category-name">일반차량</span>

                    <div className="fee-rows-wrapper">
                    <div className="fee-row">
                      <span className="fee-label">최초 30분</span>
                      <strong className="fee-price">1,000원</strong>
                    </div>
                    <div className="fee-row">
                      <span className="fee-label">10분 초과마다</span>
                      <strong className="fee-price">1,500원</strong>
                    </div>
                    <div className="fee-row">
                      <span className="fee-label">1일 주차권</span>
                      <strong className="fee-price">30,000원</strong>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="fee-benefits">
                  <p className="fee-benefit-item">
                    <span className="benefit-check" aria-hidden="true">✔</span>
                    <span>
                      관람권 소지자 2시간 무료
                      <span className="benefit-warn">※ 감면대상 차량과 중복 감면 불가</span>
                    </span>
                  </p>
                  <p className="fee-benefit-item">
                    <span className="benefit-check" aria-hidden="true">✔</span>
                    <span>미술관 부대시설 (카페) 이용 1시간 무료</span>
                  </p>
                </div>
              </div>

              {/* 감면대상차량 안내 */}
              <div className="parking-discount-info">
                <p className="discount-notice">
                  ※ 감면대상 차량: 정산기에서 정산 전 호출버튼을 누르고 감면차량 여부(증빙자료 제시) 확인 후 할인적용이 가능합니다.
                </p>
                <p className="discount-notice-sub">
                  또는 출차 전 무인정산기에서 호출 버튼 누른 후 할인 적용 필요
                </p>
                <ul className="discount-list">
                  <li>
                    <strong className="discount-rate">100% 할인</strong>
                    <span>장애인(중), 국가유공자, 모범·유공·성실납세자</span>
                  </li>
                  <li>
                    <strong className="discount-rate">50% 할인</strong>
                    <span>장애인(경), 다자녀(2자녀 이상, 최연소 자녀가 18세 이하), 병역명문가, 경차, 저공해차</span>
                  </li>
                  <li>
                    <strong className="discount-rate">2,000원 감면</strong>
                    <span>선거참여자 (선거 당일 1회)</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
