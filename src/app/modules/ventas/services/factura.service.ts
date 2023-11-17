import { EventEmitter, Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { Factura } from '../models/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';
import { Observable } from 'rxjs';
import { NumeradorDocumento } from '../../comun/models/model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService extends CrudService<Factura,string> {

  selectEvent = new EventEmitter<Factura[]>();
  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/ventas/factura/');
  }
  public DigitosDecimal:number=2;
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
   nextNumber(idSeccion:string,letra:string,tipo:string): Observable<NumeradorDocumento>
   {
     let params = new HttpParams();
     params = params.append('idSeccion', idSeccion);    
     params = params.append('letra', letra);    
     params = params.append('tipo', tipo);    
     return this.http.get<NumeradorDocumento>(this.base  + "nextNumber",{params:params});
   }
   autorizar(id:string): Observable<any>
   {
     let params = new HttpParams();
     params = params.append('id', id);    
     return this.http.get(this.base + id  + "/autorizar");
   }
   recuperar(id:string): Observable<any>
   {
     let params = new HttpParams();
     params = params.append('id', id);    
     return this.http.get(this.base + id  + "/recuperar");
   }
   listView(fecha:string,fechaHasta:string): Observable<Factura[]> {
    let params = new HttpParams();            
    params = params.append('fecha', fecha);
    params = params.append('fechaHasta',fechaHasta);     
    return this.http.get<Factura[]>(this.base + "listview",{params: params});
  }
  findByIdCuenta(idCuenta:string): Observable<Factura[]> {   
    const url = this.base + "ByCuenta/" + idCuenta;
    return this.http.get<Factura[]>(url);
  }
   
   TipoFactura(entity:Factura):string
    {
        var result:string; 
        if (entity.Tipo=="1")
        {
          result= "FACTURA " + entity.Letra;        
        }
        else if  (entity.Tipo =="2")
        {
          result= "NOTA DE CREDITO " + entity.Letra;        
        }
        else if  (entity.Tipo =="3")
        {
          result= "NOTA DE DEBITO " + entity.Letra;        
        }
        return result;
    }
  select(data: Factura[]) {
   this.selectEvent.emit(data);
  }

}
