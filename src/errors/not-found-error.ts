import { CODE } from "../enums/codes";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  code: CODE = CODE.NOT_FOUND;

  constructor(message: string, code?: CODE) {
    super(message);
    if (code) {
      this.code = code;
    }

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { code: CODE; message: string } {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
