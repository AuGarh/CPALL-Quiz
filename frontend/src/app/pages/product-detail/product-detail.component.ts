import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'product-detail',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

    id: string | null | undefined;

    productForm: FormGroup = new FormGroup({
        id: new FormControl(''),
        title: new FormControl('', { nonNullable: true }),
        price: new FormControl('', { nonNullable: true }),
        stock: new FormControl('', { nonNullable: true })
    });


    product: any = {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": "",
        "stock": ""
    };

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');

        this.buildForm();
    }

    buildForm() {
        this.productForm = this.formBuilder.group({
            id: this.product['id'],
            title: [this.product['title'], [Validators.required]],
            price: [this.product['price'], [Validators.required]],
            stock: [this.product['stock'], [Validators.required]],
        });
    }

    save() {
        console.log(this.productForm);

        console.log(this.productForm.value);
    }
}
