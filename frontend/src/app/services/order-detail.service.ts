import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BasePage } from '../models/base/BasePage';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base/BaseResponse';
import { nameof } from '../models/base/Utils';
import { OrderDetailSearchCriteria } from '../models/orderdetail/OrderDetailSearchCriteria';
import { OrderDetail } from '../models/orderdetail/OrderDetail';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  baseUrl: string = '';
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:8080/api/orders';
    }
  }

  getAll(
    orderId: number,
    page?: BasePage,
    searchCriteria?: OrderDetailSearchCriteria
  ): Observable<BaseResponse<OrderDetail>> {
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
      params = searchCriteria.orderId
        ? params.append(
            nameof<OrderDetailSearchCriteria>('orderId'),
            searchCriteria.orderId.toString()
          )
        : params;
      params = searchCriteria.productId
        ? params.append(
            nameof<OrderDetailSearchCriteria>('productId'),
            searchCriteria.productId.toString()
          )
        : params;
      params = searchCriteria.quantityFrom
        ? params.append(
            nameof<OrderDetailSearchCriteria>('quantityFrom'),
            searchCriteria.quantityFrom.toString()
          )
        : params;
      params = searchCriteria.quantityTo
        ? params.append(
            nameof<OrderDetailSearchCriteria>('quantityTo'),
            searchCriteria.quantityTo.toString()
          )
        : params;
      params = searchCriteria.totalPricePerProductFrom
        ? params.append(
            nameof<OrderDetailSearchCriteria>('totalPricePerProductFrom'),
            searchCriteria.totalPricePerProductFrom.toString()
          )
        : params;
      params = searchCriteria.totalPricePerProductTo
        ? params.append(
            nameof<OrderDetailSearchCriteria>('totalPricePerProductTo'),
            searchCriteria.totalPricePerProductTo.toString()
          )
        : params;
      params = searchCriteria.createdAtFrom
        ? params.append(
            nameof<OrderDetailSearchCriteria>('createdAtFrom'),
            searchCriteria.createdAtFrom.toDateString()
          )
        : params;
      params = searchCriteria.createdAtTo
        ? params.append(
            nameof<OrderDetailSearchCriteria>('createdAtTo'),
            searchCriteria.createdAtTo.toDateString()
          )
        : params;
    }
    const newUrl = `${this.baseUrl}/${orderId}/orderDetails`;
    return this.http.get<BaseResponse<OrderDetail>>(newUrl, {
      params: params,
    });
  }

  getOne(id: number, orderId: number): Observable<OrderDetail> {
    const newUrl = `${this.baseUrl}/${orderId}/orderDetails/${id}`;
    return this.http.get<OrderDetail>(newUrl);
  }

  create(newEntity: OrderDetail, orderId: number): Observable<OrderDetail> {
    const newUrl = `${this.baseUrl}/${orderId}/orderDetails`;
    return this.http.post<OrderDetail>(newUrl, newEntity);
  }

  update(
    id: number,
    updatedEntity: OrderDetail,
    orderId: number
  ): Observable<OrderDetail> {
    const newUrl = `${this.baseUrl}/${orderId}/orderDetails/${id}`;
    return this.http.put<OrderDetail>(newUrl, updatedEntity);
  }

  delete(id: number, orderId: number): void {
    const newUrl = `${this.baseUrl}/${orderId}/orderDetails/${id}`;
    this.http.delete(newUrl);
  }
}
