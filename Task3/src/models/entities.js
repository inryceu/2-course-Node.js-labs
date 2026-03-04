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
