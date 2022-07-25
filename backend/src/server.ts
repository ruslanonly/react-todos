import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./database/db"
import authRouter from "./routes/auth.routes";
import apiRouter from "./routes/api.routes";
import { protect } from "./middleware/authMiddleware";

dotenv.config();

let app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/api", protect, apiRouter);

app.listen(process.env.PORT || 5000, async () => {
  await db.connect();
  console.log("Server is started.");
})