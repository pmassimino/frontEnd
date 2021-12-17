import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ConfigService} from './config.service';
import * as jwt_decode from 'jwt-decode';
import { Account } from '../../modules/global/models/models/model';




@Injectable()
export class AuthService {  
  constructor(private http: HttpClient,private config:ConfigService) { }

  login(username: string, password: string): Observable<boolean> {
    
    return this.http.post<{token: string}>(this.config.data.apiUrl +'/login', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('EmpresaSelected');
  }
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
  
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    var result:boolean=false;
    if (token!=null)
    {
      result = !this.tokenExpired(token);
    }    
    return result;
  }
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  public currentAccount():Account {
    const account:Account=new Account();
    if (this.isAuthenticated()==false)
    {
     return account;
    }
    const token = localStorage.getItem('access_token');
    const tmpTokenJSon =  (JSON.parse(atob(token.split('.')[1])));
    account.Id = tmpTokenJSon.id;
    account.Nombre =tmpTokenJSon.nombre;
    account.Email = tmpTokenJSon.email;
    return account;
  }
}