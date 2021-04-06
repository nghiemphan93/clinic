import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BasePage } from '../models/base/BasePage';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base/BaseResponse';
import { nameof } from '../models/base/Utils';
import { UserSearchCriteria } from '../models/user/UserSearchCriteria';
import { User } from '../models/user/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = '';
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:8080/api/users';
    }
  }

  getAll(
    page?: BasePage,
    searchCriteria?: UserSearchCriteria
  ): Observable<BaseResponse<User>> {
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
        nameof<UserSearchCriteria>('email'),
        searchCriteria.email
      );
      params = params.append(
        nameof<UserSearchCriteria>('username'),
        searchCriteria.username
      );
    }
    return this.http.get<BaseResponse<User>>(this.baseUrl, {
      params: params,
    });
  }

  getOne(id: number): Observable<User> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.get<User>(newUrl);
  }

  create(newEntity: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, newEntity);
  }

  update(id: number, updatedEntity: User): Observable<User> {
    const newUrl = `${this.baseUrl}/${id}`;
    return this.http.put<User>(newUrl, updatedEntity);
  }

  delete(id: number): void {
    const newUrl = `${this.baseUrl}/${id}`;
    this.http.delete(newUrl);
  }
}
