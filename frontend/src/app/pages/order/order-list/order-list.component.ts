import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BasePage } from '../../../models/base/BasePage';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SortEDirection } from '../../../models/base/SortEDirection';
import { OrderService } from '../../../services/order.service';
import { OrderSearchCriteria } from '../../../models/order/OrderSearchCriteria';
import { Order } from '../../../models/order/Order';
import {
  initColumnFilter,
  OrderColumnFilter,
} from '../../../models/order/OrderColumnFilter';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  subscription = new Subscription();
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  loading = true;
  orders: Order[] = [];
  isMobile!: boolean;
  isLoading = false;
  currentPage = 1;
  totalPages!: number;

  columnFilter: OrderColumnFilter = JSON.parse(
    JSON.stringify(initColumnFilter)
  );

  constructor(
    private orderService: OrderService,
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

  loadDataFromServer(page?: BasePage, searchCriteria?: OrderSearchCriteria) {
    this.loading = true;
    this.subscription.add(
      this.orderService.getAll(page, searchCriteria).subscribe(
        (data) => {
          this.total = data.totalElements;
          this.orders = data.content;
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

    const searchCriteria: OrderSearchCriteria = this.getSearchCriteria();
    this.loadDataFromServer(page, searchCriteria);
  }

  private getSearchCriteria(): OrderSearchCriteria {
    const searchCriteria: OrderSearchCriteria = {
      orderTypes: this.columnFilter.orderType.orderTypes
        .filter((orderType) => orderType.checked === true)
        .map((orderType) => orderType.value),
      orderStatuses: this.columnFilter.orderStatus.orderStatuses
        .filter((orderStatus) => orderStatus.checked === true)
        .map((orderStatus) => orderStatus.value),
      orderTotalPriceFrom:
        this.columnFilter.orderTotalPrice.orderTotalPriceFrom,
      orderTotalPriceTo: this.columnFilter.orderTotalPrice.orderTotalPriceTo,
      createdAtFrom: this.columnFilter.createdAt.createdAtFrom,
      createdAtTo: this.columnFilter.createdAt.createdAtTo,
    };
    return searchCriteria;
  }

  reset(): void {
    this.resetAllColumns();
    this.filterColumns();
  }

  private resetAllColumns() {
    this.columnFilter = JSON.parse(JSON.stringify(initColumnFilter));
  }

  private setAllFiltersMenuInvisible() {
    this.columnFilter.orderType.visible = false;
    this.columnFilter.orderStatus.visible = false;
    this.columnFilter.orderTotalPrice.visible = false;
    this.columnFilter.createdAt.visible = false;
  }

  filterColumns() {
    this.setAllFiltersMenuInvisible();
    this.loadDataFromServer(new BasePage(), this.getSearchCriteria());
  }

  async downloadPdf($event: MouseEvent, orderId: number | undefined) {
    $event.stopPropagation();
    try {
      const result: Blob = await this.orderService
        .getOnePdf(orderId!)
        .toPromise();
      const fileUrl = URL.createObjectURL(result);
      window.open(fileUrl);
      this.messageService.success('order downloaded successfully!!!');
    } catch (e) {
      this.messageService.error(e.message);
    }
  }

  async delete(id: number | undefined) {
    if (id) {
      try {
        this.isLoading = true;
        await this.orderService.delete(id).toPromise();
        this.messageService.success('deleted!!!');
        this.orders = [...this.orders.filter((order) => order.id !== id)];
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
