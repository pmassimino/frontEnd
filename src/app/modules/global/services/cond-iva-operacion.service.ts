import { Injectable } from '@angular/core';
import { CondIvaOperacion } from '../models/models/model';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CondIvaOperacionService extends CrudService<CondIvaOperacion, string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/global/condIvaOperacion/');
  }
}
