import { BaseException } from "@common/exceptions";
import middy from "@middy/core";

export const errorHandlerMiddleware = () => {
  return {
    onError: (request: middy.Request<any, any, Error, any>) => {
      const message =
        request.error instanceof BaseException
          ? request.error.errorMessage
          : request.error.message || "A internal error server happened";
      const statusCode =
        request.error instanceof BaseException ? request.error.statusCode : 500;

      request.response = {
        ...request.response,
        statusCode,
        body: JSON.stringify({
          errorMessage: message,
        }),
      };
    },
  };
};
