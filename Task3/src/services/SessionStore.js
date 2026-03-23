import crypto from "crypto";

class SessionStore {
  constructor() {
    this.sessions = new Map();
  }

  createSession(user) {
    const sessionId = crypto.randomUUID();
    this.sessions.set(sessionId, user);
    console.log("Session: ", this.sessions)
    return sessionId;
  }

  getUserBySessionId(sessionId) {
    return this.sessions.get(sessionId) || null;
  }

  destroySession(sessionId) {
    this.sessions.delete(sessionId);
  }
}

// create one instance during first import & cached it
const sessionStore = new SessionStore();
export default sessionStore;
