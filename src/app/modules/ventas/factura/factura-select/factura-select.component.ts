import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Factura, FacturaSelectView } from '../../models/model';
import { FacturaService } from '../../services/factura.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-factura-select',
  templateUrl: './factura-select.component.html',
  styleUrls: ['./factura-select.component.css']
})
export class FacturaSelectComponent  implements OnInit {
  
    entityData: Factura[] = [];
    idCuenta:string;  
    pageSize = 10; // Número de elementos por página
    currentPage = 1; 
    totalItems = 0;    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['Fecha', 'Tipo', 'Numero','Cliente','Total','Select','Print'];
    totalItem: number;  
    total:number;
    dataSource: MatTableDataSource<FacturaSelectView>;
    constructor(private service: FacturaService,
       private router: Router,private dialogRef: MatDialogRef<FacturaSelectComponent>,
       @Inject(MAT_DIALOG_DATA) data) {
        this.idCuenta = data.idCuenta;
        }
  
    ngOnInit(): void
      {
        this.getAll();
      }
  
    add(item:Factura): void
      {       
       this.service.Current = item;
       this.dialogRef.close({ data: 'ok' });
      }
      getTipoFactura(entity:Factura):string
      {
        return this.service.TipoFactura(entity);
      }  
    getAll():void
      {
        this.service.findByIdCuenta(this.idCuenta)
        .subscribe(res => {          
          this.dataSource = new MatTableDataSource(res.map(factura => new FacturaSelectView(factura)));
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
      this.totalItems = 0;
      this.total = 0;   
      this.totalItems = this.dataSource.filteredData.reduce((total, item) => total + 1, 0);
      this.dataSource.filteredData.forEach(item => {
        if (item.Tipo === "1" || item.Tipo==="3") {
          // Sumar si el tipo es "1"
          this.total += item.Total;
        } else {
          // Restar si el tipo no es "1"
          this.total -= item.Total;
        }
      });
    }

    select(factura: FacturaSelectView) {      
      factura.Select = !factura.Select; // Cambiar el estado Select      
    }

    anyItemSelected(): boolean {
      return this.dataSource.filteredData.some(factura => factura.Select);
    }

    print(id:string)
    {
      this.service.print(id).subscribe((resultBlob: Blob) => {
        var downloadURL = URL.createObjectURL(resultBlob);
        window.open(downloadURL);});
    }  
  
      close():void
      {
        this.dialogRef.close({ result: 'cancel' });
      }
      aceptar():void
      {
        const selectedFacturas = this.dataSource.filteredData.filter(factura => factura.Select);       
        
        this.dialogRef.close({ result:"ok",selectedFacturas:selectedFacturas });
      }
      cancel():void
      {
        this.dialogRef.close({ result: 'cancel' });
      }
  
  }
  