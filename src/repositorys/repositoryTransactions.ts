/* import { Request, Response } from "express";
import db from "../../databases/dbPostgres";

export async function getTransactions(req: Request, res: Response) {
  let { token }:{token:string} = req.body;
  let { email } = await db.collection("login").findOne({ token });
  if (!email) {
    return res.sendStatus(401);
  }
}
 */
