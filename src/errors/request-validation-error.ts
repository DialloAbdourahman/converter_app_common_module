import { ValidationError } from "express-validator";
import { CODE } from "../enums/codes";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { code: CODE; message: string } {
    return {
      code: CODE.VALIDATION_REQUEST_ERROR,
      message: `${this.errors.map((error) => `${error.msg}`)}, `,
    };
  }
}
