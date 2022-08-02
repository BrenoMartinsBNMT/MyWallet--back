import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routers/authRoutes.js";
import transactionsRouter from "./src/routers/transactionsRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(json());
app.use(authRoutes);
app.use(transactionsRouter);

app.get("/", (req, res) => {
  res.send("funfando");
});
app.listen(process.env.PORT, () => {
  console.log("funfando em ", process.env.PORT);
});
