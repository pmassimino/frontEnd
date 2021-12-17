import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem('access_token');
    const idEmpresa: string = localStorage.getItem('idEmpresaSelected');
    const idArea: string = localStorage.getItem('idAreaSelected');
    const idSeccion: string = localStorage.getItem('idSeccionSelected');

    let request = req;
    //request = req.clone({ headers: req.headers.set("Content-Type","application/json")});
   
    if (token) {   
     request = req.clone({ headers: req.headers.set("Authorization", 'Bearer '+ token)});     
    }
    if (idEmpresa)
    {
      request = req.clone({ headers: request.headers.set('IdEmpresa', idEmpresa) });
    }
    if (idArea)
    {
      request = req.clone({ headers: request.headers.set('idArea', idArea) });
    }
    if (idSeccion)
    {
      request = req.clone({ headers: request.headers.set('idSeccion', idSeccion) });
    }
    

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${err.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${err.status}\nMessage: ${err.error}`;
        }
        //window.alert(errorMessage);        
        //return throwError(errorMessage);
        return throwError( err );

      })
    );
  }

}