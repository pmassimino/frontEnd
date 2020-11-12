import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { TipoCuentaMayor } from '../models/model';
import { ConfigService } from '../../../core/services/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaMayorService extends CrudService<TipoCuentaMayor,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/contable/tipocuentamayor/');
  }
}
