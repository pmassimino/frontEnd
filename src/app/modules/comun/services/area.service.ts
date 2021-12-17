import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { Area } from '../models/model';
import { SettingService } from './setting.service';


@Injectable({
  providedIn: 'root'
})
export class AreaService extends CrudService<Area, string> {



  constructor(protected http: HttpClient, protected config: ConfigService,private settingService:SettingService,private authService:AuthService) {
    super(http, config.data.apiUrl + '/comun/area/');
    this.initValue();
  }
  get Current():Area
  {
    return super.Current;
  }
  set Current(entity:Area)
  {  
    localStorage.setItem('CurrentArea', JSON.stringify(entity));    
    var idSetting:string = "idAreaSelect." + this.authService.currentAccount().Id ;
    this.settingService.setValue(idSetting,entity.Id).subscribe();
    super.Current=entity;
  }
  
  
  findLastOrDefault(): Observable<Area> {
    return this.http.get<Area>(this.base + "LastOrDefault");
  }
  
  private initValue()
  {
    var retrievedObject =  localStorage.getItem('CurrentArea');
    var result:Area=null;
    if (retrievedObject != null)
    {
      result = JSON.parse(retrievedObject)
      this.Current = result; 
    }
    if (result == null)
    {
      this.findLastOrDefault().subscribe(res=>{this.Current = res});;
    }    
    
    
  }
  

}
