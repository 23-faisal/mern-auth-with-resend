import express from "express";
import connectToDatabase from "./config/db";
import { FRONTEND_URL, PORT } from "./constants/env";
import { NODE_ENV } from "./constants/env";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Healthy",
    success: true,
    message: "Hello World!",
  });
});

app.listen(PORT, async () => {
  console.log(
    "Server is running on port " + PORT + " in " + NODE_ENV + " environment"
  );
  await connectToDatabase();
});
