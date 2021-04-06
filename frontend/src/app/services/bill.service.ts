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
  baseUrl: string = '';
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
        nameof<BillSearchCriteria>('billStatus'),
        searchCriteria.billStatus
      );
      params = params.append(
        nameof<BillSearchCriteria>('billType'),
        searchCriteria.billType
      );
      params = params.append(
        nameof<BillSearchCriteria>('billTotalPriceFrom'),
        searchCriteria.billTotalPriceFrom.toString()
      );
      params = params.append(
        nameof<BillSearchCriteria>('billTotalPriceTo'),
        searchCriteria.billTotalPriceTo.toString()
      );
      params = params.append(
        nameof<BillSearchCriteria>('orderId'),
        searchCriteria.orderId.toString()
      );
      params = params.append(
        nameof<BillSearchCriteria>('createdAtFrom'),
        searchCriteria.createdAtFrom.toDateString()
      );
      params = params.append(
        nameof<BillSearchCriteria>('createdAtTo'),
        searchCriteria.createdAtTo.toDateString()
      );
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

  delete(id: number): void {
    const newUrl = `${this.baseUrl}/${id}`;
    this.http.delete(newUrl);
  }
}
