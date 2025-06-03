export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public stock: number, 
    public desc?: string[]
  ) {}
}