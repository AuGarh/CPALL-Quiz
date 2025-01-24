import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../../models/product.model';
import { ProductService } from '../../serives/product.service';
import Swal from 'sweetalert2';

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

    id: number | null = null;

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
        private productService: ProductService,
        private router: Router
    ) { }

    ngOnInit() {
        const idParam = this.route.snapshot.paramMap.get('id');
        this.id = idParam !== null ? Number(idParam) : null;
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
        if (this.id) {
            this.productService.updateProduct(this.id, this.productForm.value).subscribe(
                () => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product updated successfully',
                        icon: 'success',
                    })
                        .then(() => {
                            this.router.navigate(['/']);
                        });
                }
            );
        } else {
            this.productService.createProduct(this.productForm.value).subscribe(
                () => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product created successfully',
                        icon: 'success',
                    })
                        .then(() => {
                            this.router.navigate(['/']);
                        });
                }
            );
        }
    }
}
