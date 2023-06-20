import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { Localidad } from '../models/models/model';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService extends CrudService<Localidad, string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/global/localidad/');
  }
  findByProvincia(id:string): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(this.base + "provincia/" + id);
  }  
}
