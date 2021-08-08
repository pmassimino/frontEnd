import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { Factura } from '../models/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService extends CrudService<Factura,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/ventas/factura/');
  }
  print(id: string): Observable<any>
   {    
    return this.http.get(this.base + id + "/print",{ responseType: "blob" });
   }
   letrasDisponible(idCondIva:string): Observable<any>
   {
     let params = new HttpParams();
     params = params.append('idCondIva', idCondIva);    
     return this.http.get(this.base  + "letrasdisponibles",{params:params});
   }
   autorizar(id:string): Observable<any>
   {
     let params = new HttpParams();
     params = params.append('id', id);    
     return this.http.get(this.base + id  + "/autorizar");
   }

}
