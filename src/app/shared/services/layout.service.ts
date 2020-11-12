import { Injectable } from '@angular/core';
import { EmpresaService } from '../../modules/global/services/empresa.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private empresaService:EmpresaService) 
  {

  }
  
}
