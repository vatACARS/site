import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/ratelimit";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export function withRatelimitMiddleware(handler: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await rateLimit(req, res);
      await handler(req, res);
    } catch (error) {
      console.error("API Middleware Error:", error);

      res.status(500).json({
        status: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  };
}
