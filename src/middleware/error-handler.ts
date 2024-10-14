// import { Response, Request, NextFunction } from "express";
// import { CustomError } from "../errors/custom-error";
// import { CODE } from "../enums/codes";

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (err instanceof CustomError) {
//     return res.status(err.statusCode).send(err.serializeErrors());
//   }

//   console.error("Unexpected error occured", err);
//   res.status(500).send({
//     code: CODE.UNEXPECTED_ERROR,
//     message: "Something went wrong",
//   });
// };

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  console.error("Unexpected error in middleware", err);
  res.status(500).send({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });
};
