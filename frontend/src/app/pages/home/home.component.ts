import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Product } from '../../models/product.model';
import { ProductService } from '../../serives/product.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'home',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TableModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    products: Product[] | undefined;

    currentView: string = "grid";

    searchTerm: string = '';

    get isDetailedView(): boolean {
        return this.currentView === "list";
    }

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.getProducts();
    }

    getProducts(search?: string) {
        this.productService.getProductList(search).subscribe(
            (res: Product[]) => {
                this.products = res;
            }
        );
    }

    searchProduct() {
        this.getProducts(this.searchTerm);
    }

    deleteProduct(id: number) {
        console.log(id);

    }
}
