export class Customer{
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string, 
    public address?: string,
    public city?: string,
    public postcode?: string
  ) {}
}