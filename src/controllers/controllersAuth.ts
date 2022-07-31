import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../../databases/dbPostgres";

export async function persistDataSignUp(req: Request, res: Response) {
  const { email, name, password } = req.body;
  await db.query(
    "INSERT INTO users(name,email,password,balance) VALUES ($1,$2,3$,$4)",
    [email, name, bcrypt.hashSync(password, 10), 0]
  );
  res.sendStatus(201);
}
