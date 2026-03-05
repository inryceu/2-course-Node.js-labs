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
  constructor(id, firstName, lastName, email, password, role) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export class User extends BaseUser {
  constructor(id, firstName, lastName, email, password) {
    super(id, firstName, lastName, email, password, Role.USER);
  }
}

export class Admin extends BaseUser {
  constructor(id, firstName, lastName, email, password) {
    super(id, firstName, lastName, email, password, Role.ADMIN);
  }
}
