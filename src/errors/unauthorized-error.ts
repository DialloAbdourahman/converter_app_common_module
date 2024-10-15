import { CODE } from "../enums/codes";
import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  statusCode: number = 401;
  code: CODE;

  constructor(message: string, code: CODE) {
    super(message);
    this.code = code;

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors(): { code: CODE; message: string } {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
