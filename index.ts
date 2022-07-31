import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

/* 
app.post("/historico-de-transacoes", async (req, res) => {
  let { token } = req.body;
  let { email } = await db.collection("login").findOne({ token });
  if (!email) {
    return res.sendStatus(401);
  }
  try {
    let { name, transactions, balance } = await db
      .collection("users")
      .findOne({ email });

    res.send({ name, transactions, balance });
  } catch {
    res.sendStatus(404);
  }
});

app.post("/historico-de-transacoes/adicionar-saldo", async (req, res) => {
  let { balance, token, description } = req.body;
  try {
    let { email } = await db.collection("login").findOne({ token });

    let { transactions } = await db.collection("users").findOne({ email });

    await db.collection("users").updateOne(
      { email },

      {
        $set: {
          transactions: [
            ...transactions,
            {
              data: `${dayjs().get("month") + "/" + dayjs().get("date")}`,
              description,
              balance,
              type: "add",
            },
          ],
        },
        $inc: { balance: balance },
      }
    );

    res.sendStatus(201);
  } catch {
    res.sendStatus(403);
  }
});
app.post("/historico-de-transacoes/retirar-saldo", async (req, res) => {
  let { balance, token, description } = req.body;
  try {
    let { email } = await db.collection("login").findOne({ token });

    let { transactions } = await db.collection("users").findOne({ email });

    await db.collection("users").updateOne(
      { email },

      {
        $set: {
          transactions: [
            ...transactions,
            {
              data: `${dayjs().get("month") + "/" + dayjs().get("date")}`,
              description,
              balance,
              type: "subs",
            },
          ],
        },
        $inc: { balance: -balance },
      }
    );

    res.sendStatus(201);
  } catch {
    res.sendStatus(403);
  }
}); */
app.listen(process.env.PORT_APP);
