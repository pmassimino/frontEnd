import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Articulo } from '../../models/model';
import { ArticuloService } from '../../services/articulo.service';
import { CarritoCompraService } from '../../services/carrito-compra.service';

@Component({
  selector: 'app-articulo-select',
  templateUrl: './articulo-select.component.html',
  styleUrls: ['./articulo-select.component.css']
})
export class ArticuloSelectComponent implements OnInit {

  dataList: Articulo[] = [];  
  dataSource: MatTableDataSource<Articulo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Id', 'Nombre', 'PrecioVentaFinal','Edit'];
  page = 1;   
  itemsPerPage = 15;
  totalItems : number;     

  constructor(private service: ArticuloService,private carritoService: CarritoCompraService,
       private router: Router,private dialogRef: MatDialogRef<ArticuloSelectComponent>) 
       {
       var pservice:ArticuloService = service;
       }
      ngOnInit(): void {
        this.getAll();
      }
    
      configTable() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      getAll():void
      { 
        this.service.findAll()
        .subscribe(res => {
          this.dataSource = new MatTableDataSource(res);
          this.service.CurrentList = res;
          this.configTable(); } ,
        err => {console.log(err) ; });
        
      }
      exportToExcel() {
        //this.excelService.exportAsExcelFile(this.dataSource.data, 'articulos');
      }
    
      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }
    add(item:Articulo): void
      {       
       this.carritoService.add(item,1);
      }    
    
      close():void
      {
        this.dialogRef.close({ data: 'ok' });
      }
      cancel():void
      {
        this.dialogRef.close({ data: 'cancel' });
      }
     

}
