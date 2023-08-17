import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { ConfigService } from '../../../core/services/config.service';
import { CrudService } from '../../../core/services/crud.service';
import { Empresa } from '../models/models/model';
import { SettingGlobalService } from './setting-global.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends CrudService<Empresa, string> {

  constructor(protected http: HttpClient, protected config: ConfigService,private settingService:SettingGlobalService,private authService:AuthService) {
    super(http, config.data.apiUrl + '/global/empresa/');
    this.initValue();
  }
  
  get Current(): Empresa {
    var retrievedObject =  localStorage.getItem('EmpresaSelected');
    var result:Empresa=null;
    if (retrievedObject != null)
    {
      result = JSON.parse(retrievedObject) 
      return result;     
    }
    else {
      // Si no se encuentra ninguna empresa seleccionada, puedes lanzar un error o devolver un valor predeterminado.
      throw new Error('No se ha encontrado ninguna empresa seleccionada');
    }
  }
  set Current(entity:Empresa)
  { if (entity != null)
      { 
       localStorage.setItem('idEmpresaSelected',entity.Id);
       localStorage.setItem('EmpresaSelected', JSON.stringify(entity));   
       var idSetting:string = "idEmpresaSelected." + this.authService.currentAccount().Id ;
       //this.settingService.setValue(idSetting,entity.Id).subscribe();
       super.Current=entity;
      }       
  }
  findLastOrDefault(): Observable<Empresa> {
    return this.http.get<Empresa>(this.base + "LastOrDefault");
  }  
  private initValue()
  {
    var retrievedObject =  localStorage.getItem('EmpresaSelected');
    var result:Empresa=null;
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
