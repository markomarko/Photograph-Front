export class JwtToken {
  constructor(
    public id: string,
    public role: string,
    public validUntil: string
  ) {}
}
