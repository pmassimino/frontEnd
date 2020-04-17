import { Injectable } from '@angular/core';
import { CondIvaOp } from '../models/model';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud.service';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class CondIvaOpService extends CrudService<CondIvaOp, number> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/almacen/condIvaOp/');
  }

}
