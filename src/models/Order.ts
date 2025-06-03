import { Product } from "./Product"; 

export class OrderItem {
  constructor(
    public productId: string,
    public quantity: number,
    public price: number
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