import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../../models/product.model';
import { ProductService } from '../../serives/product.service';

@Component({
    selector: 'product-detail',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        InputTextModule
    ],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

    id: string | null | undefined;

    productForm: FormGroup = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', { nonNullable: true }),
        price: new FormControl('', { nonNullable: true }),
        stock: new FormControl('', { nonNullable: true })
    });


    product: Product = {
        id: null,
        name: '',
        price: null,
        stock: null
    }

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id)
            this.getProductDetail(Number(this.id));

        this.buildForm();
    }

    buildForm() {
        this.productForm = this.formBuilder.group({
            id: this.product['id'],
            name: [this.product['name'], [Validators.required]],
            price: [this.product['price'], [Validators.required]],
            stock: [this.product['stock'], [Validators.required]],
        });
    }

    getProductDetail(id: number) {
        this.productService.getProductDetail(id).subscribe(
            (res: Product) => {
                this.product = res;
            }
        );
    }

    save() {
        console.log(this.productForm);

        console.log(this.productForm.value);
    }
}
