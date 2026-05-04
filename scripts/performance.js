/**
 * (주)우리임대관리 - 운영 실적 데이터 관리 스크립트
 * 관리자 가이드: 아래의 'performanceData' 배열에 객체를 추가하거나 수정하여 실적을 업데이트하세요.
 */

const performanceData = [
    {
        tag: "운영중",
        title: "서구 부민동 T오피스텔",
        desc: "72세대 통합 위탁 관리",
        stats: [
            { icon: "bx-trending-down", text: "공실률 5% 미만 유지" },
            { icon: "bx-check-double", text: "연체율 0% 달성" }
        ]
    },
    {
        tag: "운영중",
        title: "사상구 괘법동 J빌딩",
        desc: "전속 임대 관리",
        stats: [
            { icon: "bx-refresh", text: "임대차 계약 및 시설관리 통합위탁" },
            { icon: "bx-up-arrow-alt", text: "공실률 0" }
        ]
    },
    {
        tag: "최신 실적",
        title: "동아대학교 외부기숙사",
        desc: "동아대 유학생 외부기숙사 50세대 및 유학생 100명 관리",
        stats: [
            { icon: "bx-time-five", text: "임대인은 공실걱정 0, 학교는 분쟁걱정 0" },
            { icon: "bx-user-voice", text: "부산 소재 대학교 최초 민간 외부기숙사 운영" }
        ]
    },
    {
        tag: "운영중",
        title: "충북 충주 상가건물",
        desc: "기존 단독 주택을 용도변경하여 운영 중",
        stats: [
            { icon: "bx-shield-quarter", text: "현재 카페 성업 중" },
            { icon: "bx-mobile-alt", text: "부동산 운영 컨설팅 완료" }
        ]
    }
];

/**
 * 실적 카드를 렌더링하는 함수
 */
function renderPerformance() {
    const grid = document.getElementById('performanceGrid');
    if (!grid) return;

    grid.innerHTML = performanceData.map(item => `
        <div class="performance-card">
            <div class="perf-tag">${item.tag}</div>
            <div class="perf-content">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div class="perf-stats">
                    ${item.stats.map(stat => `
                        <span><i class='bx ${stat.icon}'></i> ${stat.text}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// 페이지 로드 시 렌더링 실행
document.addEventListener('DOMContentLoaded', renderPerformance);
