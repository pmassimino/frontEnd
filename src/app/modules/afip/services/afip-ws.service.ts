import { Injectable } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { AfipWs } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AfipWSService extends CrudService<AfipWs, string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/afip/afipws/');
  }
}
