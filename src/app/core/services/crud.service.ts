import { Observable } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import {  throwError } from 'rxjs';
import {ValidationErrors } from '@angular/forms';
import { retry, catchError } from 'rxjs/operators';
export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  constructor(
    protected http: HttpClient,
    protected base: string
  ) {}
  newDefault(): Observable<T> {
    return this.http.get<T>(this.base + 'NewDefault/').pipe(catchError(this.handleError));
  }
  add(t: T): Observable<T> {
    return this.http.post<T>(this.base, t).pipe(catchError(this.handleError));
  }

  update(id: ID, t: T): Observable<T> {
    return this.http.put<T>(this.base  + id, t, {}).pipe(catchError(this.handleError));
  }

  findOne(id: ID): Observable<T> {
    return this.http.get<T>(this.base + id);
  }
  findByName(name: string): Observable<T[]> {
    return this.http.get<T[]>(this.base + 'byName/' + name);
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.base);
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(this.base +  id).pipe(catchError(this.handleError));
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
