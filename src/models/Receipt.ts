export class Receipt {
  constructor(
    public id: string,
    public orderId: string,
    public total: number,
    public date: string,
    public customerId: string
  ) {}
}