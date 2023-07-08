import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BalanceMayorView } from '../../models/model';
import { MayorService } from '../../services/mayor.service';
import { TransaccionService } from '../../../comun/services/transaccion.service';

@Component({
  selector: 'app-mayor-balance',
  templateUrl: './mayor-balance.component.html',
  styleUrls: ['./mayor-balance.component.css']
})
export class MayorBalanceComponent  implements OnInit {  
paramForm:MayorBalanceParam;
form :  UntypedFormGroup;
fecha:Date;
fechaHasta:Date;
entityList:BalanceMayorView[]=[];
entityFiltredList:BalanceMayorView[]=[];
totalDebitos: number;
totalCreditos:number;
totalSaldoAnterior:number;

constructor(private service:MayorService,private transaccionService:TransaccionService,private formBuilder: UntypedFormBuilder) 
{
  var today:Date= new Date;
  var month = today.getMonth()
  var year = today.getFullYear()
  this.fecha = new Date(year,month,1)
  this.fechaHasta = new Date(year,month + 1,0);
  this.paramForm = new MayorBalanceParam();
  this.paramForm.Fecha = this.fecha.toDateString();
  this.paramForm.FechaHasta = this.fechaHasta.toDateString();    
}

createForm():void
{
  this.form = this.formBuilder.group({    
    Fecha: new UntypedFormControl(this.paramForm.Fecha,Validators.required),
    FechaHasta: new UntypedFormControl(this.paramForm.FechaHasta,Validators.required)    
});
}

ngOnInit(): void {
  this.onGetAll();
  this.calcular();
}
onGetAll():void
{
   
    this.service.balance(this.fecha,this.fechaHasta)
    .subscribe(res=>{this.entityFiltredList = res;this.entityList=res;this.calcular();})
  
}
onPrint():void
{
 
}
findByName(name): void {       
  this.entityFiltredList = this.entityList.
  filter(f=>f.Nombre.toLowerCase().includes(name.toLowerCase()) ||
   f.IdCuentaMayor.includes(name));   
   this.calcular();
  
}

calcular():void
{
  this.totalDebitos = 0;
  this.totalCreditos = 0;   
  this.totalSaldoAnterior=0;
  this.entityFiltredList.map(a=>this.totalSaldoAnterior += a.SaldoAnterior );   
  this.entityFiltredList.map(a=>this.totalDebitos += a.Debitos );
  this.entityFiltredList.map(a=>this.totalCreditos += a.Creditos );  
}
parseFecha(dateString: string): void 
{
  if (dateString) {
      dateString.replace("-","/");
      const [year, month, day] = dateString.split('-');
      this.fecha =  new Date(Date.parse(dateString));
      this.fecha = new Date(Date.UTC(Number(year),Number(month)-1,Number(day)));
  }    
}
parseFechaHasta(dateString: string): void
{
if (dateString) {
    dateString = this.replaceAll(dateString,"-","/");
    this.fechaHasta =  new Date(dateString);
}    
}

replaceAll(str, find, replace):string {
var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
return str.replace(new RegExp(escapedFind, 'g'), replace);
}

}
export class MayorBalanceParam
{
Fecha: string;
FechaHasta:string;
}

