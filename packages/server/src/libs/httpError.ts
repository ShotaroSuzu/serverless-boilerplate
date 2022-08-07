import { NotFoundErrorResponse } from "@config/model/error/NotFoundErrorResponseModel";
import { createError, HttpError } from "@middy/util";

type StatusCode = 400 | 401 | 403 | 404 | 409 | 422;

export const httpError = <T extends StatusCode>(
  statusCode: T,
  error: T extends 404 ? NotFoundErrorResponse : never
): HttpError => {
  return createError(statusCode, JSON.stringify(error), error);
};
