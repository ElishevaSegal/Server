import { appError } from "../error/app-error";

const notFound = (req, res, next) => {
  throw new appError("Page not found", 404);
};

export { notFound };
