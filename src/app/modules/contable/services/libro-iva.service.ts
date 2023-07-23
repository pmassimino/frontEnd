import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { LibroIva, LibroIvaView } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class LibroIvaService extends CrudService<LibroIva,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/contable/libroiva/');
  }

  ventas(fecha:string,fechaHasta:string,filtrarAuto:boolean=true,autorizado:boolean=true): Observable<LibroIvaView[]> {
    let params = new HttpParams();        
    params = params.append('fecha', fecha);
    params = params.append('fechaHasta',fechaHasta); 
    params = params.append('filtrarAuto',filtrarAuto);    
    params = params.append('autorizado',autorizado);    
    return this.http.get<LibroIvaView[]>(this.base + "ventas/",{params: params});
  }

  compras(fecha:string,fechaHasta:string,filtrarAuto:boolean=true,autorizado:boolean=true): Observable<LibroIvaView[]> {
    let params = new HttpParams();        
    params = params.append('fecha', fecha);
    params = params.append('fechaHasta',fechaHasta); 
    params = params.append('filtrarAuto',filtrarAuto);    
    params = params.append('autorizado',autorizado);    
    return this.http.get<LibroIvaView[]>(this.base + "compras/",{params: params});
  }
  print(tipo:string,fecha:string,fechaHasta:string,filtrarAuto:boolean=true,autorizado:boolean=true): Observable<any> {
    let params = new HttpParams();        
    params = params.append('tipo', tipo);
    params = params.append('fecha', fecha);
    params = params.append('fechaHasta',fechaHasta); 
    params = params.append('filtrarAuto',filtrarAuto);    
    params = params.append('autorizado',autorizado);    
    return this.http.get(this.base + "print/",{params: params,responseType: "blob" });
  }
  

}
