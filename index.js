import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
dotenv.config();

const saltRounds = 10;

const app = express();
const port = 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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

async function getBooks(next) {
  const result = await db.query("SELECT * FROM book");
  return result;
  next();
}

app.get("/", async (req, res) => {
  let result = await getBooks();
  if (req.isAuthenticated()) {
    res.render("index.ejs", { books: result.rows, authorized: true });
  } else {
    res.render("index.ejs", { books: result.rows, authorized: false });
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

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/login", async (req, res) => {
  res.render("login.ejs");
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    console.log(err);
  });
  res.redirect("/");
});

app.get("/register", async (req, res) => {
  res.render("register.ejs");
});

app.get("/all", async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("all.ejs", { authorized: true });
  } else {
    res.render("all.ejs", { authorized: false });
  }
});

app.get("/authors", async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("authors.ejs", {authorized: true });
  } else {
    res.render("authors.ejs", {authorized: false });
  }
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("profile.ejs", { authorized: true });
  } else {
    res.redirect("/login");
  }
});

passport.use(
  new Strategy({ usernameField: "email" }, async function (
    email,
    password,
    cb
  ) {
    console.log("email", email);
    console.log("password", password);
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (result.rows.length === 0) {
        cb("Email not registered");
        return;
      }

      const user = result.rows[0];
      const validPassword = user.password;

      bcrypt.compare(password, validPassword, (err, result) => {
        if (err) {
          console.log("Error while comparing passwords", err);
          result;
        } else if (result) {
          cb(null, user);
          console.log("passwords match");
        } else {
          cb(null, false);
          console.log("passwords not match");
        }
      });
    } catch (error) {
      console.log("Error while fetching data from database", error);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:${port}`);
});
