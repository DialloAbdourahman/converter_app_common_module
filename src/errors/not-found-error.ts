import { CODE } from "../enums/codes";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  code: CODE;

  constructor(message: string, code: CODE) {
    super(message);
    this.code = code;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { code: CODE; message: string } {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
