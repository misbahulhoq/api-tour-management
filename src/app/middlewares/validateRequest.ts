import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.body before zod validation", req.body);
    req.body = await schema.parseAsync(req.body);
    console.log("req.body after zod validation", req.body);
    next();
  };
};
