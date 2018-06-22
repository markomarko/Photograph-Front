export class Album {
    id: number;
    userId: number;
    clientId: number;
    name: string;
    description: string;
    dateTime: Date;
    constructor(
      userId: number,
      clientId: number,
      name: string,
      description: string,
    ) {
      this.userId = userId;
      this.name = name;
      this.description = description;
      this.dateTime = new Date();
      this.clientId = clientId;
    }
  }
