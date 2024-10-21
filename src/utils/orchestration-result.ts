import { Response } from "express";
import { Document } from "mongoose";

export class OrchestrationResult {
  static list(
    res: Response,
    data: Document[],
    totalItems: number,
    itemsPerPage: number,
    page: number
  ) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    res.status(200).json({
      totalPages,
      itemsPerPage,
      page,
      data,
    });
    return;
  }

  static item(res: Response, data: Document) {
    res.status(200).json({
      data,
    });
    return;
  }
}
