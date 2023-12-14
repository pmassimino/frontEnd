import { Component, OnInit, ViewChild } from '@angular/core';
import { PuntoEmision } from '../../models/model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PuntoEmisionService } from '../../services/punto-emision.service';
import { Router } from '@angular/router';
import { FacturaSelectComponent } from '../../factura/factura-select/factura-select.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-punto-emision-select',
  templateUrl: './punto-emision-select.component.html',
  styleUrls: ['./punto-emision-select.component.css']
})
export class PuntoEmisionSelectComponent implements OnInit {
  
  entityData: PuntoEmision[] = [];
  idCuenta:string;  
  pageSize = 10; // Número de elementos por página
  currentPage = 1; 
  totalItems = 0;    
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Fecha', 'Tipo', 'Numero','Cliente','Total','Select','Print'];
  totalItem: number;  
  total:number;
  dataSource: MatTableDataSource<PuntoEmision>;
  constructor(private service: PuntoEmisionService,
     private router: Router,private dialogRef: MatDialogRef<FacturaSelectComponent>,
     ) {
     
      }

  ngOnInit(): void
    {
      this.getAll();
    }

  add(item:PuntoEmision): void
    {       
     this.service.Current = item;
     this.dialogRef.close({ data: 'ok' });
    }
    
  getAll():void
    {
      this.service.findAll()
      .subscribe(res => {          
        this.dataSource = new MatTableDataSource(res);
        this.configTable();
        this.calcular();} ,
      err => {console.log(err) ; });
    }
    configTable() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    findByName(name): void {       
      this.dataSource.filter = name.trim().toLowerCase();
      this.calcular();    
    }
    
    calcular():void
  {
    
  }

  select() {      
    
  }

  anyItemSelected(): boolean {
  return false;
  }

  print(id:string)
  {
    
  }  

    close():void
    {
      this.dialogRef.close({ result: 'cancel' });
    }
    aceptar():void
    {
      //const selectedFacturas = this.dataSource.filteredData.filter(factura);       
      
      //this.dialogRef.close({ result:"ok",selectedFacturas:selectedFacturas });
    }
    cancel():void
    {
      this.dialogRef.close({ result: 'cancel' });
    }

}
