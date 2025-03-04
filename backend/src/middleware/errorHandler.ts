import { ErrorRequestHandler, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import { BAD_REQUEST } from "../constants/http";

const handleZodError = (error: z.ZodError, res: Response) => {
  const errors = error.issues.map((issue) => {
    return {
      path: issue.path.join("."),
      message: issue.message,
    };
  });
  return res.status(BAD_REQUEST).json({
    success: false,
    message: error.message,
    errors,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path} - ${error}`);
  if (error instanceof z.ZodError) {
    handleZodError(error, res);
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
