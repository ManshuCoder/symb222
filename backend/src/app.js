import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import roomRoutes from "./routes/roomRoutes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*"
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/rooms", roomRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;


