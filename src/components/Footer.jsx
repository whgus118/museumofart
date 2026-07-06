import { useLocation } from "react-router-dom";
import "./Footer.css";
import instagramIcon from "../assets/Instagram-Icon.svg";
import facebookIcon from "../assets/Facebook-Icon.svg";
import youtubeIcon from "../assets/Youtube-Icon.svg";
import blogIcon from "../assets/Blog-Icon.svg";
import kakaoIcon from "../assets/Kakao-Icon.svg";

const snsIconMap = {
  "Instagram-Icon.svg": instagramIcon,
  "Facebook-Icon.svg": facebookIcon,
  "Youtube-Icon.svg": youtubeIcon,
  "Blog-Icon.svg": blogIcon,
  "Kakao-Icon.svg": kakaoIcon,
};


export default function Footer() {
  const location = useLocation();
  const isDetailsPage = location.pathname === "/details";
  const isApplyPage = location.pathname === "/apply";
  const isApplyCompletePage = location.pathname === "/apply-complete";
  const showInquiry = isDetailsPage || isApplyPage || isApplyCompletePage;

  const snsLinks = [
    { name: "Instagram", icon: "Instagram-Icon.svg", url: "#" },
    { name: "Facebook", icon: "Facebook-Icon.svg", url: "#" },
    { name: "Youtube", icon: "Youtube-Icon.svg", url: "#" },
    { name: "Naver Blog", icon: "Blog-Icon.svg", url: "#" },
    { name: "Kakao Channel", icon: "Kakao-Icon.svg", url: "#" },
  ];

  return (
    <footer className="footer" aria-label="사이트 정보">
      <div className="footer-container">
        {/* 디테일 및 신청 페이지에서 표시되는 문의사항 텍스트 */}
        {showInquiry && (
          <div className="footer-inquiry">
            <p className="footer-inquiry-text">관련 문의사항 : 031-5191-4114</p>
            <p className="footer-inquiry-subtext">
              (9:00 ~ 18:00 / 12:00~13:00 휴게시간 미운영 / 공휴일 미운영)
            </p>
          </div>
        )}

        {/* 푸터 상단 SNS 버튼 */}
        <ul className="sns-list" aria-label="소셜 미디어 링크">
          {snsLinks.map((sns, index) => (
            <li key={index} className="sns-item">
              <a
                href={sns.url}
                className="sns-link"
                aria-label={`${sns.name} 바로가기`}
                onClick={(e) => {
                  if (sns.url === "#") {
                    e.preventDefault();
                    alert("해당 서비스는 준비 중입니다.");
                    e.currentTarget.blur();
                  }
                }}
              >
                <img
                  src={snsIconMap[sns.icon]}
                  alt={sns.name}
                  className="sns-icon-img"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* 푸터 약관 및 소개 버튼 */}
        <ul className="terms-list" aria-label="법적 고지 및 사이트 안내">
          <li>
            <a
              href="/terms"
              className="term-link"
              onClick={(e) => {
                e.preventDefault();
                alert("이용약관 서비스는 준비 중입니다.");
                e.currentTarget.blur();
              }}
            >
              이용약관
            </a>
          </li>
          <li>
            <a
              href="/privacy"
              className="term-link privacy-link"
              onClick={(e) => {
                e.preventDefault();
                alert("개인정보 처리방침 서비스는 준비 중입니다.");
                e.currentTarget.blur();
              }}
            >
              개인정보 처리방침
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="term-link"
              onClick={(e) => {
                e.preventDefault();
                alert("미술관 소개 서비스는 준비 중입니다.");
                e.currentTarget.blur();
              }}
            >
              미술관 소개
            </a>
          </li>
        </ul>

        {/* 푸터 텍스트 정보 */}
        <div className="footer-info">
          <p className="footer-address">
            (우 16252) 경기도 수원시 팔달구 정조로 833 (신풍동)
          </p>
          <p className="footer-phone">
            대표전화{" "}
            <a
              href="tel:031-5191-3800"
              aria-label="전화걸기"
              onClick={(e) => {
                e.preventDefault();
                alert("대표전화 서비스는 준비 중입니다.");
                e.currentTarget.blur();
              }}
            >
              031-5191-3800
            </a>
          </p>

          <div className="footer-copyright">
            <p>홈페이지의 모든 내용들은 무단 복제가 불가합니다.</p>
            <p>Copyright © 2019 SUWON MUSEUM OF ART. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
