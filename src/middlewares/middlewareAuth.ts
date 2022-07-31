import { Request, Response } from "express";
import { Schema } from "joi";

export default function middlewareSignUp(schema: Schema) {
  return async function (req: Request, res: Response) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).send(
        error.details.map((element) => {
          return element;
        })
      );
    }
  };
}
