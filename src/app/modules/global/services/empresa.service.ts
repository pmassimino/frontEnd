import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { Empresa } from '../models/models/model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends CrudService<Empresa, string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/global/empresa/');
  }
  select(id:string): void
  {
    localStorage.setItem('empresaSelected', id);  
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
