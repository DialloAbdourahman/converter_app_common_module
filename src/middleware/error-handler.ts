import { Response, Request, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { CODE } from "../enums/codes";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send(error.serializeErrors());
  }

  console.error("Unexpected error occured", error);
  res.status(500).send({
    code: CODE.UNEXPECTED_ERROR,
    message: "Something went wrong",
  });
};
