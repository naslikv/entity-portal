import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: any)=>{
    console.log("catching error inside interceptor");
    return throwError(()=>error);
  }));
};
