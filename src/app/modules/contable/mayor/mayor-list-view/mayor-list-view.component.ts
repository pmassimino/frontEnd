import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MayorView } from '../../models/model';
import { MayorService } from '../../services/mayor.service';
import { TransaccionService } from '../../../comun/services/transaccion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ParamBase } from '../../../../core/models/common';



@Component({
  selector: 'app-mayor-list-view',
  templateUrl: './mayor-list-view.component.html',
  styleUrls: ['./mayor-list-view.component.css']
})
export class MayorListViewComponent implements OnInit {    
  form :  UntypedFormGroup;
  param : ParamMayor = new ParamMayor();
  totalDebe:number;
  totalHaber:number;
  idCuentaMayor:string;
 //Paginacion
  pageSize = 14; // Número de elementos por página
  currentPage = 1; 
  totalItems = 0;
  dataSource: MatTableDataSource<MayorView>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Fecha', 'Numero', 'Concepto','Debe','Haber','SaldoPeriodo','Saldo','Edit'];
  constructor(private service:MayorService,private route: ActivatedRoute,private router: Router,private transaccionService:TransaccionService,private formBuilder: UntypedFormBuilder) 
  {
     this.param.IdCuentaMayor = this.route.snapshot.queryParams['idCuentaMayor'];
     this.createForm();   
   
  }
  ngOnInit(): void {   
    this.onSubmit();
  }
  onSubmit():void
  {     
      this.param =   this.form.value;    
      this.service.listView(this.param.IdCuentaMayor,this.param.Fecha,this.param.FechaHasta)
      .subscribe(res=>{this.dataSource = new MatTableDataSource(res);this.configTable();this.calcular();})    
  }
  configTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onPrint():void
  {
   
  }
  createForm():void
  {
      this.form = new UntypedFormGroup({
      Fecha: new UntypedFormControl(this.param.Fecha,Validators.required),
      FechaHasta: new UntypedFormControl(this.param.FechaHasta,Validators.required),
      IdCuentaMayor:new UntypedFormControl(this.param.IdCuentaMayor,Validators.required)});
  }
  findByName(name): void {       
    this.dataSource.filter = name.trim().toLowerCase();
    this.calcular();    
  }
  
  calcular():void
  {
    this.totalDebe = 0;
    this.totalHaber = 0;
    this.totalDebe = this.dataSource.filteredData.reduce((total, item) => total + item.Debe, 0);
    this.totalHaber = this.dataSource.filteredData.reduce((total, item) => total + item.Haber, 0); 
  }   
  
  }
  class ParamMayor extends ParamBase {
    IdCuentaMayor:string;
  }

   

