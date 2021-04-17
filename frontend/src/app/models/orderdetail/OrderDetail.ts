import { BaseEntity } from '../base/BaseEntity';
import { Product } from '../product/Product';
import { Order } from '../order/Order';

export class OrderDetail extends BaseEntity {
  quantity: number;
  totalPricePerProduct: number;
  product: Product;
  order: Order;

  constructor(
    quantity: number,
    totalPricePerProduct: number,
    product: Product,
    order: Order
  ) {
    super();
    this.quantity = quantity;
    this.totalPricePerProduct = totalPricePerProduct;
    this.product = product;
    this.order = order;
  }
}
