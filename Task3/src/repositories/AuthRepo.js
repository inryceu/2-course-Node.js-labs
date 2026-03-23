import { IRepository } from "../contracts/IRepository.js";
import { User, Admin } from "../models/entities.js";

export class AuthRepo extends IRepository {
  constructor() {
    super();
    let idCounter = 2;
    this.generateId = () => {
      return idCounter++;
    };
    this.users = [
      new Admin(1, "admin", "admin", "root@example.com", "root")
    ];
  }

  async getAll() {
    return this.users;
  }

  async create(userDto) {
    const newId = this.generateId();
    const newUser = new User(
      newId,
      userDto.firstName,
      userDto.lastName,
      userDto.email,
      userDto.password
    );
    this.users.push(newUser);
    return newUser;
  }

  async update(userId, userDto) {
    const user = await this.findUserById(userId);
    if (userDto.firstName) user.firstName = userDto.firstName;
    if (userDto.lastName) user.lastName = userDto.lastName;
    if (userDto.email) user.email = userDto.email;
    if (userDto.password) user.password = userDto.password;
    return user;
  }

  async delete(userId) {
    await this.findUserById(userId); 
    this.users = this.users.filter(u => u.id !== userId);
  }

  async findUserById(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  }

  async findUserByEmailAndPassword(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    console.log("found user: ", user)
     if (!user) {
      throw new Error("Invalid password or email");
    }
    return user;
  }
}