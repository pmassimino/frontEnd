import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { ConfigService } from '../../../core/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Comprobante } from '../models/models/model';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService extends CrudService<Comprobante,number> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/global/comprobante/');
  }
}
