import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
/* const { Pool } = pg;

const user = process.env.USER_DB;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port: any = process.env.PORT_DB;
const database = process.env.DATABASE;

const db = new Pool({
  user,
  password,
  host,
  port,
  database,
}); */
var Pool = pg.Pool;
export var db = new Pool({
    connectionString: process.env.DATABASE_URL
});
