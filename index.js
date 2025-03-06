import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const saltRounds = 10;

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM book");
    res.render("index.ejs", { books: result.rows, authorized: false });
  } catch {
    console.log("Error while fetching data for books");
    res.render("index.ejs");
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.render("register.ejs", { authorized: false, email: email, name: name });
    return;
  }
  const isRegistered = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (isRegistered.rows.length === 0) {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) console.log(err);

      try {
        await db.query(
          "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
          [name, email, hash]
        );

        res.render("login.ejs", { authorized: false, email: email });
      } catch (error) {
        console.log("Error while inserting data into database", error);
        res.render("register.ejs", {
          authorized: false,
          email: email,
          name: name,
        });
      }
      return;
    });
  } else {
    res.render("register.ejs", {
      authorized: false,
      email: email,
      name: name,
      error: "Email already registered",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (user.rows.length === 0) {
    res.render("login.ejs", {
      authorized: false,
      email: email,
      error: "Email not registered",
    });
    return;
  }
  const validPassword = user.rows[0].password;

  bcrypt.compare(password, validPassword, (err, result) => {
    if (err) {
      console.log("Error while comparing passwords", err);
      result;
    } else if (result) {
      res.render("index.ejs", {
        authorized: true,
      });
    } else {
      res.render("login.ejs", {
        authorized: false,
        email: email,
        error: "Invalid email or password",
      });
    }
  });
});

app.get("/login", async (req, res) => {
  res.render("login.ejs");
});

app.get("/register", async (req, res) => {
  res.render("register.ejs");
});

app.get("/all", async (req, res) => {
  res.render("all.ejs");
});

app.get("/authors", async (req, res) => {
  res.render("authors.ejs");
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:${port}`);
});
