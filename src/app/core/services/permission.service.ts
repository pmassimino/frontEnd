import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { element } from 'protractor';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from '../../modules/global/models/models/model';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService  {

  protected _roles = new BehaviorSubject<Rol[]>([]);
  roles$ = this._roles.asObservable();

  protected get roles(): Rol[] {
    return this._roles.getValue();
  }
  protected set roles(val: Rol[]) {
    this._roles.next([...val]);
  }   
  
  constructor(private authService:AuthService,private http: HttpClient,private config:ConfigService) 
  {
    this.onInit();
  }
  
  onInit2()
  { 
    if (this.roles.length == 0)
    {
      this.GetRoles().subscribe(res=>{this.roles = res;});
    }        
  }
  onInit()
  {
    var retrievedObject =  localStorage.getItem('CurrentRoles');
    var result : Rol[] = null;
    if (retrievedObject != null)
    {
      result = JSON.parse(retrievedObject);
      this.roles=result;      
    }
    if (result == null)
    {
      this.GetRoles().subscribe(res=>{this.roles = res;localStorage.setItem("CurrentRoles",JSON.stringify(res));});
    }    
    
  }
  
  hasPermission(permiso:string):boolean
  { 
    var result = false;    
    this.roles.forEach(element => {
      element.Permisos.forEach(element => {
        if(element.IdPermiso ==permiso)result = true;
      });
    });    
    return result ;
  } 
  public GetRoles():Observable<Rol[]>
  {
    var id  = this.authService.currentAccount().Id;
    return this.http.get<Rol[]>(this.config.data.apiUrl  + '/Global/Account/' + id + "/Roles") ;
  }
}
