
export class NoticeAPIDocs {
  /**
   * @code writer 이재후
   * @description 공지사항 Swagger Docs
   */
  // create
  static CreateOperation() {
    return {
      summary: '공지 작성 API',
      description: '공지사항 게시판에 공지를 작성합니다.',
    }
  }

  // read
  static GetListOperation() {
    return {
      summary: '공지 리스트 조회 API',
      description: '공지사항 리스트를 조회합니다.'
    }
  }

  // read by id
  static GetByIdOperation() {
    return {
      summary: '공지 조회 API',
      description: '해당 공지사항을 조회합니다.'
    }
  }

  // update
  static UpdateOperation() {
    return {
      summary: '공지 수정 API',
      description: '공지사항을 수정합니다.'
    }
  }

  // delete
  static DeleteByIdOperation() {
    return {
      summary: '공지 삭제 API',
      description: '공지사항을 삭제합니다.'
    }
  }

  // 204
  static NoContentResponse() {
    return {
      description: 'No Content'
    }
  }
}