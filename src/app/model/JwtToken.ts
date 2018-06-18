export class JwtToken {
  constructor(
    public id: string,
    public username: string,
    public role: string,
    public validUntil: string
  ) {}
}
