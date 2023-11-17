import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PuntoEmision } from '../../models/model';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { PuntoEmisionService } from '../../services/punto-emision.service';

@Component({
  selector: 'app-punto-emision-list',
  templateUrl: './punto-emision-list.component.html',
  styleUrls: ['./punto-emision-list.component.css']
})
export class PuntoEmisionListComponent {
   //Paginacion
   pageSizeOptions = "[15, 25, 50, 100]";
   dataSource: MatTableDataSource<PuntoEmision>;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   displayedColumns = ['Id','Nombre', 'Numero','Edit'];
   constructor(private service:PuntoEmisionService,private route: ActivatedRoute,private router: Router) 
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
         this.router.navigate(['ventas/puntoemision/add'] );
       }
   findByName(name): void {       
     this.dataSource.filter = name.trim().toLowerCase();
     this.calcular();    
   }
   
   calcular():void
   {
   
   }   
 

}
