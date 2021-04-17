import { BaseEntity } from '../base/BaseEntity';
import { EOrderType } from './EOrderType';
import { EOrderStatus } from './EOrderStatus';

export class Order extends BaseEntity {
  orderType: EOrderType;
  orderStatus: EOrderStatus;
  orderTotalPrice: number;

  constructor(
    orderType: EOrderType,
    orderStatus: EOrderStatus,
    orderTotalPrice: number
  ) {
    super();
    this.orderType = orderType;
    this.orderStatus = orderStatus;
    this.orderTotalPrice = orderTotalPrice;
  }
}
