import { BaseEntity } from '../base/BaseEntity';
import { EOrderType } from '../order/EOrderType';
import { EOrderStatus } from '../order/EOrderStatus';
import { Order } from '../order/Order';

export class Bill extends BaseEntity {
  billType: EOrderType;
  billStatus: EOrderStatus;
  billTotalPrice: number;

  order: Order;

  constructor(
    billType: EOrderType,
    billStatus: EOrderStatus,
    billTotalPrice: number,
    order: Order
  ) {
    super();
    this.billType = billType;
    this.billStatus = billStatus;
    this.billTotalPrice = billTotalPrice;
    this.order = order;
  }
}
