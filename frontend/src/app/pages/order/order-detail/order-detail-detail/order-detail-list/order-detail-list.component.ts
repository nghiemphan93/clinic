import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { initColumnFilter } from '../../../../../models/order/OrderColumnFilter';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BasePage } from '../../../../../models/base/BasePage';
import { OrderSearchCriteria } from '../../../../../models/order/OrderSearchCriteria';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SortEDirection } from '../../../../../models/base/SortEDirection';
import { OrderDetail } from '../../../../../models/orderdetail/OrderDetail';
import { OrderDetailService } from '../../../../../services/order-detail.service';
import { ActivatedRoute } from '@angular/router';
import {
  initOrderDetailColumnFilter,
  OrderDetailColumnFilter,
} from '../../../../../models/orderdetail/OrderDetailColumnFilter';
import { OrderDetailSearchCriteria } from '../../../../../models/orderdetail/OrderDetailSearchCriteria';
import { OrderService } from '../../../../../services/order.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-detail-list.component.html',
  styleUrls: ['./order-detail-list.component.scss'],
})
export class OrderDetailListComponent implements OnInit {
  subscription = new Subscription();
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  loading = true;
  orderDetails: OrderDetail[] = [];
  orderId!: number;
  isLoading = false;
  currentPage = 1;
  totalPages!: number;
  isMobile!: boolean;

  columnFilter: OrderDetailColumnFilter = JSON.parse(
    JSON.stringify(initOrderDetailColumnFilter)
  );

  constructor(
    private orderDetailService: OrderDetailService,
    private messageService: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.params.orderId;
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
      this.orderDetailService
        .getAll(this.orderId, page, searchCriteria)
        .subscribe(
          (data) => {
            this.total = data.totalElements;
            this.orderDetails = data.content;
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

    const searchCriteria: OrderDetailSearchCriteria = this.getSearchCriteria();
    this.loadDataFromServer(page, searchCriteria);
  }

  private getSearchCriteria(): OrderDetailSearchCriteria {
    const searchCriteria: OrderDetailSearchCriteria = {
      orderId: this.orderId,
      productId: this.columnFilter.productId.productId,
      createdAtFrom: this.columnFilter.createdAt.createdAtFrom,
      createdAtTo: this.columnFilter.createdAt.createdAtTo,
      quantityFrom: this.columnFilter.quantity.quantityFrom,
      quantityTo: this.columnFilter.quantity.quantityTo,
      totalPricePerProductFrom:
        this.columnFilter.totalPricePerProduct.totalPricePerProductFrom,
      totalPricePerProductTo:
        this.columnFilter.totalPricePerProduct.totalPricePerProductTo,
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
    this.columnFilter.totalPricePerProduct.visible = false;
    this.columnFilter.productId.visible = false;
    this.columnFilter.quantity.visible = false;
    this.columnFilter.createdAt.visible = false;
  }

  filterColumns() {
    this.setAllFiltersMenuInvisible();
    this.loadDataFromServer(new BasePage(), this.getSearchCriteria());
  }

  async downloadPdf() {
    this.isLoading = true;
    try {
      const result: Blob = await this.orderService
        .getOnePdf(this.orderId)
        .toPromise();
      const fileUrl = URL.createObjectURL(result);
      window.open(fileUrl);
      this.messageService.success('order downloaded successfully!!!');
    } catch (e) {
      this.messageService.error(e.message);
    } finally {
      this.isLoading = false;
    }
  }

  async delete(id: number | undefined) {
    if (id) {
      try {
        this.isLoading = true;
        await this.orderDetailService.delete(id, this.orderId).toPromise();
        this.messageService.success('deleted!!!');
        this.orderDetails = [
          ...this.orderDetails.filter((orderDetail) => orderDetail.id !== id),
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
