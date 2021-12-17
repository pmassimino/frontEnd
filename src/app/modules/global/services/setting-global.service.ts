import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { Setting } from '../models/models/model';


@Injectable({
  providedIn: 'root'
})
export class SettingGlobalService extends CrudService<Setting, string> {

  constructor(protected http: HttpClient, protected config: ConfigService) {
    super(http, config.data.apiUrl + '/global/setting/');
  }

  getValue(id:string): Observable<Setting> {
    return this.http.get<Setting>(this.base + "GetValue/" + id);
  }

  setValue(id: string,value:string): Observable<string> {
   var method:string=this.base +"setvalue/" +  id + "?value=" + value;
    return this.http.put<any>(method,{}).pipe(catchError(this.handleError));
  }

}