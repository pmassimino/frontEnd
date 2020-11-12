import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../models/model';
import { CrudService } from '../../../core/services/crud.service';
import {ConfigService} from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService extends CrudService<Articulo, string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/almacen/articulo/');
  }

}
