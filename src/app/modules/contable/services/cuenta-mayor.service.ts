import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { CuentaMayor } from '../models/model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentaMayorService extends CrudService<CuentaMayor,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/contable/cuentamayor/');
  }  
  findMediosPagos(): Observable<CuentaMayor[]> {
    return this.http.get<CuentaMayor[]>(this.base + "MediosPagos/");
  }
  CuentasSubdiario(): Observable<CuentaMayor[]> {
    return this.http.get<CuentaMayor[]>(this.base + "CuentasSubdiario/");
  }
  
  
}
