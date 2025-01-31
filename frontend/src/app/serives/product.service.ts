import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  baseUrl: string = '/api/v1/products';

  getProductList(search?: string): Observable<Product[]> {
    let url = `${this.baseUrl}`;
    if (search)
      url += `?search=${search}`;

    return this._httpClient.get<Product[]>(url);
  }

  getProductDetail(id: number): Observable<Product> {
    return this._httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<void> {
    return this._httpClient.post<void>(this.baseUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this._httpClient.put<void>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
