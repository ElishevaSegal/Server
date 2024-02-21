import { appError } from "../error/app-error";

// The last middleware in the chain:
const notFound = (req, res, next) => {
   throw new appError(
     "Page not found",
     401
   );
};

export { notFound };
