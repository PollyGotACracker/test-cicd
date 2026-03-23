# CI-CD Test

- Github Actions, Vercel을 사용하여 Next.js 프로젝트 배포
  - 팀원 한 명의 Vercel hobby 계정
- 패키지 매니저는 pnpm 사용

## 구조

```
팀원 A: feat/... 작업 → develop으로 PR
          ↓
GitHub Actions: Jest 테스트 → 통과 → Vercel Preview 배포
          ↓
PR에 Preview 댓글 → 수동으로 develop merge
          ↓
develop → main PR → 수동으로 main merge
          ↓
GitHub Actions: Vercel Production 배포
          ↓
PR에 Production 댓글
```

## 권한 구조

| 역할              | Vercel 대시보드 | GitHub Secrets | 코드/워크플로우 | 비용 |
| ----------------- | --------------- | -------------- | --------------- | ---- |
| 토큰 발급자 (1명) | 접근 가능       | 수정 가능      | 수정 가능       | 무료 |
| 나머지 팀원       | 접근 불가       | 수정 가능      | 수정 가능       | 무료 |

## 1. Vercel 준비

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

## 2. GitHub Secrets 등록

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

1. Vercel 대시보드
2. 프로젝트 선택
3. Settings
4. Environment Variables
5. key, value 입력 후 적용할 환경 체크(Production, Preview, Development)
6. Save

- 또는 Vercel CLI 사용:

```shell
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

- 모든 팀원이 Vercel CLI 를 사용하는 경우 .env.local 파일을 별도 공유 없이 받을 수 있음

```shell
# .env.local 파일 추가 및 .gitignore 업데이트
vercel env pull
# development 환경에서 프로젝트 실행
vercel dev
```

## 4. Vercel Git 연동 해제

1. Vercel 대시보드
2. 프로젝트 선택
3. Settings
4. Git
5. Connected Git Repository
6. Disconnect

## 5. Vercel Team 설정 수정

- 수정하지 않으면 preview URL 등에 닉네임이 표시된다(...s project).

1. Vercel 대시보드
2. 좌하단 Settings
3. General
4. Team Name 변경
5. Team URL 변경

## 5. Github Actions 파일 생성

- ./github/workflows 에 yaml(yml) 파일 생성
- node version 은 프로젝트에 맞게 설정

## 6. Github branch ruleset 설정

1. 레포지토리 Settings
2. Branches > Add branch ruleset
3. Ruleset Name 입력 (브랜치 이름 등)
4. Enforcement status 를 Active 로 변경
5. Target branches > Add target > Include by pattern
6. 브랜치 이름 입력(또는 포함되는 글자)
7. Require a pull request before merging 선택 (필요 시 옵션 선택)
8. Require status checks to pass 선택
9. 하위 Require branches to be up to date before merging 선택
10. Add checks > 반드시 통과해야 하는 job 이름 작성 (현재 workflow 에 없어도 가능)
    - job 에 `name` 이 존재하는 경우 반드시 해당 이름으로 설정해야 함
      - 예제 파일(preview.yml)의 경우: `Test & Deploy Preview`
    - develop, main 브랜치에 test, preview deploy job 을 추가
    - **production deploy job 은 추가하지 않는다(영구 pending 상태)**

## 7. Github General 설정

1. 레포지토리 Settings
2. General > Automatically delete head branches 선택
   - PR 이 merge 되면 해당 브랜치 자동 삭제
