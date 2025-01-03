import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextApiRequest, NextApiResponse } from "next";

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 1,
});

export default async function rateLimit(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ip = (Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for']) || req.socket.remoteAddress || "anonymous";
    await rateLimiter.consume(ip);
  } catch (error) {
    res.setHeader("Retry-After", String(Math.ceil(error.msBeforeNext / 1000)));
    res.status(429).json({
      status: "error",
      message: "Too many requests. Please try again later.",
    });
    throw error;
  }
}
