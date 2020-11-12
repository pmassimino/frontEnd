import { Injectable } from '@angular/core';
import { UsoCuentaMayor } from '../models/model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsoCuentaMayorService extends CrudService<UsoCuentaMayor,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/contable/usocuentamayor/');
  }
}
