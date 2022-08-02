import { NextFunction, Request, Response } from "express";
import db from "../../databases/dbPostgres";
import { isTokenValid } from "../errors/errosTransactions";

export async function authTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { token }: { token: string } = req.body;
    let tokenValidate = await db.query(
      "SELECT token FROM sessions WHERE token = $1",
      [token]
    );

    isTokenValid(tokenValidate.rows[0]);
    next();
  } catch (e: any) {
    if (e.error) {
      return res.status(e.error).send(e.message);
    }
    if (!e.error) {
      res.send(e);
    }
  }
}
