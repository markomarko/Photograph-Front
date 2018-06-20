export class User {
  public id: string;

  constructor(
    public userName: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public roles: Array<string>
  ) {}
}
