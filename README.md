# Wayne_Hills_Ventures 기업과제

# user-role-blog-service

- 원티드 프리온보딩 백엔드 코스의 Wayne_Hills_Ventures [기업과제](https://drive.google.com/file/d/1OyHiyNyUQCFw7oOuq50S4UZQouj7RvE2/view?usp=sharing)입니다.

## 👨‍👩‍👧 작업 구성원

| 이름   | 깃허브                           | 이메일                | 블로그                      |
| ------ | -------------------------------- | --------------------- | --------------------------- |
| 김현균 | https://github.com/Ksanbal       | dev.ksanbal@gmail.com | https://www.devksanbal.site |
| 남혜민 | https://github.com/minenam       | nhm6947@gmail.com     |                             |
| 박규성 | https://github.com/gyus13        | gyus8833@gmail.com    | https://velog.io/@gyus13    |
| 위찬복 | https://github.com/chanbokW      | cksqhr4961@gmail.com  | https://www.devksanbal.site |
| 이재후 | https://github.com/Arios67       | pooohoo67@gmail.com   | https://www.devksanbal.site |
| 장성우 | https://github.com/sung-woo-jang | seastory624@gmail.com |                             |

## 1. 서비스 개요

- 본 서비스는 회원 권한별 게시판 이용과 서비스 사용 통계를 보는 서비스입니다.
- 권한별로 이용 가능한 게시판에 접근 권한에 차이가 있습니다.
- 운영자는 유저들의 서비스 이용 통계를 볼 수 있습니다.

## 2. 개요

### 1. 기능 목록

#### 1. 공지사항, 자유게시판, 운영게시판

#### 2. 회원 등급에 따른 게시판 기능 접근 제어

#### 3. 회원가입, 로그인, 회원탈퇴

#### 4. 이용 통계집계 (남, 여 별, 나이별, 접속 시간별)

### 2. 개발 조건

#### 1. RDB 사용

#### 2. 요구사항에 맞게 자유로이 개발

#### 3. 필요한 조건 자유롭게 추가 가능

#### 4. 통계가 다양할 수록 가산점

## 3. 구현

## 👉 ERD (수정 예정)

<img width="785" alt="스크린샷 2022-09-01 오후 10 44 18" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F8uAaf%2FbtrLecono61%2FY5oJFoksxN6cRHsiUiCmTk%2Fimg.png">
</br>

### 1. API 이름

- API 기능을 설명 (회원정보 입력 후 로그인 할 수 있습니다.)
- HTTP Method / path (POST /user/login)
- Request Body

```json
{
  "email": "seastory624@gmail.com",
  "password": "Test123$"
}
```

- Response Body

```json
{
  "id": 4,
  "email": "seastory624@gmail.com",
  "name": "장성우",
  "gender": "남자",
  "age": 27,
  "role": "CUSTOMER",
  "status": "ACTIVE",
  "createAt": "2022-09-01T01:24:07.000Z",
  "deleteAt": null
}
```

### 2. API 이름

## 📌 [개발 컨벤션](https://www.notion.so/devksanbal/9da9e2986a634b07a9615dd4298af006)
