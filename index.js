import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

try {
  db.connect();
  console.log("Connected to database");
} catch (error) {
  console.log("Error while connecting to database", error);
}

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM book");
    res.render("index.ejs", { books: result.rows, authorized: false });
  } catch {
    console.log("Error while fetching data for books");
    res.render("index.ejs");
  }
});

app.get("/login", async (req, res) => {
  res.render("login.ejs");
})

app.get("/register", async (req, res) => {
  res.render("register.ejs");
})

app.get("/all", async (req, res) => {
  res.render("all.ejs");
});

app.get("/authors", async (req, res) => {
  res.render("authors.ejs");
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:${port}`);
});
