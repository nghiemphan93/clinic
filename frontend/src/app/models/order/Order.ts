import { BaseEntity } from '../base/BaseEntity';
import { EOrderType } from './EOrderType';
import { EOrderStatus } from './EOrderStatus';

export class Order extends BaseEntity {
  orderType?: EOrderType;
  orderStatus?: EOrderStatus;
  orderTotalPrice?: number;
}
