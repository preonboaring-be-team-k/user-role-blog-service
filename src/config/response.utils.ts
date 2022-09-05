export const response = {
  SUCCESS: {
    isSuccess: true,
    code: 200,
    message: '성공',
  },
  UNAUTHORIZED: {
    isSuccess: false,
    code: 401,
    message: '인증되지 않은 권한입니다',
  },
  ERROR: {
    isSuccess: false,
    code: 500,
    message: '서버 에러 입니다.',
  },
};
