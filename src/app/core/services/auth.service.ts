import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ConfigService} from './config.service';


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
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}