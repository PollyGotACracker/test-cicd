// .cz-config.js
module.exports = {
  types: [
    { value: "feat", name: "feat:     새로운 기능 추가" },
    { value: "fix", name: "fix:      버그 수정" },
    { value: "refactor", name: "refactor: 코드 리팩토링 / 코드 수정" },
    { value: "chore", name: "chore:    빌드 관련 수정, 패키지 매니저 설정" },
    { value: "test", name: "test:     테스트 코드 추가/수정" },
    { value: "docs", name: "docs:     문서 수정 / 주석" },
    {
      value: "config",
      name: "config:   환경 설정 (tsconfig / tailwind.config)",
    },
    { value: "design", name: "design:   CSS 등 UI 디자인 추가·변경 / assets" },
  ],
  messages: {
    type: "커밋 유형을 선택하세요:",
    customScope: "변경 범위 (scope)를 입력하세요 (선택사항):",
    subject: "짧은 변경 설명을 입력하세요:\n",
    body: "자세한 변경 설명을 입력하세요 (선택사항):\n",
    confirmCommit: "위 내용으로 커밋하시겠습니까?",
  },
  allowCustomScopes: true,
  skipQuestions: ["footer", "breaking"],
  subjectLimit: 100,
};
