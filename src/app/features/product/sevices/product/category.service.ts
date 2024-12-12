import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

import { IAllCategory,IAddCategory, ICategory } from '../../models/category';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  baseUrlCategory = environment.apiEndpoint + 'seller/category/getAllCategories';
  baseAddCategoryUrl = environment.apiEndpoint +'seller/category/addCategory'

  allCategories():Observable<IAllCategory>{
    const data = this.http.get<IAllCategory>(this.baseUrlCategory)
    return data
  }
  addCategory(categoryData:ICategory):Observable<IAddCategory>
{
return this.http.post<IAddCategory>(this.baseAddCategoryUrl,{...categoryData})
}
}
