import sessionStore from "../services/SessionStore.js";
import { Role } from "../models/entities.js";

export const requireAdmin = (req, res, next) => {
  const sessionId = req.cookies?.sessionId;
  console.log("Current sessionId: ", sessionId);
  if (!sessionId) {
    return res.status(401).send("Unauthorized: No session token");
  }
  const user = sessionStore.getUserBySessionId(sessionId);
  console.log("Current user: ", user);
  if (!user) {
    return res.status(401).send("Unauthorized: Session expired or invalid");
  }
  if (user.role !== Role.ADMIN) {
    return res.status(403).send("Forbidden: You haven't enough permission");
  }
  req.user = user;
  next();
};
