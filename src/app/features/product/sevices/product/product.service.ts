import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {
  CloudinaryResponse,
  IAddProduct,
  IAllProduct,
  IGetProduct,
  IProduct,
} from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  baseAddProductUrl = environment.apiEndpoint + 'seller/product/addProduct';
  baseGetAllProducts =
    environment.apiEndpoint + 'seller/product/getAllProducts';
  baseUpdateProductUrl =
    environment.apiEndpoint + 'seller/product/updateProduct/';
  baseDeleteProductUrl =
    environment.apiEndpoint + 'seller/product/deleteProduct/';
  baseGetProductByIdUrl =
    environment.apiEndpoint + 'seller/product/getProductById/';
  baseSearchUrl = environment.apiEndpoint + 'seller/product/search';
  baseAvailableProductUrl = environment.apiEndpoint + 'seller/product/updateAvailability/';
  baseUploadImageUrl = environment.apiEndpoint + 'seller/product/uploadProductImage'

  addProduct(productData: IProduct): Observable<IAddProduct> {
    const data = this.http.post<IAddProduct>(this.baseAddProductUrl, {
      ...productData,
    });
    return data;
  }
  getAllProducts(page?: number, limit?: number): Observable<IAllProduct> {
    const data = this.http.get<IAllProduct>(
      `${this.baseGetAllProducts}?page=${page}&limit=${limit}`
    );
    return data;
  }
  searchProduct(query?: string): Observable<IAllProduct> {
    const data = this.http.get<IAllProduct>(
      `${this.baseSearchUrl}?query=${query}`
    );
    return data;
  }
 updateAvailableProduct(_id:string,query?:boolean):Observable<IAddProduct>{
const data =this.http.patch<IAddProduct>(`${this.baseAvailableProductUrl + _id}?availability=${query}`,{})
return data
 }

  updateProduct(_id: string, productData: IProduct): Observable<IAddProduct> {
    console.log('sevice update _id', _id);
    const data = this.http.put<IAddProduct>(this.baseUpdateProductUrl + _id, {
      ...productData,
    });
    return data;
  }
  deleteProduct(_id: string) {
    const data = this.http.delete(this.baseDeleteProductUrl + _id);

    return data;
  }
  getProductById(_id: string): Observable<IGetProduct> {
    const data = this.http.get<IGetProduct>(this.baseGetProductByIdUrl + _id);
    return data;
  }

  uploadImage(image:File):Observable<CloudinaryResponse>{
let formData = new FormData();

formData.append('recfile',image)
 const data = this.http.post<CloudinaryResponse>(this.baseUploadImageUrl,formData)
 return data;
  }
}
