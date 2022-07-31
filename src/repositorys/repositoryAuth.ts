import { NextFunction, Request, Response } from "express";
import db from "../../databases/dbPostgres";
import hasEmail from "../errors/errorsAuth";

export async function ifHasEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  let hasUser = await db.query("SELECT email FROM users WHERE email=$1", [
    email,
  ]);

  try {
    hasEmail(hasUser.rows);
    next();
  } catch (e) {
    res.status(e);
  }
}
