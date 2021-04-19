import { EOrderType } from './EOrderType';
import { EOrderStatus } from './EOrderStatus';

export interface OrderColumnFilter {
  orderType: {
    visible: boolean;
    orderTypes: { text: string; value: EOrderType; checked: boolean }[];
  };
  orderStatus: {
    visible: boolean;
    orderStatuses: { text: string; value: EOrderStatus; checked: boolean }[];
  };
  orderTotalPrice: {
    visible: boolean;
    orderTotalPriceFrom?: number;
    orderTotalPriceTo?: number;
  };
  createdAt: {
    visible: boolean;
    createdAtFrom?: Date;
    createdAtTo?: Date;
  };
}

export const initColumnFilter: OrderColumnFilter = {
  orderType: {
    visible: false,
    orderTypes: [
      {
        text: EOrderType.SELL,
        value: EOrderType.SELL,
        checked: false,
      },
      {
        text: EOrderType.BUY,
        value: EOrderType.BUY,
        checked: false,
      },
    ],
  },
  orderStatus: {
    visible: false,
    orderStatuses: [
      {
        text: EOrderStatus.PENDING,
        value: EOrderStatus.PENDING,
        checked: false,
      },
      {
        text: EOrderStatus.PAID,
        value: EOrderStatus.PAID,
        checked: false,
      },
    ],
  },
  orderTotalPrice: {
    visible: false,
  },
  createdAt: {
    visible: false,
  },
};
