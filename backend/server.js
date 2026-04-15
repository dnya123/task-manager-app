import express from "express";
import connectDB from "./config/db.js";

const app = express();

// connect database
connectDB();

// middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API Running ");
});

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});