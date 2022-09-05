# Wayne_Hills_Ventures 기업과제

# user-role-blog-service

[회원 등급에 따른 게시판/통계 서비스](https://drive.google.com/file/d/1OyHiyNyUQCFw7oOuq50S4UZQouj7RvE2/view?usp=sharing)입니다.

<div align="center">
  <img src="https://img.shields.io/badge/node-16.17.0-339933?logo=node.js"> 
  <img src="https://img.shields.io/badge/NestJS-9.0.0-E0234E?logo=NestJS"> 
  <img src="https://img.shields.io/badge/TypeScript-4.4.5-3178C6?logo=typescript"> 
  <img src="https://img.shields.io/badge/sqlite3-5.0.11-4479A1?logo=sqlite"> 
  <img src="https://img.shields.io/badge/Swagger-6.1.0-DC382D?logo=swagger"> 
  <img src="https://img.shields.io/badge/TypeORM-0.3.9-010101"> 
</div>

## 소개

## 👨‍👩‍👧 작업 구성원

| 이름   | 깃허브                           | 역할                                                |
| ------ | -------------------------------- | --------------------------------------------------- |
| 김현균 | https://github.com/Ksanbal       | 공지사항 CRUD, 개발환경 세팅, 코드 리뷰             |
| 남혜민 | https://github.com/minenam       | 회원 등급에 따른 게시판 접근 제어, 이슈 템플릿 작성 |
| 박규성 | https://github.com/gyus13        | 이용 통계집계, 코드 리뷰                            |
| 위찬복 | https://github.com/chanbokW      | 자유게시판 CRUD                                     |
| 이재후 | https://github.com/Arios67       | 공지사항 CRUD                                       |
| 장성우 | https://github.com/sung-woo-jang | 회원가입, 로그인, 회원탈퇴, README 작성             |

## 1. 서비스 개요

- 본 서비스는 회원 권한별 게시판 이용과 서비스 사용 통계를 보는 서비스입니다.
- 권한별로 이용 가능한 게시판에 접근 권한에 차이가 있습니다.
- 운영자는 유저들의 서비스 이용 통계를 볼 수 있습니다.

## 2. 구현 사항

### 1. 기능 목록

<details>

<summary> 1. 게시판별 사용 권한</summary>
 
 #### 1. 공지사항

- 생성 : ADMIN
  <br>

- 수정 : ADMIN
  <br>

- 삭제 : ADMIN
  <br>

- 리스트 조회 : 모두
  <br>

- 상세 조회 : 모두

#### 2. 자유게시판

- 생성 : 모두
  <br>

- 수정 : 모두
  <br>

- 삭제 : 모두
  <br>

- 리스트 조회 : 모두
  <br>

- 상세 조회 : 모두

#### 3. 운영게시판

사용 권한

- 생성 : ADMIN
  <br>

- 수정 : ADMIN
  <br>

- 삭제 : ADMIN
  <br>

- 리스트 조회 : ADMIN
  <br>

- 상세 조회 : ADMIN
</details>

#### 2. 회원 등급에 따른 게시판 기능 접근 제어

- Role Guard를 이용한 등급별 사용 제한 : ADMIN, CUSTOMER

#### 3. 회원가입, 로그인, 회원탈퇴

- JWTAuthGuard를 이용한 사용자 인증

#### 4. 이용 통계집계

- 성별, 나이, 접속 시간, 걔정 활성화 상태별 통계

### 2. 개발 조건

#### 1. RDB 사용

#### 2. 요구사항에 맞게 자유로이 개발

#### 3. 필요한 조건 자유롭게 추가 가능

#### 4. 통계가 다양할 수록 가산점

## 3. ERD

<img width="785" alt="스크린샷 2022-09-01 오후 10 44 18" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FqXmnj%2FbtrLqdtArd7%2FQ618kVhlbliQP6PtgJczZK%2Fimg.png">
</br>

# 참조문서

## 📒 [API 명세 - 스웨거](https://app.swaggerhub.com/apis/minenam/user_role_blog_service_server_api/1.0)

## 📌 [개발 컨벤션 - 노션페이지](https://www.notion.so/devksanbal/9da9e2986a634b07a9615dd4298af006)
