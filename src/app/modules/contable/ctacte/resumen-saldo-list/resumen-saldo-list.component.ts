import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';
import { MovCtaCte, MovSaldoCtaCte } from '../../models/model';
import { MovCtaCteService } from '../../services/mov-cta-cte.service';

@Component({
  selector: 'app-resumen-saldo-list',
  templateUrl: './resumen-saldo-list.component.html',
  styleUrls: ['./resumen-saldo-list.component.css']
})
export class ResumenSaldoListComponent implements OnInit {

  idCuenta:string;
  idCuentaMayor:string;
  fecha: Date = new Date();
  entityData : MovSaldoCtaCte[]=[]; 
  constructor(private entityService: MovCtaCteService, private router: Router,private excelService: ExcelService,private route: ActivatedRoute) { }
  
  ngOnInit(): void {        
    this.idCuenta = this.route.snapshot.params['id'];
    this.popupData();
  } 
  popupData()
  {
    this.entityService.resumenSaldo(this.fecha,this.idCuenta,this.idCuentaMayor).subscribe(res=>this.entityData = res)
  }
  findByName(name): void 
  {       
    
  }
  onClick(item:MovCtaCte){
    this.router.navigate( ['/contable/ctacte/resumen/' + item.IdCuenta], {queryParams: {idCuentaMayor:item.IdCuentaMayor}});
  }  
    
  


}
