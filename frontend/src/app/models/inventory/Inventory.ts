import { Product } from '../product/Product';
import { BaseEntity } from '../base/BaseEntity';

export class Inventory extends BaseEntity {
  currentQuantity?: number;
}
