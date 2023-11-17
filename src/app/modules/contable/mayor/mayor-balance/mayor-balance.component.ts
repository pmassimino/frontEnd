import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BalanceMayorView } from '../../models/model';
import { MayorService } from '../../services/mayor.service';
import { TransaccionService } from '../../../comun/services/transaccion.service';
import { ParamBase } from '../../../../core/models/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mayor-balance',
  templateUrl: './mayor-balance.component.html',
  styleUrls: ['./mayor-balance.component.css']
})
export class MayorBalanceComponent  implements OnInit {  
form :  UntypedFormGroup;
param : ParamBase = new ParamBase;
//Paginacion
pageSize = 14; // Número de elementos por página
currentPage = 1; 
totalItems = 0;
dataSource: MatTableDataSource<BalanceMayorView>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
displayedColumns = ['Codigo', 'Nombre', 'SaldoAnterior','Debitos','Creditos','SaldoPeriodo','Saldo'];
totalDebitos: number;
totalCreditos:number;
totalSaldoAnterior:number;
totalSaldoPeriodo:number;
totalSaldo:number;

constructor(private service:MayorService,private transaccionService:TransaccionService,private formBuilder: UntypedFormBuilder) 
{  
  this.createForm();
}  

createForm():void
  {
      this.form = new UntypedFormGroup({
      Fecha: new UntypedFormControl(this.param.Fecha,Validators.required),
      FechaHasta: new UntypedFormControl(this.param.FechaHasta,Validators.required)});
  }
  configTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
ngOnInit(): void {
  this.onSubmit();
  this.calcular();
}
onSubmit():void
{
    this.param =   this.form.value;    
    this.service.balance(this.param.Fecha,this.param.FechaHasta)
    .subscribe(res=>{this.dataSource = new MatTableDataSource(res);this.configTable();this.calcular();})  
}
onPrint():void
{
 
}
findByName(name): void {       
  this.dataSource.filter = name.trim().toLowerCase();
  this.calcular();    
}

calcular():void
{
  this.totalDebitos = 0;
  this.totalCreditos = 0;   
  this.totalSaldoAnterior=0;
  this.totalDebitos = this.dataSource.filteredData.reduce((total, item) => total + item.Debitos, 0);
  this.totalCreditos = this.dataSource.filteredData.reduce((total, item) => total + item.Creditos, 0);
  this.totalSaldoAnterior = this.dataSource.filteredData.reduce((total, item) => total + item.SaldoAnterior, 0);  
  this.totalSaldoPeriodo = this.dataSource.filteredData.reduce((total, item) => total + item.SaldoPeriodo, 0);  
  this.totalSaldo = this.dataSource.filteredData.reduce((total, item) => total + item.Saldo, 0);  

}


}



