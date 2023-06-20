import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { NumeradorDocumento } from '../../comun/models/model';
import { ComprobantesDisponible, DetalleComprobante, ReciboCtaCte } from '../models/model';
@Injectable({
  providedIn: 'root'
})
export class ReciboCtaCteService extends CrudService<ReciboCtaCte,string> {

  private readonly _DetalleComprobante = new BehaviorSubject<DetalleComprobante[]>([]);

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/tesoreria/ReciboCtaCte/');
  }
  print(id: string): Observable<any>
   {    
    return this.http.get(this.base + id.toString() + "/print",{ responseType: "blob" });
   }
  
  ComprobantesDisponibles(id: string,idCuentaMayor:string): Observable<ComprobantesDisponible[]>
   {    
    let params = new HttpParams();    
    params = params.append('idCuentaMayor', idCuentaMayor);
    return this.http.get<ComprobantesDisponible[]>(this.base + "comprobantesdisponibles/" + id,{params: params});
  }
  
  NextNumber(id: string): Observable<NumeradorDocumento>
   { 
    return this.http.get<NumeradorDocumento>(this.base + "NextNumber/" + id);
  }
  get DetalleComprobante(): DetalleComprobante[] {
    return this._DetalleComprobante.getValue();
  }
  set DetalleComprobante(val: DetalleComprobante[]) {
    this._DetalleComprobante.next([...val]);
  }
  
}