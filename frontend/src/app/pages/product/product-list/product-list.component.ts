import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { BasePage } from '../../../models/base/BasePage';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SortEDirection } from '../../../models/base/SortEDirection';
import { ProductSearchCriteria } from '../../../models/product/ProductSearchCriteria';
import { Product } from '../../../models/product/Product';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductColumnFilter } from '../../../models/product/ProductColumnFilter';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  subscription = new Subscription();
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  loading = true;
  products: Product[] = [];
  searchValue = '';
  currentPage = 1;
  totalPages!: number;
  isLoading = false;
  isMobile!: boolean;

  columnFilter: ProductColumnFilter = {
    productName: {
      visible: false,
    },
    productCode: {
      visible: false,
    },
    productPriceIn: {
      visible: false,
    },
    productPriceOut: {
      visible: false,
    },
  };

  constructor(
    private productService: ProductService,
    private messageService: NzMessageService,
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    this.loadDataFromServer();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadDataFromServer(
    page?: BasePage,
    productSearchCriteria?: ProductSearchCriteria
  ) {
    this.loading = true;
    this.subscription.add(
      this.productService.getAll(page, productSearchCriteria).subscribe(
        (data) => {
          this.total = data.totalElements;
          this.products = data.content;
          this.loading = false;
          this.totalPages = data.totalPages;
          this.currentPage = this.currentPage;
        },
        (e) => {
          this.messageService.error(e.message);
          this.loading = false;
        }
      )
    );
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortBy = (currentSort && currentSort.key) || 'createdAt';
    const sortDirection = (currentSort && currentSort.value) || 'ascend';

    const page: BasePage = {
      pageNumber: pageIndex - 1,
      pageSize: pageSize,
      sortDirection:
        sortDirection === 'ascend' ? SortEDirection.ASC : SortEDirection.DESC,
      sortBy: sortBy,
    };

    const searchCriteria: ProductSearchCriteria = this.getSearchCriteria();

    this.loadDataFromServer(page, searchCriteria);
  }

  private getSearchCriteria(): ProductSearchCriteria {
    const searchCriteria: ProductSearchCriteria = {
      productName: this.columnFilter.productName.productName,
      productCode: this.columnFilter.productName.productName,
      productPriceInFrom: this.columnFilter.productPriceIn.productPriceInFrom,
      productPriceInTo: this.columnFilter.productPriceIn.productPriceInTo,
      productPriceOutFrom:
        this.columnFilter.productPriceOut.productPriceOutFrom,
      productPriceOutTo: this.columnFilter.productPriceOut.productPriceOutTo,
    };
    return searchCriteria;
  }

  reset(): void {
    this.resetAllColumns();
    this.filterColumns();
  }

  private resetAllColumns() {
    this.columnFilter = {
      productName: { visible: false },
      productCode: { visible: false },
      productPriceIn: { visible: false },
      productPriceOut: { visible: false },
    };
  }

  private setAllFiltersMenuInvisible() {
    this.columnFilter.productName.visible = false;
    this.columnFilter.productCode.visible = false;
    this.columnFilter.productPriceIn.visible = false;
    this.columnFilter.productPriceOut.visible = false;
  }

  filterColumns() {
    this.setAllFiltersMenuInvisible();
    this.loadDataFromServer(new BasePage(), this.getSearchCriteria());
  }

  async delete(id: number | undefined) {
    if (id) {
      try {
        this.isLoading = true;
        await this.productService.delete(id).toPromise();
        this.messageService.success('deleted!!!');
        this.products = [
          ...this.products.filter((product: Product) => product.id !== id),
        ];
      } catch (e) {
        this.messageService.error(e.message);
      } finally {
        this.isLoading = false;
      }
    }
  }

  stopPropagation($event: MouseEvent) {
    $event.stopPropagation();
  }

  onChosenPage(currentPage: number) {
    const page: BasePage = {
      pageNumber: currentPage - 1,
      pageSize: this.pageSize,
    };
    this.loadDataFromServer(page);
  }
}
