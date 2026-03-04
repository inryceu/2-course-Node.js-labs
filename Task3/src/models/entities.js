export class Channel {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export class Show {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

export class TvProgram {
  constructor(id, channelId, showId, startTime) {
    this.id = id;
    this.channelId = channelId;
    this.showId = showId;
    this.startTime = startTime;
  }
}

export const Role = {USER: "USER", ADMIN: "ADMIN"}

class BaseUser {
  constructor(name, surname, email, password, role) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export class User extends BaseUser {
  constructor(name, surname, email, password) {
    super(name, surname, email, password, Role.USER);
  }
}

export class Admin extends BaseUser {
  constructor(name, surname, email, password) {
    super(name, surname, email, password, Role.ADMIN);
  }
}