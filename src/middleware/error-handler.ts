import { Response, Request, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { CODE } from "../enums/codes";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // CUSTOM ERROR
  if (err instanceof CustomError) {
    res.status(err.statusCode).send(err.serializeErrors());
    return;
  }

  // MULTER POTENTIAL ERROR
  const multerPotentialError: any = err;
  if (multerPotentialError?.code === "LIMIT_FILE_SIZE") {
    res.status(400).send({
      code: CODE.MULTER_SIZE_ERROR,
      message: "File too large",
    });
    return;
  }

  // UNEXPECTED ERROR
  console.error("Unexpected error occured", err);
  res.status(500).send({
    code: CODE.UNEXPECTED_ERROR,
    message: "Something went wrong",
  });
};
