import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BearerAuthInterceptorService {

  constructor(private injector : Injector){}
  intercept(req: HttpRequest<HttpInterceptor>, next: HttpHandler): Observable<HttpEvent<HttpInterceptor>> {
    const authenticationService = this.injector.get(AuthenticationService);

    if(authenticationService) {
      const cloned = req.clone({
         setHeaders:{
           Authorization: `Bearer ${authenticationService.getToken()}`,  
           
         }
      });
      
     return next.handle(cloned);
   }
    else{
      next.handle(req);
    }
 }  
}
