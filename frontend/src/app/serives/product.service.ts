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
}
