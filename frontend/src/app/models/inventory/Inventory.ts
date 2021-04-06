import { Product } from '../product/Product';
import { BaseEntity } from '../base/BaseEntity';

export class Inventory extends BaseEntity {
  currentQuantity: number;
  product: Product;

  constructor(
    id: number,
    createdAt: Date,
    currentQuantity: number,
    product: Product
  ) {
    super(id, createdAt);
    this.currentQuantity = currentQuantity;
    this.product = product;
  }
}
