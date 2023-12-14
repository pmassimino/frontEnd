import { EventEmitter, Injectable } from '@angular/core';
import { PuntoEmision } from '../models/model';
import { CrudService } from '../../../core/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class PuntoEmisionService extends CrudService<PuntoEmision,string> {
  selectEvent = new EventEmitter<PuntoEmision[]>();

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/ventas/puntoemision/');
  }
  select(data: PuntoEmision[]) {
    this.selectEvent.emit(data);
   }
}
