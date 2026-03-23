import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { IRepository } from "../contracts/IRepository.js";
import { User, Admin, Role } from "../models/entities.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class AuthRepo extends IRepository {
  constructor() {
    super();
    this.filePath = path.join(__dirname, "../mockdata/users.json");
    this.users = [];
    this.idCounter = 2;
  }

  async init() {
    if (this.users.length === 0) {
      try {
        const data = await fs.readFile(this.filePath, "utf-8");
        const parsed = JSON.parse(data);
        this.users = parsed.map((u) =>
          u.role === Role.ADMIN
            ? new Admin(u.id, u.firstName, u.lastName, u.email, u.password)
            : new User(u.id, u.firstName, u.lastName, u.email, u.password),
        );
        this.idCounter = Math.max(...this.users.map((u) => u.id)) + 1;
      } catch (error) {
        console.error("Помилка читання users.json:", error);
      }
    }
  }

  async getAll() {
    await this.init();
    return this.users;
  }

  async create(userDto) {
    await this.init();
    const newUser = new User(
      this.idCounter++,
      userDto.firstName,
      userDto.lastName,
      userDto.email,
      userDto.password,
    );
    this.users.push(newUser);
    return newUser;
  }

  async findUserByEmailAndPassword(email, password) {
    await this.init();
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) throw new Error("Invalid password or email");
    return user;
  }
}
