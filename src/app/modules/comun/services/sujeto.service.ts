import { Injectable } from '@angular/core';
import { Sujeto } from '../models/model';
import { ConfigService } from '../../../core/services/config.service';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class SujetoService extends CrudService<Sujeto, string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/comun/sujeto/');
  }

}
