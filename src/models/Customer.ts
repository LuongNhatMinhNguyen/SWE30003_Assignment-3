export class Customer{
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string, // <-- Add this line
    public address: string,
    public city?: string,
    public postcode?: string,
    public country?: string
  ) {}
}