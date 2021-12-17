import { Injectable } from '@angular/core';
import { Empresa } from '../../global/models/models/model';
import { EmpresaService } from '../../global/services/empresa.service';
import { Area, Seccion, Sucursal } from '../models/model';
import { AreaService } from './area.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  
  constructor(protected areaService: AreaService,protected empresaService:EmpresaService) { }
  get CurrentArea():Area
  {
    return this.areaService.Current;
  }
  set CurrentArea(entity:Area)
  {
    this.areaService.Current = entity;
  }
  get CurrentEmpresa():Empresa
  {
    return this.empresaService.Current;
  }
  get CurrentSeccion():Seccion
  {  
    var result : Seccion =  {Id:"001",Nombre:"PRINCIPAL"};  
    return  result;
  }
  get CurrentSucursal():Sucursal
  {  
    var result : Sucursal =  {Id:"001",Nombre:"PRINCIPAL"};  
    return  result;
  }
  

}