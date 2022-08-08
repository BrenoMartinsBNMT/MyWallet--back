import { NextFunction, Request, Response } from "express";
import db from "../../databases/dbPostgres.js";
import { hasEmail, hasNoEmail, Unauthorized } from "../errors/errorsAuth.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function ifHasEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;
    let hasUser = await db.query("SELECT email FROM users WHERE email=$1", [
      email,
    ]);

    hasEmail(hasUser.rows[0]);
    next();
  } catch (e: any) {
    if (e.error) {
      return res.status(e.error).send(e.message);
    }
    if (!e.error) {
      return res.send(e);
    }
  }
}

export async function hasToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const infosUser = await db.query(
      "SELECT id,email,password FROM users WHERE email = $1",
      [email]
    );

    const userHasToken = await db.query(
      "SELECT token FROM sessions WHERE user_id = $1",
      [infosUser.rows[0].id]
    );

    if (!userHasToken.rows[0]) {
      next();
      return;
    }
    if (!bcrypt.compareSync(password, infosUser.rows[0].password)) {
      Unauthorized();
    }
    await db.query("UPDATE sessions SET token = $2 WHERE user_id = $1", [
      infosUser.rows[0].id,
      JWT.sign(email, process.env.JWT_SECRET as string),
    ]);

    const updatedToken = await db.query(
      "SELECT token FROM sessions WHERE user_id= $1",
      [infosUser.rows[0].id]
    );

    return res.send(updatedToken.rows[0]);
  } catch (e) {
    return res.send(e);
  }
}
export async function userLogin(req: Request, res: Response) {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const passwordUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    hasNoEmail(passwordUser.rows[0]);
    if (!bcrypt.compareSync(password, passwordUser.rows[0].password)) {
      Unauthorized();
    }
    let token = JWT.sign(email, process.env.JWT_SECRET as string);
    await db.query("INSERT INTO sessions (user_id,token) VALUES($1,$2)", [
      passwordUser.rows[0].id,
      token,
    ]);

    return res.send({ token });
  } catch (e: any) {
    if (e.error) {
      return res.status(e.error).send(e.message);
    }
    if (!e.error) {
      return res.send(e);
    }
  }
}
