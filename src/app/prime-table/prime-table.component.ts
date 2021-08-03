import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Order, Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-prime-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss'],
  providers: [ConfirmationService]
})
export class PrimeTableComponent implements OnInit {
  products: Product[] = [];
    allStatus = [
        {
            name: 'PENDING',
            value: 'pending'
        },
        {
            name: 'Returned',
            value: 'returned'
        },
        {
            name: 'CANCELLED',
            value: 'canceled'
        },
        {
            name: 'DELIVERED',
            value: 'delivered'
        }
    ];
    clonedOrders: { [s: string]: any; } = {};
    order2: any[] = [];
    expanded = false;

    constructor(
        private productService: ProductService,
        private confirmationService: ConfirmationService
        ) { }

    ngOnInit() {
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);
    }

    onRowEditInit(product: Product) {
        this.clonedOrders[product['id']] = {...product};
    }

    deleteProduct(order: any, products: any) {
        const orders = products.orders.filter(elm => elm.id !== order.id);
        const allProducts = this.products.map(elm => {
            console.log('elm', elm);
            console.log('products', products);
            if (elm.id === products.id) {
                return { ...elm, orders };
            } else {
                return elm;
            }
        })
        this.products = allProducts;
    }

    onRowEditSave(product: Product) {
        if (product['price'] > 0) {
            delete this.clonedOrders[product['id']];
            console.log('Product is updated');
        }  
        else {
            console.log('Invalid Price');
        }
    }

    onRowEditCancel(product: Product, index: number) {
        this.order2[index] = this.clonedOrders[product['id']];
        delete this.clonedOrders[product['id']];
    }

}
