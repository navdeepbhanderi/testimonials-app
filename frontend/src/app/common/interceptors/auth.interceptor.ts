import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // const jwt = '';

  // req.clone({
  //   headers: req.headers.append('Bearer', jwt)
  // })
  return next(req);
};
