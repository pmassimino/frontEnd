import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import {  throwError } from 'rxjs';
import {ValidationErrors } from '@angular/forms';
import { retry, catchError } from 'rxjs/operators';
export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  private readonly _Current = new BehaviorSubject<T>(null);
  private readonly _CurrentList = new BehaviorSubject<T[]>(null);
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
  
  findByTransaccion(id: string): Observable<T[]> {
    return this.http.get<T[]>(this.base + 'byTransaccion/' + id);
  }
 
  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.base);    
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(this.base +  id).pipe(catchError(this.handleError));
  }

  get Current(): T {
    return this._Current.getValue();
  }
  
  set Current(val: T) {
    this._Current.next(val);
  }
  get CurrentList(): T[] {
    return this._CurrentList.getValue();
  }
  
  set CurrentList(val: T[]) {
    this._CurrentList.next(val);
  }
  currentValue():Observable<T>
  {
    return this._Current.asObservable();
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
function Cacheable() {
  throw new Error('Function not implemented.');
}

