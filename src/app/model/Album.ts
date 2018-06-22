export class Album {
    id: number;
    userId: number;
    name: string;
    description: string;
    dateTime: Date;
    constructor(
      userId: number,
      name: string,
      description: string,
    ) {
      this.userId = userId;
      this.name = name;
      this.description = description;
      this.dateTime = new Date();
    }
  }
