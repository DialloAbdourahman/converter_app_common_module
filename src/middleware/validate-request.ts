import { validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};
