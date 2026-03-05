export class ProgramDTO {
  constructor({ channelId, showId, startTime }) {
    if (!channelId || !showId || !startTime) {
      throw new Error("Invalid ProgramDTO payload");
    }
    this.channelId = channelId;
    this.showId = showId;
    this.startTime = startTime;
  }
}
