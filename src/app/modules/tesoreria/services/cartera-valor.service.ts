import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { CarteraValor, CarteraValorView } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CarteraValorService  extends CrudService<CarteraValor,string> {  

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/tesoreria/carteravalor/');
  }
  print(id: string): Observable<any>
   {    
    return this.http.get(this.base + id.toString() + "/print",{ responseType: "blob" });
   }
  
  listView(fecha: string,estado:string="ACTIVO"): Observable<CarteraValorView[]>
   {    
    let params = new HttpParams();    
    params = params.append('fecha', fecha);
    params = params.append('estado', estado);
    return this.http.get<CarteraValorView[]>(this.base + "listview/",{params: params});
  }
  
  
}
