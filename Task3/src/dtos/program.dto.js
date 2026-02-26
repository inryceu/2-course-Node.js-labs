export class CreateProgramDTO {
  constructor({ channelId, showId, startTime }) {
    if (!channelId || !showId || !startTime) {
      throw new Error("Invalid CreateProgramDTO payload");
    }
    this.channelId = channelId;
    this.showId = showId;
    this.startTime = startTime;
  }
}
