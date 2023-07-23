import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TransaccionService } from '../../../comun/services/transaccion.service';
import { LibroIvaView } from '../../models/model';
import { LibroIvaService } from '../../services/libro-iva.service';
import { CommonModule } from '@angular/common';
import { ParamBase } from '../../../../core/models/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-libro-iva-list',
  templateUrl: './libro-iva-list.component.html',
  styleUrls: ['./libro-iva-list.component.css']
})
export class LibroIvaListComponent implements OnInit {  
  param:LibroIvaParam;
  form :  UntypedFormGroup;  
  //Paginacion
  pageSize = 14; // Número de elementos por página
  currentPage = 1; 
  totalItems = 0;
  dataSource: MatTableDataSource<LibroIvaView>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Fecha','Numero','NumeroDoc','Nombre','Gravado','NoGravado','Exento','Iva105','Iva21'
  ,'Iva27','IvaOtro','OtrosTributos','Total','Imprimir'];
  totalGravado:number=0;
  totalNoGravado:number=0;
  totalExento:number=0;
  totalIva105:number=0;
  totalIva21:number=0;
  totalIva27:number=0;
  totalIvaOtro:number=0;
  totalOtrosTributos:number=0;
  total:number=0;
  items:number=0;
 
  constructor(private libroIvaService:LibroIvaService,private transaccionService:TransaccionService,private formBuilder: UntypedFormBuilder) 
  {
    
    this.param = new LibroIvaParam();   
    this.createForm(); 
  }

  createForm():void
  {
    this.form = this.formBuilder.group({
      Tipo: new UntypedFormControl(this.param.Tipo,Validators.required),
      Fecha: new UntypedFormControl(this.param.Fecha,Validators.required),
      FechaHasta: new UntypedFormControl(this.param.FechaHasta,Validators.required),
      FiltrarAutorizado: new UntypedFormControl(this.param.FiltrarAutorizado),
      Autorizado: new UntypedFormControl(this.param.Autorizado)});
  }

  configTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.onSubmit();
  }
  onSubmit():void
  {
    this.param = this.form.value;   
    if(this.param.Tipo=="V")
    {
      this.libroIvaService.ventas(this.param.Fecha,this.param.FechaHasta,this.param.FiltrarAutorizado,this.param.Autorizado)
      .subscribe(res=>{this.dataSource = new MatTableDataSource(res);this.configTable();this.calcular();})
    }
    if(this.param.Tipo=="C")
    {
      this.libroIvaService.compras(this.param.Fecha,this.param.FechaHasta,this.param.FiltrarAutorizado,this.param.Autorizado)
      .subscribe(res=>{this.dataSource = new MatTableDataSource(res);this.configTable();this.calcular();})
    }
    
  }
  onPrint():void
  {
    this.libroIvaService.print(this.param.Tipo,this.param.Fecha,this.param.FechaHasta,this.param.FiltrarAutorizado,this.param.Autorizado).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
  }
  onPrintItem(item:LibroIvaView):void  
  {
    this.transaccionService.print(item.IdTransaccion).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
  }
  findByName(name): void {       
    this.dataSource.filter = name.trim().toLowerCase();
    this.calcular();    
  }
  calcular():void
  {
    this.totalGravado = 0;
    this.totalNoGravado = 0;
    this.totalExento=0;
    this.totalIva105 = 0;
    this.totalIva21 = 0;
    this.totalIva27 = 0;
    this.totalIvaOtro = 0;
    this.totalOtrosTributos = 0;
    this.total = 0;
    this.totalGravado = this.dataSource.filteredData.reduce((total, item) => total + item.Gravado, 0);
    this.totalNoGravado = this.dataSource.filteredData.reduce((total, item) => total + item.NoGravado, 0);
    this.totalExento = this.dataSource.filteredData.reduce((total, item) => total + item.Exento, 0);
    this.totalIva105= this.dataSource.filteredData.reduce((total, item) => total + item.Iva105, 0);
    this.totalIva21 = this.dataSource.filteredData.reduce((total, item) => total + item.Iva21, 0);
    this.totalIva27 = this.dataSource.filteredData.reduce((total, item) => total + item.Iva27, 0);
    this.totalIvaOtro = this.dataSource.filteredData.reduce((total, item) => total + item.IvaOtro, 0);
    this.totalOtrosTributos = this.dataSource.filteredData.reduce((total, item) => total + item.OtrosTributos, 0);
    this.total = this.dataSource.filteredData.reduce((total, item) => total + item.Total, 0);    
    this.items = this.dataSource.filteredData.reduce((total, item) => total + 1, 0);
  }
}
export class LibroIvaParam extends ParamBase 
{
  Tipo:string="V";  
  FiltrarAutorizado:boolean=true;
  Autorizado:boolean=true;
}

