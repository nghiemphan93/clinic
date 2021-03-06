import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BasePage } from '../models/base/BasePage';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base/BaseResponse';
import { nameof } from '../models/base/Utils';
import { ProductSearchCriteria } from '../models/product/ProductSearchCriteria';
import { Product } from '../models/product/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = '/api/products';
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:8080/api/products';
    }
  }

  getAll(
    page?: BasePage,
    searchCriteria?: ProductSearchCriteria
  ): Observable<BaseResponse<Product>> {
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
      params = searchCriteria.note
        ? params.append(
            nameof<ProductSearchCriteria>('note'),
            searchCriteria.note
          )
        : params;
      params = searchCriteria.productCode
        ? params.append(
            nameof<ProductSearchCriteria>('productCode'),
            searchCriteria.productCode
          )
        : params;
      params = searchCriteria.productName
        ? params.append(
            nameof<ProductSearchCriteria>('productName'),
            searchCriteria.productName
          )
        : params;
      params = searchCriteria.productPriceInFrom
        ? params.append(
            nameof<ProductSearchCriteria>('productPriceInFrom'),
            searchCriteria.productPriceInFrom.toString()
          )
        : params;
      params = searchCriteria.productPriceInTo
        ? params.append(
            nameof<ProductSearchCriteria>('productPriceInTo'),
            searchCriteria.productPriceInTo.toString()
          )
        : params;
      params = searchCriteria.productPriceOutFrom
        ? params.append(
            nameof<ProductSearchCriteria>('productPriceOutFrom'),
            searchCriteria.productPriceOutFrom.toString()
          )
        : params;
      params = searchCriteria.productPriceOutTo
        ? params.append(
            nameof<ProductSearchCriteria>('productPriceOutTo'),
            searchCriteria.productPriceOutTo.toString()
          )
        : params;

      params = searchCriteria.createdAtFrom
        ? params.append(
            nameof<ProductSearchCriteria>('createdAtFrom'),
            searchCriteria.createdAtFrom.toDateString()
          )
        : params;
      params = searchCriteria.createdAtTo
        ? params.append(
            nameof<ProductSearchCriteria>('createdAtTo'),
            searchCriteria.createdAtTo.toDateString()
          )
        : params;
    }
    return this.http.get<BaseResponse<Product>>(this.baseUrl, {
      params: params,
    });
  }

  getOne(id: number): Observable<Product> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(newUrl);
  }

  create(newEntity: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, newEntity);
  }

  update(id: number, updatedEntity: Product): Observable<Product> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.put<Product>(newUrl, updatedEntity);
  }

  delete(id: number): Observable<Object> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.delete(newUrl);
  }
}
