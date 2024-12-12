import { Component, ViewChild, HostListener, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../sevices/product/product.service';
import { SnackbarService } from '../../../auth/services/sanckbar.service';
import { Router, RouterModule } from '@angular/router';
import { SearchbarComponent } from '../../../shared/component/searchbar/searchbar.component';
import {
  ReactiveFormsModule,
  FormControl,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-all-products',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    SearchbarComponent,
    FormsModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent {
  private _formBuilder = inject(FormBuilder);

  isChecked?: boolean;

  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  displayedColumns: string[] = [
    'imageUrl',
    'name',
    'category',
    'price',
    'quantity',
    'rating',
    'availability',
    'actions',
  ];
  allProducts: IProduct[] = [];
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private snackbar: SnackbarService
  ) {}
  dataSource = new MatTableDataSource<IProduct>(this.allProducts);
  fontStyle?: string;
  totalItems = 0;
  currentPage = 1;
  isScreenSmall = false;
  filterSellers(searchTerm: any) {
    console.log('emitted', searchTerm);
    this.searchProduct(searchTerm);
  }

  checkScreenSize() {
    if (window.innerWidth < 1158) {
      this.isScreenSmall = true;
    } else {
      this.isScreenSmall = false;
    }
  }
  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  generateStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const totalStars = 5;

    const stars: string[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }

    if (hasHalfStar) {
      stars.push('star_half');
    }

    for (let i = stars.length; i < totalStars; i++) {
      stars.push('star_outline');
    }

    return stars;
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.fetchProduct();
    this.checkScreenSize();
  }
  onPageChange() {
    this.currentPage + 5;
  }
  fetchProduct() {
    const pageNew = this.currentPage;
    this.productService.getAllProducts(pageNew, 100).subscribe({
      next: (response) => {
        console.log('res', response.data);
        this.allProducts = response.data;
        this.dataSource.data = this.allProducts;
      },
      error: (err) => {
        this.snackbar.showError('Error in fetching products');
        console.log(err);
      },
    });
  }

  updateForm(_id: string) {
    console.log('update', _id);
  }
  deleteProduct(_id: string) {
    this.productService.deleteProduct(_id).subscribe({
      next: (response) => {
        console.log(response);
        this.snackbar.showSuccess('Product deleted successfully');
        this.fetchProduct();
      },
      error: (error) => {
        console.log(error);
        this.snackbar.showError('Error in deleting product');
      },
    });
  }

  searchProduct(query: any) {
    console.log('catched', query);
    if (!query) {
      this.fetchProduct();
    }
    this.productService.searchProduct(query).subscribe({
      next: (response) => {
        console.log('searched data', response.data);
        this.allProducts = response.data;
        this.dataSource.data = this.allProducts;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateProductAvailability(_id: string, status: boolean) {
    console.log(_id, status);
    this.productService.updateAvailableProduct(_id, status).subscribe({
      next: (response) => {
        console.log(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
