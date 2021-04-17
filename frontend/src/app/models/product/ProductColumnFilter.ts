export interface ProductColumnFilter {
  productName: {
    visible: boolean;
    productName?: string;
  };
  productCode: {
    visible: boolean;
    productCode?: string;
  };
  productPriceIn: {
    visible: boolean;
    productPriceInFrom?: number;
    productPriceInTo?: number;
  };
  productPriceOut: {
    visible: boolean;
    productPriceOutFrom?: number;
    productPriceOutTo?: number;
  };
}
