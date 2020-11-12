import { Injectable } from '@angular/core';
import { TipoDocumento } from '../models/models/model';
import { CrudService } from '../../../core/services/crud.service';
import { ConfigService } from '../../../core/services/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService extends CrudService<TipoDocumento, string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/global/tipoDocumento/');
  }
}
