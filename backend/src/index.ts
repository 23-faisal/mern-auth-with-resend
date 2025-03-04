import express from "express";
import connectToDatabase from "./config/db";
import { FRONTEND_URL, PORT } from "./constants/env";
import { NODE_ENV } from "./constants/env";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";

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

app.get(
  "/",
  catchErrors((req, res, next) => {
    throw new Error("This is an error");
    res.status(OK).json({
      status: "healthy",
    });
  })
);

// AUTH
app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(
    "Server is running on port " + PORT + " in " + NODE_ENV + " environment"
  );
  await connectToDatabase();
});
