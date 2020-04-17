import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../models/model';
import { CrudService } from '../../../core/services/crud.service';
import {ConfigService} from '../../../core/services/config.service';

@Injectable()
export class ArticuloService extends CrudService<Articulo, number> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/almacen/articulos/');
  }

}
