export class UserAPIDocs {
  static signUpOperation() {
    return {
      summary: '회원가입 API',
      description: '웨인힐스벤처스에 회원가입을 합니다.',
    };
  }

  static signUpCreatedResponse() {
    return {
      description: '계정 생성 완료',
      schema: {
        example: {
          email: 'seastory624@gmail.com',
          name: '장성우',
          password:
            '$2a$10$5n4IMeRggJi8WkhyngzP0e.C0lf3A78iwmKX0BaWsLvK4g9DkFwQW',
          gender: '남자',
          age: 27,
          deleteAt: null,
          id: 3,
          role: 'CUSTOMER',
          status: 'ACTIVE',
          createAt: '2022-09-01T00:13:42.000Z',
        },
      },
    };
  }

  static signUpConflictResponse() {
    return {
      description: '이미 가입한 이메일',
      schema: {
        example: {
          statusCode: 409,
          message: '이미 가입한 이메일입니다. 다른 계정으로 회원가입 해주세요.',
          error: 'Conflict',
        },
      },
    };
  }

  static loginOperation() {
    return {
      summary: '로그인 API',
      description: '웨인힐스벤처스에 로그인을 합니다.',
    };
  }

  static loginUnauthorizedResponse() {
    return {
      status: 401,
      description: '실패',
      schema: {
        example: {
          statusCode: 401,
          message: '회원정보가 틀립니다.',
          error: 'Unauthorized',
        },
      },
    };
  }

  static loginResponse() {
    return {
      description: '로그인 성공 응답값입니다.',
      status: 200,
      schema: {
        example: {
          id: 4,
          email: 'seastory624@gmail.com',
          name: '장성우',
          gender: '남자',
          age: 27,
          role: 'CUSTOMER',
          status: 'ACTIVE',
          createAt: '2022-09-01T01:24:07.000Z',
          deleteAt: null,
        },
      },
    };
  }

  static deleteUserOperation() {
    return {
      summary: '회원탈퇴 API',
      description: '웨인힐스벤처스에 회원정보를 삭제합니다.',
    };
  }
}
