import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { CODE } from "../enums/codes";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { access } = req.cookies;

  if (!access) {
    throw new UnauthorizedError("No access token", CODE.NO_ACCESS_TOKEN);
  }

  try {
    const decoded: any = jwt.verify(
      access,
      process.env.ACCESS_TOKEN_EXPIRATION as string
    );

    const { id, email } = decoded;

    req.currentUser = {
      id,
      email,
    };

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new UnauthorizedError(
        "Access token has expired.",
        CODE.ACCESS_TOKEN_EXPIRED
      );
    } else {
      throw new UnauthorizedError("Cannot decode access token");
    }
  }
};
