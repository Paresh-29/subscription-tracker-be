import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to Subscription tracker backend");
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost: ${PORT}`);
});

export default app;
