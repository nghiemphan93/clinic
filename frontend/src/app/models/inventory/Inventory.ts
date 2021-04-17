import { Product } from '../product/Product';
import { BaseEntity } from '../base/BaseEntity';

export class Inventory extends BaseEntity {
  currentQuantity: number;
  product: Product;

  constructor(currentQuantity: number, product: Product) {
    super();
    this.currentQuantity = currentQuantity;
    this.product = product;
  }
}
