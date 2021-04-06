import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory/Inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  baseUrl: string = '';
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = 'http://localhost:8080/api/products';
    }
  }

  getOne(id: number): Observable<Inventory> {
    const newUrl = `${this.baseUrl}/${id}/inventories`;
    return this.http.get<Inventory>(newUrl);
  }

  create(id: number, newEntity: Inventory): Observable<Inventory> {
    const newUrl = `${this.baseUrl}/${id}/inventories`;
    return this.http.post<Inventory>(this.baseUrl, newEntity);
  }

  update(id: number, updatedEntity: Inventory): Observable<Inventory> {
    const newUrl = `${this.baseUrl}/${id}/inventories`;
    return this.http.put<Inventory>(newUrl, updatedEntity);
  }

  delete(id: number): void {
    const newUrl = `${this.baseUrl}/${id}/inventories`;
    this.http.delete(newUrl);
  }
}
