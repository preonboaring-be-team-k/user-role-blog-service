import { createResponseDto } from '../../../common/utils/responseDto.utils';
import { FreeBoardDto } from '../dtos/freeBoard.dto';
import { FreeBoardListDto } from '../dtos/freeBoardList.dto';

export class FreeBoardAPIDocs {
  /**
   * @code writer 김현균
   * @description 자유게시판 Swagger Docs
   */
  // create
  static CreateOperation() {
    return {
      summary: '게시물 작성',
      description: '글을 작성합니다.',
    };
  }
  static CreateCreatedResponse() {
    return {
      description: 'Created',
      type: createResponseDto(FreeBoardDto),
    };
  }

  // read
  static GetListOperation() {
    return {
      summary: '게시물 리스트',
      description: '게시물 리스트를 가져옵니다.',
    };
  }
  static GetListOkResponse() {
    return {
      description: 'Ok',
      type: createResponseDto(FreeBoardListDto, true),
    };
  }

  // read by id
  static GetByIdOperation() {
    return {
      summary: '게시물',
      description: '게시물을 가져옵니다.',
    };
  }
  static GetByIdOkResponse() {
    return {
      description: 'Ok',
      type: createResponseDto(FreeBoardDto),
    };
  }

  // edit
  static EditOperation() {
    return {
      summary: '게시물 수정',
      description: '게시물을 수정합니다.',
    };
  }
  static EditOkResponse() {
    return {
      description: 'Ok',
      type: createResponseDto(FreeBoardDto),
    };
  }

  // delete
  static DeleteByIdOperation() {
    return {
      summary: '게시물 삭제',
      description: '게시물을 삭제합니다.',
    };
  }
}
