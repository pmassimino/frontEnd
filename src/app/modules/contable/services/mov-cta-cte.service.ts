import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { MovCtaCte, MovCtaCteView, MovSaldoCtaCte } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class MovCtaCteService extends CrudService<MovCtaCte,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/contable/movctacte/');
  }
  resumenSaldo(fecha:Date,idCuenta:string = "",idCuentaMayor:string = ""): Observable<MovSaldoCtaCte[]> {
    let params = new HttpParams();
    params = params.append('fecha', fecha.toDateString());    
    return this.http.get<MovSaldoCtaCte[]>(this.base + "ResumenSaldo",{params: params});
  }
  resumen(idCuenta:string,idCuentaMayor:string,fecha:Date,fechaHasta:Date): Observable<MovCtaCteView[]> {
    let params = new HttpParams();    
    params = params.append('idCuentaMayor', idCuentaMayor);
    params = params.append('fecha', fecha.toDateString());
    params = params.append('fechaHasta',fechaHasta.toDateString());    
    return this.http.get<MovCtaCteView[]>(this.base + "Resumen/" + idCuenta,{params: params});
  }
  print(idCuenta:string,idCuentaMayor:string,fecha:Date,fechaHasta:Date): Observable<any>
   {    
    let params = new HttpParams();    
    params = params.append('idCuentaMayor', idCuentaMayor);
    params = params.append('fecha', fecha.toDateString());
    params = params.append('fechaHasta',fechaHasta.toDateString());    
    return this.http.get(this.base + "ResumenPdf/" + idCuenta,{ params: params,responseType: "blob" });
   }

}
