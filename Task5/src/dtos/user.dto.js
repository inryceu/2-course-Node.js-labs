export class RegisterUserDTO {
  constructor({ firstName, lastName, email, password }) {
    if (!firstName || !lastName || !email || !password) {
      throw new Error("Invalid UserDTO payload");
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

export class LoginUserDTO {
  constructor({ email, password }) {
    if (!email || !password) {
      throw new Error("Invalid UserDTO payload");
    }
    this.email = email;
    this.password = password;
  }
}
