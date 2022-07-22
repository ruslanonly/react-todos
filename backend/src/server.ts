import express from "express";

import db from "./database/db"
import apiRouter from "./routes/api.routes"

let app = express();

app.use("/api", apiRouter);

app.listen(process.env.PORT || 5000, async () => {
  await db.connect();
  console.log("Server is started.");
})