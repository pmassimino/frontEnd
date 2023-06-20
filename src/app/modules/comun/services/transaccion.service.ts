import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { ReciboCtaCteService} from '../../tesoreria/services/recibo-cta-cte.service';
import { Transaccion } from '../models/model';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService extends CrudService<Transaccion, string> {

  constructor(protected http: HttpClient, protected config: ConfigService,private settingService:SettingService,private reciboService:ReciboCtaCteService,
     private authService:AuthService) {
    super(http, config.data.apiUrl + '/comun/transaccion/');    
  }

  print(id: string): Observable<any>
   {    
    return this.http.get(this.base + id.toString() + "/print",{ responseType: "blob" });
   }
   
   
  
}
