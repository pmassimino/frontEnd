import { Injectable } from '@angular/core';
import { BalanceMayorView, Mayor, MayorView } from '../models/model';
import { CrudService } from '../../../core/services/crud.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MayorService extends CrudService<Mayor,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/contable/mayor/');
  }
  balance(fecha:Date,fechaHasta:Date): Observable<BalanceMayorView[]> {
    let params = new HttpParams();        
    params = params.append('fecha', fecha.toDateString());
    params = params.append('fechaHasta',fechaHasta.toDateString());     
    return this.http.get<BalanceMayorView[]>(this.base + "balance",{params: params});
  }
  listView(idCuentaMayor:string,fecha:Date,fechaHasta:Date): Observable<MayorView[]> {
    let params = new HttpParams();        
    params = params.append('idCuentaMayor', idCuentaMayor);
    params = params.append('fecha', fecha.toDateString());
    params = params.append('fechaHasta',fechaHasta.toDateString());     
    return this.http.get<MayorView[]>(this.base + "listview",{params: params});
  }
}
