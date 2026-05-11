import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";

app.use("/api/admin", adminRoutes);
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/", taskRoutes);
app.use("/", authRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});