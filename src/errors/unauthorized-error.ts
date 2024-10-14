import { CODE } from "../enums/codes";
import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  statusCode: number = 401;
  code: CODE = CODE.UNAUTHORIZED;

  constructor(message: string, code?: CODE) {
    super(message);
    if (code) {
      this.code = code;
    }

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors(): { code: CODE; message: string } {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
