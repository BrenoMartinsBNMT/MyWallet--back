import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routers/authRoutes";
dotenv.config();
const app = express();
app.use(cors());
app.use(json());
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("funfando");
});
app.listen(process.env.PORT_APP, () => {
  console.log("funfando em ", process.env.PORT_APP);
});
