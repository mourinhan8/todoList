import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { BadRequestError } from "../core/error.response";

type Constructor<T> = { new (): T };

export const validationMiddleware = <T extends object>(type: Constructor<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input = plainToClass(type, req.body);
    const errors: ValidationError[] = await validate(input);

    if (errors.length > 0) {
      errors.map(error => {
        // console.log(error.property);
        console.log(error.constraints);
      })
      next(new BadRequestError('Validation failed', 400));
    }
    req.body = input;
    next();
  };
};
