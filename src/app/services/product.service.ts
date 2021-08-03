import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../model/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private http: HttpClient
    ) {}

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/products-orders-small.json')
        .toPromise()
        .then(res => <Product[]>res)
        .then(data => data);
    }

}
