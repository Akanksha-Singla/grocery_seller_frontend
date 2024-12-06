import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin,ILoginResponse,ISeller,IRoleDetails,ISellerRegister,IToken } from '../models/seller';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrlRegister= environment.apiEndpoint+ 'auth/register'
  constructor(private http: HttpClient) { }
baseUrlLogin= environment.apiEndpoint + 'auth/login'

register(
    formData: ISeller
  ): Observable<ISellerRegister> {

    // console.log(admin)
    return this.http.post<ISellerRegister>(this. baseUrlRegister, formData);
  }

  userLogin(loginCredentails:ILogin):Observable<IToken>{
    const data = this.http.post<IToken>(this.baseUrlLogin,loginCredentails)
    console.log(data)
    return data;
    }
}
