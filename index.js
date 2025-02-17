import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.listen(3000, () => {
  console.log(`Server running at http://localhost:${port}`);
});
