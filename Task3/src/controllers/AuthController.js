import { RegisterUserDTO, LoginUserDTO } from "../dtos/user.dto.js";

export class AuthController {
  constructor(authService, sessionStore) {
    this.authService = authService;
    this.sessionStore = sessionStore;
  }

  register = async (req, res) => {
    try {
      const userDto = new RegisterUserDTO(req.body);
      const newUser = await this.authService.register(userDto);
      const sessionId = this.sessionStore.createSession(newUser);
      // cookie by default live while browser is open
      // httpOnly: true  => don't allow browser to read or update this cookie
      res.cookie("sessionId", sessionId, { httpOnly: true });
      res.redirect("/schedule");
      // res.json(newUser);
    } catch (error) {
      res.status(400).send("Registration Error: " + error.message);
    }
  };

  login = async (req, res) => {
    try {
      const userDto = new LoginUserDTO(req.body);
      console.log("user dto: ", userDto);
      const user = await this.authService.login(userDto);
      console.log("login user: ", user);
      const sessionId = this.sessionStore.createSession(user);
      res.cookie("sessionId", sessionId, { httpOnly: true });
      res.redirect("/schedule");
      // res.json(user);
    } catch (error) {
      res.status(401).send("Invalid email or password");
    }
  };

  logout = async (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId) {
      this.sessionStore.destroySession(sessionId);
      res.clearCookie("sessionId");
    }
  };
}
