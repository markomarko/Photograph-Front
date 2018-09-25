export class Album {
    id: string;
    ownerId: string;
    name: string;
    description: string;
    dateTime: Date;
    usersWithAccess: Array<string> = [];

    constructor(
      ownerId: string,
      name: string,
      description: string,
      userlist: Array<string>
    ) {
      this.ownerId = ownerId;
      this.name = name;
      this.description = description;
      this.dateTime = new Date();
      this.usersWithAccess = userlist;
    }
  }
