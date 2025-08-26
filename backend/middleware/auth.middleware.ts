import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken; // read JWT from cookie

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any; // use accesstoken secret
    (req as any).user = payload; // attach payload to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};