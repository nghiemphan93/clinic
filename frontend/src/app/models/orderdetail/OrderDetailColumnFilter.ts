export interface OrderDetailColumnFilter {
  orderId: {
    visible: boolean;
    orderId?: number;
  };
  productId: {
    visible: boolean;
    productId?: number;
  };
  totalPricePerProduct: {
    visible: boolean;
    totalPricePerProductFrom?: number;
    totalPricePerProductTo?: number;
  };
  quantity: {
    visible: boolean;
    quantityFrom?: number;
    quantityTo?: number;
  };
  createdAt: {
    visible: boolean;
    createdAtFrom?: Date;
    createdAtTo?: Date;
  };
}

export const initOrderDetailColumnFilter: OrderDetailColumnFilter = {
  orderId: {
    visible: false,
  },
  productId: {
    visible: false,
  },
  totalPricePerProduct: {
    visible: false,
  },
  quantity: {
    visible: false,
  },
  createdAt: {
    visible: false,
  },
};
