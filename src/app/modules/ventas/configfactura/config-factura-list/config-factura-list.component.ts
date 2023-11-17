import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigFactura } from '../../models/model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfigFacturaService } from '../../services/config-factura.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config-factura-list',
  templateUrl: './config-factura-list.component.html',
  styleUrls: ['./config-factura-list.component.css']
})
export class ConfigFacturaListComponent {
  
  //Paginacion
   pageSize = 14; // Número de elementos por página
   currentPage = 1; 
   totalItems = 0;
   dataSource: MatTableDataSource<ConfigFactura>;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   displayedColumns = ['Id','Nombre','Edit'];
   constructor(private service:ConfigFacturaService,private route: ActivatedRoute,private router: Router) 
   {
    
   }
   ngOnInit(): void {   
     this.onSubmit();
   }
   onSubmit():void
   {     
       this.service.findAll()
       .subscribe(res=>{this.dataSource = new MatTableDataSource(res);this.configTable();this.calcular();})    
   }
   configTable() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
   onPrint():void
   {
    
   }
   addNew(): void
       {       
         this.router.navigate(['ventas/configfactura/add'] );
       }
   findByName(name): void {       
     this.dataSource.filter = name.trim().toLowerCase();
     this.calcular();    
   }
   
   calcular():void
   {
   
   }   

}
