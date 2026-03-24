import sessionStore from "../services/SessionStore.js";
import { Role } from "../models/entities.js";

export const requireAdmin = (req, res, next) => {
  const sessionId = req.cookies?.sessionId;

  if (!sessionId) {
    return res.status(401).send("Unauthorized: No session token");
  }

  const user = sessionStore.getUserBySessionId(sessionId);
  if (!user) {
    return res.status(401).send("Unauthorized: Session expired or invalid");
  }

  if (user.role !== Role.ADMIN) {
    return res.status(403).send("Forbidden: You don't have enough permissions");
  }

  req.user = user;
  next();
};

export const extractUser = (req, res, next) => {
  const sessionId = req.cookies?.sessionId;
  if (sessionId) {
    req.user = sessionStore.getUserBySessionId(sessionId) || null;
  }
  next();
};
