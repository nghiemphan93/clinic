import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BasePage } from '../models/base/BasePage';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base/BaseResponse';
import { nameof } from '../models/base/Utils';
import { OrderSearchCriteria } from '../models/order/OrderSearchCriteria';
import { Order } from '../models/order/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = '';
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:8080/api/orders';
    }
  }

  getAll(
    page?: BasePage,
    searchCriteria?: OrderSearchCriteria
  ): Observable<BaseResponse<Order>> {
    let params = new HttpParams();
    if (page) {
      page.pageSize
        ? (params = params.append(
            nameof<BasePage>('pageSize'),
            page.pageSize.toString()
          ))
        : params;
      params = page.pageNumber
        ? params.append(
            nameof<BasePage>('pageNumber'),
            page.pageNumber.toString()
          )
        : params;
      params = page.sortBy
        ? params.append(nameof<BasePage>('sortBy'), page.sortBy)
        : params;
      params = page.sortDirection
        ? params.append(nameof<BasePage>('sortDirection'), page.sortDirection)
        : params;
    }

    if (searchCriteria) {
      if (searchCriteria.orderStatuses) {
        searchCriteria.orderStatuses.forEach((orderStatus) => {
          params = params.append(
            nameof<OrderSearchCriteria>('orderStatuses'),
            orderStatus
          );
        });
      }
      if (searchCriteria.orderTypes) {
        searchCriteria.orderTypes.forEach((orderType) => {
          params = params.append(
            nameof<OrderSearchCriteria>('orderTypes'),
            orderType
          );
        });
      }
      params = searchCriteria.orderTotalPriceFrom
        ? params.append(
            nameof<OrderSearchCriteria>('orderTotalPriceFrom'),
            searchCriteria.orderTotalPriceFrom.toString()
          )
        : params;
      params = searchCriteria.orderTotalPriceTo
        ? params.append(
            nameof<OrderSearchCriteria>('orderTotalPriceTo'),
            searchCriteria.orderTotalPriceTo.toString()
          )
        : params;
      params = searchCriteria.createdAtFrom
        ? params.append(
            nameof<OrderSearchCriteria>('createdAtFrom'),
            searchCriteria.createdAtFrom.toDateString()
          )
        : params;
      params = searchCriteria.createdAtTo
        ? params.append(
            nameof<OrderSearchCriteria>('createdAtTo'),
            searchCriteria.createdAtTo.toDateString()
          )
        : params;
    }
    return this.http.get<BaseResponse<Order>>(this.baseUrl, {
      params: params,
    });
  }

  getOne(id: number): Observable<Order> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Order>(newUrl);
  }

  create(newEntity: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, newEntity);
  }

  update(id: number, updatedEntity: Order): Observable<Order> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.put<Order>(newUrl, updatedEntity);
  }

  delete(id: number): void {
    const newUrl = `${this.baseUrl}/${id}`;
    this.http.delete(newUrl);
  }
}
