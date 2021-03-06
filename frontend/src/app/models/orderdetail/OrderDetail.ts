import { BaseEntity } from '../base/BaseEntity';
import { Product } from '../product/Product';
import { Order } from '../order/Order';

export class OrderDetail extends BaseEntity {
  quantity?: number;
  price?: number;
  totalPricePerProduct?: number;
  product?: Product;
  order?: Order;
  orderId?: number;
}
