import { Product } from "./Product.ts";

export class OrderItem {
  constructor(
    public product: Product,
    public quantity: number
  ) {}
}

export class Order {
  constructor(
    public id: string,
    public customerId: string,
    public items: OrderItem[],
    public total: number,
    public date: string
  ) {}
}