import { Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import catchErrors from "../utils/catchErrors";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerHandler = catchErrors(
  async (req: Request, res: Response) => {
    //  validate a request

    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    });

    // call a service
    // return a response
  }
);
