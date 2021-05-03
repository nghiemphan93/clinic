import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BasePage } from '../models/base/BasePage';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base/BaseResponse';
import { nameof } from '../models/base/Utils';
import { Bill } from '../models/bill/Bill';
import { BillSearchCriteria } from '../models/bill/BillSearchCriteria';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  baseUrl: string = '/api/bills';
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:8080/api/bills';
    }
  }

  getAll(
    page?: BasePage,
    searchCriteria?: BillSearchCriteria
  ): Observable<BaseResponse<Bill>> {
    let params = new HttpParams();
    if (page) {
      params = page.pageSize
        ? params.append(nameof<BasePage>('pageSize'), page.pageSize.toString())
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
      params = searchCriteria.billStatus
        ? params.append(
            nameof<BillSearchCriteria>('billStatus'),
            searchCriteria.billStatus
          )
        : params;
      params = searchCriteria.billType
        ? params.append(
            nameof<BillSearchCriteria>('billType'),
            searchCriteria.billType
          )
        : params;
      params = searchCriteria.billTotalPriceFrom
        ? params.append(
            nameof<BillSearchCriteria>('billTotalPriceFrom'),
            searchCriteria.billTotalPriceFrom.toString()
          )
        : params;
      params = searchCriteria.billTotalPriceTo
        ? params.append(
            nameof<BillSearchCriteria>('billTotalPriceTo'),
            searchCriteria.billTotalPriceTo.toString()
          )
        : params;
      params = searchCriteria.orderId
        ? params.append(
            nameof<BillSearchCriteria>('orderId'),
            searchCriteria.orderId.toString()
          )
        : params;
      params = searchCriteria.createdAtFrom
        ? params.append(
            nameof<BillSearchCriteria>('createdAtFrom'),
            searchCriteria.createdAtFrom.toDateString()
          )
        : params;
      params = searchCriteria.createdAtTo
        ? params.append(
            nameof<BillSearchCriteria>('createdAtTo'),
            searchCriteria.createdAtTo.toDateString()
          )
        : params;
    }
    return this.http.get<BaseResponse<Bill>>(this.baseUrl, {
      params: params,
    });
  }

  getOne(id: number): Observable<Bill> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Bill>(newUrl);
  }

  create(newEntity: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.baseUrl, newEntity);
  }

  update(id: number, updatedEntity: Bill): Observable<Bill> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.put<Bill>(newUrl, updatedEntity);
  }

  delete(id: number): Observable<Object> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.delete(newUrl);
  }
}
