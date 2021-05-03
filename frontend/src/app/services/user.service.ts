import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BasePage } from '../models/base/BasePage';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base/BaseResponse';
import { nameof } from '../models/base/Utils';
import { UserSearchCriteria } from '../models/user/UserSearchCriteria';
import { User } from '../models/user/User';
import { Role } from '../models/user/Role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = '/api/users';
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
      params = searchCriteria.email
        ? params.append(
            nameof<UserSearchCriteria>('email'),
            searchCriteria.email
          )
        : params;
      params = searchCriteria.username
        ? params.append(
            nameof<UserSearchCriteria>('username'),
            searchCriteria.username
          )
        : params;
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

  delete(id: number): Observable<Object> {
    const newUrl = `${this.baseUrl}/${id}`;
    console.log(newUrl);
    return this.http.delete(newUrl);
  }

  getAllRoles(): Observable<Role[]> {
    const newUrl = `${this.baseUrl}/roles`;
    return this.http.get<Role[]>(newUrl);
  }
}
