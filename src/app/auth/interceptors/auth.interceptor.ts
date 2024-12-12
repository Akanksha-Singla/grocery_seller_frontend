import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  console.log("intercepoter middle",token)
  if(token){
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(clonedRequest);
    return next(clonedRequest)
  }else{
    return next(req);
  }
 
};
