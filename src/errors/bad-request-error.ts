import { CODE } from "../enums/codes";
import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: number = 400;
  code: CODE;

  constructor(message: string, code: CODE) {
    super(message);
    this.code = code;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { code: CODE; message: string } {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
