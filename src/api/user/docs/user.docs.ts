import { createResponseDto } from '../../../common/utils/responseDto.utils';
import { CreateUserDto } from '../dtos/createUser.dto';

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
          success: true,
          timestamp: '2022-09-05T02:15:34.587Z',
          message: 'Created',
          data: {
            email: 'seastory624@gmail.com',
            name: '장성우',
            gender: '남자',
            age: 27,
            deleteAt: null,
            id: 7,
            role: 'CUSTOMER',
            status: 'ACTIVE',
            createAt: '2022-09-05T02:15:34.000Z',
          },
        },
      },
    };
  }

  static signUpConflictResponse() {
    return {
      description: '이미 가입한 이메일',
      schema: {
        example: {
          success: false,
          timestamp: '2022-09-05T02:33:19.470Z',
          message: 'Conflict',
          data: '이미 가입한 이메일입니다. 다른 계정으로 회원가입 해주세요.',
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
      description: '이메일 또는 비밀번호 가 틀린 경우.',
      status: 401,
      schema: {
        example: {
          success: false,
          timestamp: '2022-09-05T02:33:46.590Z',
          message: 'Unauthorized',
          data: '비밀번호가 틀립니다.',
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
          success: true,
          timestamp: '2022-09-05T02:34:13.081Z',
          message: 'Created',
          data: {
            user: {
              id: 7,
              email: 'seastory624@gmail.com',
              name: '장성우',
              gender: '남자',
              age: 27,
              role: 'CUSTOMER',
              status: 'ACTIVE',
              createAt: '2022-09-05T02:15:34.000Z',
              deleteAt: null,
            },
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuyepeyEseyasCIsInN1YiI6Nywicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjYyMzQ1MjUzLCJleHAiOjE2NjI0Mjk4NTN9.PWDhSZaQHCh6jNQDyqnNnYbQd0-jkvzbb9H-NLrjmFo',
          },
        },
      },
    };
  }

  static deleteUserResponse() {
    return {
      description: '회원정보 삭제 성공 응답값입니다.',
      status: 200,
      schema: {
        example: {
          success: true,
          timestamp: '2022-09-05T02:34:36.236Z',
          message: 'OK',
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

  static deleteUserUnauthorizedResponse() {
    return {
      description: '권한이 없거나 이미 없는 계정일 경우',
      status: 401,
      schema: {
        example: {
          success: false,
          timestamp: '2022-09-05T02:38:45.537Z',
          message: '사용자 정보를 찾을 수 없습니다.',
          data: {},
        },
      },
    };
  }
}
