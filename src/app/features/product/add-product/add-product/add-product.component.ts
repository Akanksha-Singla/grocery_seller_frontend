import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICategory } from '../../models/category';
import { HttpClient } from '@angular/common/http';
import { Route, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../sevices/product/category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductService } from '../../sevices/product/product.service';
import { AddCategoryComponent } from '../../modals/add-category/add-category.component';
import { SnackbarService } from '../../../../auth/services/sanckbar.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule,
    AddCategoryComponent,
    CommonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  productForm: FormGroup;
  categories: ICategory[] = [];
  isModalVisible = false;
  _idUpdate = '';
  uploadImageUrl='';
  selectedFile: File | null = null;

  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.getAllCategories();
    this.isModalVisible = false;
  }
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
    private productService: ProductService,
    private snackbar: SnackbarService,
    public activeRoute: ActivatedRoute,
    private router:Router
  ) {
    const routerParameter = this.activeRoute.snapshot.paramMap.get('_id');
    if (routerParameter != null) {
      // let _id = parseInt(routerParameter)
      console.log('router', routerParameter);
      this._idUpdate = routerParameter;
      this.getProductById(routerParameter);
    }
    this.getAllCategories();

    this.productForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,

        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      quantity: new FormControl(0, [
        Validators.required,
        Validators.min(10),
        Validators.max(1000),
      ]),
      price: new FormControl(0, [
        Validators.required,
        Validators.min(10),
        Validators.max(1000),
      ]),
      availability: new FormControl(true),
      imageUrl:new FormControl(''),
      category: new FormControl('', [Validators.required]),
    });
  }
  ngOnIt() {
    this.getAllCategories();
  }
  // Fetch categories
  getAllCategories() {
    this.categoryService.allCategories().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.categories = response.data;
      },
      error: (err) => {
        this.snackbar.showError('Error in getting categories');
        console.log(err);
      },
    });
  }

  // Get control dynamically
  getControl(controlName: string) {
    return this.productForm.get(controlName);
  }

  // Error message generator
  getErrorMessage(controlName: string): string {
    const control = this.getControl(controlName);
    if (!control || !control.dirty || !control.touched) return '';

    switch (controlName) {
      case 'name':
        if (control.hasError('required')) return 'Product name is required!';
        if (control.hasError('pattern'))
          return 'Only letters, numbers, and special characters . - _ $ @ * ! are allowed.';
        if (control.hasError('minlength'))
          return 'Product name must be at least 3 characters!';
        if (control.hasError('maxlength'))
          return 'Maximum length is 20 characters.';
        break;

      case 'description':
        if (control.hasError('required')) return 'Description is required!';
        if (control.hasError('minlength'))
          return 'Description must be at least 3 characters!';
        if (control.hasError('maxlength'))
          return 'Maximum length for description is 50 characters.';
        break;

      case 'quantity':
        if (control.hasError('required')) return 'Quantity is required!';
        if (control.hasError('min')) return 'Minimum quantity is 10!';
        if (control.hasError('max')) return 'Maximum quantity is 1000!';
        break;

      case 'price':
        if (control.hasError('required')) return 'Price is required!';
        if (control.hasError('min')) return 'Minimum price is 10!';
        if (control.hasError('max')) return 'Maximum price is 1000!';
        break;

      case 'category':
        if (control.hasError('required')) return 'Category is required!';
        break;

      default:
        return '';
    }
    return '';
  }
  onCategoryChange(categoryId: string) {
    console.log('Selected category:', categoryId);
    this.productForm.get('category')?.setValue(categoryId);
  }
  getProductById(_id: string) {
    this.productService.getProductById(_id).subscribe({
      next: (response) => {
        this.productForm.patchValue(response.data);
      },
      error: (error) => console.log(error),
    });
  }
  collectData() {
    console.log('values', this.productForm.value);

    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.activeRoute.snapshot.routeConfig?.path === 'add-product') {
        this.productService.addProduct(product).subscribe({
          next: (responseData) => {
            console.log('response :', responseData);
            this.snackbar.showSuccess('Product added successfully');
            this.router.navigate(['/all-products'])
          },
          error: (error) => {
            console.error(error);
            this.snackbar.showError('Error in adding product');
          },
        });
      } else {
        const _id = this._idUpdate;
        this.productService.updateProduct(_id, product).subscribe({
          next: (responseData) => {
            console.log('response :', responseData);
            this.snackbar.showSuccess('Product updated successfully');
            this.router.navigate(['/all-products'])
          },
          error: (error) => {
            console.error(error);
            this.snackbar.showError('Error in updating product');
          },
        });
      }
    } else {
      this.snackbar.showError('please fill required fields');
      console.log('invalid form');
    }
  }
 
 onFileSelected(event: Event){
      const imageControl=(event.target as HTMLInputElement).files?.[0];
      if(imageControl){
       this.productService.uploadImage(imageControl).subscribe({
         next:(response)=>{
           console.log("image",response);
           const imageUrl = response.image;
           console.log("image url",imageUrl) // Cloudinary image URL
           this.productForm.patchValue({ imageUrl });
         
         },
         error: (error) => {
          console.error('Image upload failed', error);
        },
       })
  }
}
}