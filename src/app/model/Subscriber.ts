export class Subscriber {
  constructor(
    public userName: string = '',
    public password: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public roles: Array<string> = [],
    public subscriptionPlan: string = '',
    public tokenId: string = ''
  ) {}
}
