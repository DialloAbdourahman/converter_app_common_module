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

  static item(res: Response, data: any, status?: number) {
    const stat = status || 200;
    res.status(stat).json({
      data,
    });
    return;
  }

  static success(res: Response, data: any, status?: number) {
    const stat = status || 200;
    res.status(stat).send();
    return;
  }
}
