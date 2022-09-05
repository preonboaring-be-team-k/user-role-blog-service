import { createExceptionDto } from '../utils/responseDto.utils';

export class CommonResponse {
  // 200
  static OkResponse() {
    return {
      description: 'Ok',
    };
  }

  // 204
  static NoContentResponse() {
    return {
      description: 'No Content',
    };
  }

  // 400
  static BadRequestResponse() {
    return {
      description: 'Bad Request',
      type: createExceptionDto(String, true),
    };
  }

  // 404
  static NotFoundResponse() {
    return {
      description: 'Not Found',
      type: createExceptionDto({}),
    };
  }
}
