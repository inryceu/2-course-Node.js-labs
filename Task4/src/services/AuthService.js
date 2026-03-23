export class AuthService {
  constructor(authRepository) {
    this.repository = authRepository;
  }

  async register(registerUserDto) {
    const allUsers = await this.repository.getAll();
    const emailExists = allUsers.some((u) => u.email === registerUserDto.email);

    if (emailExists) {
      throw new Error("User with this email already exists");
    }

    const newUser = await this.repository.create(registerUserDto);
    return newUser;
  }

  async login(loginUserDto) {
    const user = await this.repository.findUserByEmailAndPassword(
      loginUserDto.email,
      loginUserDto.password,
    );
    console.log("Found user: ", user.email);
    return user;
  }
}
