import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { BasePage } from '../../../models/base/BasePage';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SortEDirection } from '../../../models/base/SortEDirection';
import { ProductSearchCriteria } from '../../../models/product/ProductSearchCriteria';
import { Product } from '../../../models/product/Product';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  visible = false;
  @ViewChild('searchInput') searchInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(
    private productService: ProductService,
    private messageService: NzMessageService
  ) {}

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

    const page = new BasePage();
    page.pageNumber = pageIndex - 1;
    page.pageSize = pageSize;
    page.sortDirection =
      sortDirection === 'ascend' ? SortEDirection.ASC : SortEDirection.DESC;
    page.sortBy = sortBy;

    this.loadDataFromServer(page);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.loadDataFromServer(new BasePage());
  }

  focusOnSearchInput() {
    this.searchInput?.nativeElement.focus();
  }
}
