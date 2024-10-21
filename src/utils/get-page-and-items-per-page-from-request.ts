import { Request } from "express";

export const getPageAndItemsPerPageFromRequestQuery = (req: Request) => {
  const itemsPerPage = req.query.itemsPerPage
    ? Number(req.query.itemsPerPage)
    : 10;
  const page = req.query.page ? Number(req.query.page) : 1;
  const skip = (page - 1) * itemsPerPage;

  return { itemsPerPage, page, skip };
};
