import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { CondIvaOperacion } from '../models/models/model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService extends CrudService<CondIvaOperacion, string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/global/unidadMedida/');
  }
}
