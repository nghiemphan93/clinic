import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report/Report';
import { ReportSearchCriteria } from '../models/report/ReportSearchCriteria';
import { nameof } from '../models/base/Utils';
import { BasePage } from '../models/base/BasePage';
import { BaseResponse } from '../models/base/BaseResponse';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseUrl: string = 'http://localhost:8080/api/reports';
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:8080/api/reports';
    }
  }

  getAll(
    page?: BasePage,
    searchCriteria?: ReportSearchCriteria
  ): Observable<BaseResponse<Report>> {
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
      params = searchCriteria.reportPeriod
        ? params.append(
            nameof<ReportSearchCriteria>('reportPeriod'),
            searchCriteria.reportPeriod
          )
        : params;
      params = searchCriteria.createdAtFrom
        ? params.append(
            nameof<ReportSearchCriteria>('createdAtFrom'),
            searchCriteria.createdAtFrom.toDateString()
          )
        : params;
      params = searchCriteria.createdAtTo
        ? params.append(
            nameof<ReportSearchCriteria>('createdAtTo'),
            searchCriteria.createdAtTo.toDateString()
          )
        : params;
    }
    return this.http.get<BaseResponse<Report>>(this.baseUrl, {
      params: params,
    });
  }

  getOne(id: number): Observable<Report> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Report>(newUrl);
  }

  create(newEntity: Report): Observable<Report> {
    return this.http.post<Report>(this.baseUrl, newEntity);
  }

  update(id: number, updatedEntity: Report): Observable<Report> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.put<Report>(newUrl, updatedEntity);
  }

  delete(id: number): Observable<Object> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.delete(newUrl);
  }
}
