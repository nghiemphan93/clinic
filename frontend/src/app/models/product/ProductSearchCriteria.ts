export class ProductSearchCriteria {
  productName: string;
  productCode: string;
  productPriceInFrom: number;
  productPriceInTo: number;
  productPriceOutFrom: number;
  productPriceOutTo: number;
  note: string;
  createdAtFrom: Date;
  createdAtTo: Date;

  constructor(
    productName: string,
    productCode: string,
    productPriceInFrom: number,
    productPriceInTo: number,
    productPriceOutFrom: number,
    productPriceOutTo: number,
    note: string,
    createdAtFrom: Date,
    createdAtTo: Date
  ) {
    this.productName = productName;
    this.productCode = productCode;
    this.productPriceInFrom = productPriceInFrom;
    this.productPriceInTo = productPriceInTo;
    this.productPriceOutFrom = productPriceOutFrom;
    this.productPriceOutTo = productPriceOutTo;
    this.note = note;
    this.createdAtFrom = createdAtFrom;
    this.createdAtTo = createdAtTo;
  }
}
