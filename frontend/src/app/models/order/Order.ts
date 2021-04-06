import { BaseEntity } from '../base/BaseEntity';
import { EOrderType } from './EOrderType';
import { EOrderStatus } from './EOrderStatus';

export class Order extends BaseEntity {
  orderType: EOrderType;
  orderStatus: EOrderStatus;
  orderTotalPrice: number;

  constructor(
    id: number,
    createdAt: Date,
    orderType: EOrderType,
    orderStatus: EOrderStatus,
    orderTotalPrice: number
  ) {
    super(id, createdAt);
    this.orderType = orderType;
    this.orderStatus = orderStatus;
    this.orderTotalPrice = orderTotalPrice;
  }
}
