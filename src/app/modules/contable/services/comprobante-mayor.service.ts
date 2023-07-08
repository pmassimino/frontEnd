import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { ConfigService } from '../../../core/services/config.service';
import { HttpClient } from '@angular/common/http';
import { ComprobanteMayor } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteMayorService extends CrudService<ComprobanteMayor,string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/contable/comprobantemayor/');
  }
}
