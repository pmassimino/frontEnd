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
  balance(fecha:string,fechaHasta:string): Observable<BalanceMayorView[]> {
    let params = new HttpParams();        
    params = params.append('fecha', fecha);
    params = params.append('fechaHasta',fechaHasta);     
    return this.http.get<BalanceMayorView[]>(this.base + "balance",{params: params});
  }
  listView(idCuentaMayor:string,fecha:string,fechaHasta:string): Observable<MayorView[]> {
    let params = new HttpParams();        
    params = params.append('idCuentaMayor', idCuentaMayor);
    params = params.append('fecha', fecha);
    params = params.append('fechaHasta',fechaHasta);     
    return this.http.get<MayorView[]>(this.base + "listview",{params: params});
  }
  diario(fecha:string,fechaHasta:string): Observable<Mayor[]> {
    let params = new HttpParams();            
    params = params.append('fecha', fecha);
    params = params.append('fechaHasta',fechaHasta);     
    return this.http.get<Mayor[]>(this.base + "diario",{params: params});
  }
}
