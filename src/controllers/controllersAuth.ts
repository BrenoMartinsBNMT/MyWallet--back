import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../databases/dbPostgres.js";

export async function userSignUp(req: Request, res: Response) {
  const { email, name, password } = req.body;
  await db.query(
    "INSERT INTO users(name,email,password,balance) VALUES ($1,$2,$3,$4)",
    [name, email, bcrypt.hashSync(password, 10), 0]
  );
  res.sendStatus(201);
}

export async function userLogout(req: Request, res: Response) {
  const { token } = req.body;

  try {
    await db.query("DELETE FROM sessons WHERE token = $1", [token]);
    res.sendStatus(200);
  } catch {
    res.sendStatus(404);
  }
}
