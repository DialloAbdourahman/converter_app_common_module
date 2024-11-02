import { Response } from "express";
import { CODE } from "../enums/codes";

export class OrchestrationResult {
  static list(
    res: Response,
    data: any[],
    totalItems: number,
    itemsPerPage: number,
    page: number
  ) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    res.status(200).json({
      code: CODE.SUCCESS,
      totalPages,
      itemsPerPage,
      page,
      data,
    });
    return;
  }

  static item(res: Response, data: any, status?: number) {
    const stat = status || 200;
    res.status(stat).json({
      code: CODE.SUCCESS,
      data,
    });
    return;
  }

  static success(res: Response, status?: number) {
    const stat = status || 200;
    res.status(stat).json({
      code: CODE.SUCCESS,
    });
    return;
  }
}
