import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routers/authRoutes";
import transactionsRouter from "./src/routers/transactionsRoutes";
dotenv.config();
var app = express();
app.use(cors());
app.use(json());
app.use(authRoutes);
app.use(transactionsRouter);
app.get("/", function (req, res) {
    res.send("funfando");
});
app.listen(process.env.PORT_APP, function () {
    console.log("funfando em ", process.env.PORT_APP);
});
