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
      this.baseUrl = 'http://localhost:8080/api/orderDetails';
    }
  }

  getAll(
    page?: BasePage,
    searchCriteria?: OrderDetailSearchCriteria
  ): Observable<BaseResponse<OrderDetail>> {
    let params = new HttpParams();
    if (page) {
      params = params.append(
        nameof<BasePage>('pageSize'),
        page.pageSize.toString()
      );
      params = params.append(
        nameof<BasePage>('pageNumber'),
        page.pageNumber.toString()
      );
      params = params.append(nameof<BasePage>('sortBy'), page.sortBy);
      params = params.append(
        nameof<BasePage>('sortDirection'),
        page.sortDirection
      );
    }

    if (searchCriteria) {
      params = params.append(
        nameof<OrderDetailSearchCriteria>('orderId'),
        searchCriteria.orderId.toString()
      );
      params = params.append(
        nameof<OrderDetailSearchCriteria>('productId'),
        searchCriteria.productId.toString()
      );
      params = params.append(
        nameof<OrderDetailSearchCriteria>('quantityFrom'),
        searchCriteria.quantityFrom.toString()
      );
      params = params.append(
        nameof<OrderDetailSearchCriteria>('quantityTo'),
        searchCriteria.quantityTo.toString()
      );
      params = params.append(
        nameof<OrderDetailSearchCriteria>('totalPricePerProductFrom'),
        searchCriteria.totalPricePerProductFrom.toString()
      );
      params = params.append(
        nameof<OrderDetailSearchCriteria>('totalPricePerProductTo'),
        searchCriteria.totalPricePerProductTo.toString()
      );
      params = params.append(
        nameof<OrderDetailSearchCriteria>('createdAtFrom'),
        searchCriteria.createdAtFrom.toDateString()
      );
      params = params.append(
        nameof<OrderDetailSearchCriteria>('createdAtTo'),
        searchCriteria.createdAtTo.toDateString()
      );
    }
    return this.http.get<BaseResponse<OrderDetail>>(this.baseUrl, {
      params: params,
    });
  }

  getOne(id: number): Observable<OrderDetail> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.get<OrderDetail>(newUrl);
  }

  create(newEntity: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.baseUrl, newEntity);
  }

  update(id: number, updatedEntity: OrderDetail): Observable<OrderDetail> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.put<OrderDetail>(newUrl, updatedEntity);
  }

  delete(id: number): void {
    const newUrl = `${this.baseUrl}/${id}`;
    this.http.delete(newUrl);
  }
}
