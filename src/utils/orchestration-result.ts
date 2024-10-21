import { Response } from "express";

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
      totalPages,
      itemsPerPage,
      page,
      data,
    });
    return;
  }

  static item(res: Response, data: any) {
    res.status(200).json({
      data,
    });
    return;
  }
}
