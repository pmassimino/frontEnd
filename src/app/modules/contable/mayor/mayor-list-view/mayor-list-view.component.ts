import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MayorView } from '../../models/model';
import { MayorService } from '../../services/mayor.service';
import { TransaccionService } from '../../../comun/services/transaccion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-mayor-list-view',
  templateUrl: './mayor-list-view.component.html',
  styleUrls: ['./mayor-list-view.component.css']
})
export class MayorListViewComponent implements OnInit {  
  idCuentaMayor:string;
  fecha:Date;
  fechaHasta:Date;
  entityList:MayorView[]=[];
  entityFiltredList:MayorView[]=[];
  totalDebe:number;
  totalHaber:number;
 //Paginacion
  pageSize = 14; // Número de elementos por página
  currentPage = 1; 
  totalItems = 0;
  dataSource: MatTableDataSource<MayorView>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Fecha', 'Numero', 'Concepto','Debe','Haber','Saldo','Edit'];
  constructor(private service:MayorService,private route: ActivatedRoute,private router: Router,private transaccionService:TransaccionService,private formBuilder: UntypedFormBuilder) 
  {
    var today:Date= new Date;
    this.idCuentaMayor = this.route.snapshot.queryParams['idCuentaMayor'];
    var month = today.getMonth()
    var year = today.getFullYear()
    this.fecha = new Date(year,month,1)
    this.fechaHasta = new Date(year,month + 1,0);
  }
  ngOnInit(): void {
    this.onGetAll();
  }
  onGetAll():void
  {     
      this.service.listView(this.idCuentaMayor,this.fecha,this.fechaHasta)
      .subscribe(res=>{this.dataSource = new MatTableDataSource(res);this.configTable();this.calcular();})    
  }
  configTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.totalDebe = 0;
    this.totalHaber = 0;
    this.totalDebe = this.dataSource.filteredData.reduce((total, item) => total + item.Debe, 0);
    this.totalHaber = this.dataSource.filteredData.reduce((total, item) => total + item.Haber, 0); 
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

