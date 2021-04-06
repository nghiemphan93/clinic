export class OrderDetailSearchCriteria {
  quantityFrom: number;
  quantityTo: number;
  totalPricePerProductFrom: number;
  totalPricePerProductTo: number;
  createdAtFrom: Date;
  createdAtTo: Date;
  orderId: number;
  productId: number;

  constructor(
    quantityFrom: number,
    quantityTo: number,
    totalPricePerProductFrom: number,
    totalPricePerProductTo: number,
    createdAtFrom: Date,
    createdAtTo: Date,
    orderId: number,
    productId: number
  ) {
    this.quantityFrom = quantityFrom;
    this.quantityTo = quantityTo;
    this.totalPricePerProductFrom = totalPricePerProductFrom;
    this.totalPricePerProductTo = totalPricePerProductTo;
    this.createdAtFrom = createdAtFrom;
    this.createdAtTo = createdAtTo;
    this.orderId = orderId;
    this.productId = productId;
  }
}
