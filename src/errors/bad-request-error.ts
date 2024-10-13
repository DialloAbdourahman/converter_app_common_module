import { CODE } from "../enums/codes";
import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: number = 400;
  message: string;
  code: CODE;

  constructor(message: string, code: CODE) {
    super();
    this.message = message;
    this.code = code;
  }

  serializeErrors(): { code: CODE; message: string } {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
