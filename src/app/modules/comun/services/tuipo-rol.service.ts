import { Injectable } from '@angular/core';
import { TipoRol } from '../models/model';
import { ConfigService } from '../../../core/services/config.service';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class TipoRolService extends CrudService<TipoRol, number> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/comun/TipoRol/');
  }

}
