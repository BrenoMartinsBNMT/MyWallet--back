import { Request, Response } from "express";
import db from "../../databases/dbPostgres.js";
import dayjs from "dayjs";

export async function getTransactions(req: Request, res: Response) {
  try {
    const { token } = req.body;

    const idUser = await db.query(
      "SELECT user_id FROM sessions WHERE token = $1",
      [token]
    );

    const transactions = await db.query(
      "SELECT  users.name as name, transactions.*  FROM transactions JOIN users ON id = $1",
      [idUser.rows[0].user_id]
    );

    const balance = await db.query(
      "SELECT balance,name FROM users WHERE id = $1",
      [idUser.rows[0].user_id]
    );
    if (transactions.rowCount > 0) {
      const transactionsFormated = {
        name: transactions.rows[0].name,

        infosTransactions: transactions.rows.map((element) => {
          return {
            type: element.type,
            value: element.value,
            description: element.description,
            date: dayjs(element.date).format("MM/YY"),
          };
        }),
      };
      return res.json({
        balance: balance.rows[0],
        transactionsFormated,
      });
    }
    return res.json({
      balance: balance.rows[0].balance,
      name: balance.rows[0].name,
    });
  } catch (e) {
    res.send(e);
  }
}

export async function addBalance(req: Request, res: Response) {
  try {
    let { balance, token, description } = req.body;

    const idUser = await db.query(
      "SELECT user_id FROM sessions WHERE token = $1",
      [token]
    );

    await db.query(
      "INSERT INTO transactions (type,user_id,value,description) VALUES ($1,$2,$3,$4)",
      ["add", idUser.rows[0].user_id, balance, description]
    );
    await db.query("UPDATE users SET balance = balance + $1 WHERE id = $2", [
      balance,
      idUser.rows[0].user_id,
    ]);
    res.sendStatus(201);
  } catch (e) {
    res.send(e);
  }
}
export async function subsBalance(req: Request, res: Response) {
  try {
    let { balance, token, description } = req.body;

    const idUser = await db.query(
      "SELECT user_id FROM sessions WHERE token = $1",
      [token]
    );

    await db.query(
      "INSERT INTO transactions (type,user_id,value,description) VALUES ($1,$2,$3,$4)",
      ["subs", idUser.rows[0].user_id, balance, description]
    );
    await db.query("UPDATE users SET balance = balance +$1 WHERE id = $2", [
      -balance,
      idUser.rows[0].user_id,
    ]);
    res.sendStatus(201);
  } catch (e) {
    res.send(e);
  }
}
