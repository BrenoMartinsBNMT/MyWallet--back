import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default function middlewareValidatorSchema(schema: Schema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).send("email ou senha incorretos!!!!");
    }
    next();
  };
}
