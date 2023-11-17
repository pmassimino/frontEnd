import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { MailServer } from './models/model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class MailServerService extends CrudService<MailServer,number> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/mail/mailserver/');
  }
}
