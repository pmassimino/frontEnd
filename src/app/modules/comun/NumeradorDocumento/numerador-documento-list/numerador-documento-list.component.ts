import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NumeradorDocumento } from '../../models/model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { NumeradorDocumentoService } from '../../services/numerador-documento.service';

@Component({
  selector: 'app-numerador-documento-list',
  templateUrl: './numerador-documento-list.component.html',
  styleUrls: ['./numerador-documento-list.component.css']
})
export class NumeradorDocumentoListComponent implements OnInit {

  //Paginacion
  pageSize = 14; // Número de elementos por página
  currentPage = 1; 
  totalItems = 0;
  dataSource: MatTableDataSource<NumeradorDocumento>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Id','Nombre', 'Numero','Edit'];
  constructor(private service:NumeradorDocumentoService,private route: ActivatedRoute,private router: Router) 
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
        this.router.navigate(['comun/numeradordocumento/add'] );
      }
  findByName(name): void {       
    this.dataSource.filter = name.trim().toLowerCase();
    this.calcular();    
  }
  
  calcular():void
  {
  
  }   

}
