# CI-CD Test

- Github Actions, Vercel을 사용하여 Next.js 프로젝트 배포
  - 팀원 한 명의 Vercel hobby 계정
- 패키지 매니저는 pnpm 사용

## 구조

```
팀원 A: feat/... 작업 → develop으로 PR
          ↓
GitHub Actions: Jest 테스트 → 통과 → Vercel Preview 배포
          ↓                          ↓
PR에 Preview URL 댓글               팀원들이 확인
          ↓
코드리뷰 + 테스트 통과 → develop merge
          ↓
develop → main PR → 같은 과정 → main merge
          ↓
GitHub Actions: Vercel Production 배포
```

## 권한 구조

| 역할              | Vercel 대시보드     | GitHub Secrets | 코드/워크플로우 | 비용 |
| ----------------- | ------------------- | -------------- | --------------- | ---- |
| 토큰 발급자 (1명) | 접근 가능(env 관리) | 수정 가능      | 수정 가능       | 무료 |
| 나머지 팀원       | 접근 불가           | 수정 가능      | 수정 가능       | 무료 |

## 1. Vercel 준비(담당 팀원)

### 1.1. Vercel CLI 설치

```shell
# npm install -g vercel
pnpm install -g vercel
```

### 1.2 로그인 (Hobby 계정)

```shell
vercel login
```

### 1.3 프로젝트 루트에서 Vercel 프로젝트 연결

```shell
vercel link
```

### 1.4. .vercel/project.json 파일 생성 확인

```json
{
  "projectId": "prj_xxxxxxxxxxxx",
  "orgId": "org_xxxxxxxxxxxx",
  "projectName": "레포지토리 이름"
}
```

### 1.5. Vercel Access Token 발급

1. (Tokens 메뉴 진입)[https://vercel.com/account/settings/tokens]
   - 좌하단 계정 옆 ... > 설정 아이콘 > Account Settings > Tokens 메뉴
2. Access Token 발급

## 2. GitHub Secrets 등록(Repo Collaborator 누구나 가능)

1. GitHub repo Settings
2. Secrets and variables
3. Actions
4. New repository secret
   - Repository secrets: 그 레포의 모든 워크플로우에서 사용 가능
   - Environment secrets: 워크플로우에서 특정 environment를 지정한 job에서만 사용 가능

```
VERCEL_TOKEN       = (발급받은 Access Token)
VERCEL_PROJECT_ID  = (projectId 값)
VERCEL_ORG_ID      = (orgId 값)
```

## 3. Vercel 환경변수 등록

### 3.1. 환경 변수 관리

1. Vercel Dashboard
2. Settings
3. Environment Variables
4. key, value 입력 후 적용할 환경 체크(Production, Preview, Development)
5. Save

- 또는 Vercel CLI 사용:

```
# 환경변수 추가 (환경 지정)
vercel env add DATABASE_URL production

# 값 입력 프롬프트가 뜸

# 여러 환경에 동시 추가
vercel env add API_KEY production preview

# 목록 확인
vercel env ls

# 삭제
vercel env rm DATABASE_URL
```

- 모든 팀원이 Vercel CLI 를 사용하는 경우 .env 파일을 별도 공유 없이 받을 수 있음

```shell
vercel env pull
```

### 3.2. 공개 환경변수 관리(선택)

- 프로젝트 루트 경로에 vercel.json 추가

```json
// 예시
{
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.example.com",
    "NEXT_PUBLIC_APP_NAME": "My App"
  }
}
```

## 4. 워크플로우 파일 작성
