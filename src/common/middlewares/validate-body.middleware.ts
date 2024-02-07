import middy from "@middy/core";
import { ValidationException } from "@common";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export function validateBodyMiddleware(
  dto: ClassConstructor<any>,
  skipMissingProperties = false
) {
  return ({
    before: async (handler: middy.Request<any, any, Error, any>) => {
      const dtoObj = plainToClass(dto, handler.event.body || {});
      const errors = await validate(dtoObj, { skipMissingProperties });

      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) =>
            Object.values(
              error.constraints as { [s: string]: string } | ArrayLike<string>
            )
          )
          .flat();
        throw new ValidationException(errorMessages);
      }
    },
  });
}
