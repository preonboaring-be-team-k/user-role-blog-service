// status filter
export enum Status {
  ACTIVE = '활성화',
  INACTIVE = '비활성화',
  DELETE = '삭제',
}

export enum Sort {
  DESC = 'DESC',
  ASC = 'ASC',
  nickname = 'nickName',
}

// user searchType filter
export enum SearchType {
  realName = 'realName',
  email = 'email',
  phoneNumber = 'phoneNumber',
}

export const PAGE_SIZE = 20;
