import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

/**
 * 접근성 진단 스캔 결과를 'accessibility-violations.json' 보고서 파일에 실시간 안전하게 병합/기록하는 헬퍼 함수
 * @param {string} pageName - 스캔을 진행한 페이지 식별 이름
 * @param {Array} violations - Axe-core 엔진이 적출한 에러 배열
 */
function recordAccessibilityScanResult(pageName, violations) {
  const reportPath = path.join(process.cwd(), 'accessibility-violations.json');
  let currentReports = [];

  // 1. 기존 리포트 파일이 있으면 읽어서 파싱
  if (fs.existsSync(reportPath)) {
    try {
      const fileContent = fs.readFileSync(reportPath, 'utf-8');
      currentReports = JSON.parse(fileContent);
    } catch (error) {
      currentReports = [];
    }
  }

  // 2. 신규 스캔 결과 엔트리 생성 (PASS / FAIL 여부 및 상세 내용 수록)
  const isPass = !violations || violations.length === 0;
  const newReportEntry = {
    page: pageName,
    scanTime: new Date().toISOString(),
    status: isPass ? "PASS" : "FAIL",
    message: isPass 
      ? "🎉 웹 접근성 표준(WCAG 2.1 AA)을 완벽하게 만족합니다. 발견된 위반 사항이 없습니다!" 
      : "⚠️ 웹 접근성 위반 사항이 존재합니다. 아래 세부 원인을 분석하여 마크업 구조를 개선하십시오.",
    totalViolations: violations ? violations.length : 0,
    violations: (violations || []).map(v => ({
      id: v.id,
      impact: v.impact,
      tags: v.tags,
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.map(n => ({
        html: n.html,
        target: n.target,
        failureSummary: n.failureSummary
      }))
    }))
  };

  currentReports.push(newReportEntry);

  // 3. 동기식으로 파일 쓰기 (병렬 워커 세이프)
  fs.writeFileSync(reportPath, JSON.stringify(currentReports, null, 2), 'utf-8');
}

test.describe('웹 접근성 자동화 테스트 및 종합 리포팅 (Web Accessibility Audit & Report)', () => {

  test.beforeAll(async () => {
    // 테스트 시작 전, 이전 테스트에서 생성되었던 임시 보고서 파일을 깔끔하게 리셋
    const reportPath = path.join(process.cwd(), 'accessibility-violations.json');
    if (fs.existsSync(reportPath)) {
      try {
        fs.unlinkSync(reportPath);
      } catch (err) {
        // 무시
      }
    }
  });

  test('메인 홈 페이지 접근성 검사', async ({ page }) => {
    // 1. 메인 홈 진입 및 로딩 대기
    await page.goto('/');
    await page.waitForSelector('#main-content', { timeout: 5000 });

    // 2. 접근성 진단 분석
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
      .analyze();

    // 3. 스캔 결과 상시 기록 가동 (PASS 상태 기록 보존)
    recordAccessibilityScanResult('메인 홈 페이지 (/)', results.violations);

    // 4. 테스트 결과 검증 단언
    expect(results.violations).toEqual([]);
  });

  test('상세 안내 페이지 접근성 검사', async ({ page }) => {
    // 1. 상세안내 진입 및 로딩 대기
    await page.goto('/#/details');
    await page.waitForSelector('.details-page', { timeout: 5000 });

    // 2. 접근성 진단 분석
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
      .analyze();

    // 3. 스캔 결과 상시 기록 가동 (PASS 상태 기록 보존)
    recordAccessibilityScanResult('상세 안내 페이지 (/#/details)', results.violations);

    // 4. 테스트 결과 검증 단언
    expect(results.violations).toEqual([]);
  });

  test('예약 신청 페이지 접근성 검사', async ({ page }) => {
    // 1. 예약신청 진입 및 로딩 대기
    await page.goto('/#/apply');
    await page.waitForSelector('.apply-page', { timeout: 5000 });

    // 2. 접근성 진단 분석
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
      .analyze();

    // 3. 스캔 결과 상시 기록 가동 (PASS 상태 기록 보존)
    recordAccessibilityScanResult('예약 신청 페이지 (/#/apply)', results.violations);

    // 4. 테스트 결과 검증 단언
    expect(results.violations).toEqual([]);
  });
});
