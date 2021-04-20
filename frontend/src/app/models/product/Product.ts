import { BaseEntity } from '../base/BaseEntity';
import { Inventory } from '../inventory/Inventory';

export class Product extends BaseEntity {
  productName!: string;
  productCode?: string;
  productPriceIn?: number;
  productPriceOut?: number;
  note?: string;
  inventory?: Inventory;
}
