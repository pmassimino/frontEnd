import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export interface ICoreService {
	validarNumeroDocumento(tipo:string,numero:number): Observable<boolean>;	
}

@Injectable({
  providedIn: 'root'
})
export class CoreService implements ICoreService {
  base:string;
  constructor(
    protected http: HttpClient,
    protected config: ConfigService
  ) {
    this.base = config.data.apiUrl + '/core/'
  }
  
  validarNumeroDocumento(tipo:string,numero:number): Observable<any>{
    let params = new HttpParams();
    params = params.append('tipo', tipo);
    params = params.append('numero',numero.toString());
    return this.http.get(this.base + 'ValidarNumeroDocumento',{params: params}).pipe(catchError(this.handleError));
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.message}\nMessage: ${error.message}\Descripcion: ${error.error}`;
    }    
    return throwError(error);
  }
}
