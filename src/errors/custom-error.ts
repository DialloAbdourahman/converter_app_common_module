import { CODE } from "../enums/codes";

export abstract class CustomError extends Error {
  abstract message: string;
  abstract statusCode: number;

  // constructor(code: CODE, message: string, statusCode: number) {
  //   super();

  //   // Only because we are extending a built in class
  //   Object.setPrototypeOf(this, CustomError.prototype);
  // }

  abstract serializeErrors(): {
    code: CODE;
    message: string;
  };
}
