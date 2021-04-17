import { BaseEntity } from '../base/BaseEntity';

export class Product extends BaseEntity {
  productName: string;
  productCode: string;
  productPriceIn: number;
  productPriceOut: number;
  note: string;

  constructor(
    productName: string,
    productCode: string,
    productPriceIn: number,
    productPriceOut: number,
    note: string
  ) {
    super();
    this.productName = productName;
    this.productCode = productCode;
    this.productPriceIn = productPriceIn;
    this.productPriceOut = productPriceOut;
    this.note = note;
  }
}
