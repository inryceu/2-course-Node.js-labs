export class CreateChannelDTO {
  constructor({ name }) {
    if (!name) {
      throw new Error("Invalid CreateChannelDTO payload");
    }
    this.name = name;
  }
}