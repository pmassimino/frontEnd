import { Component, ViewChild } from '@angular/core';
import { MailServer } from '../../services/models/model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MailServerService } from '../../services/mail-server.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mail-server-list',
  templateUrl: './mail-server-list.component.html',
  styleUrls: ['./mail-server-list.component.css']
})
export class MailServerListComponent {
  
 //Paginacion
  pageSize = 14; // Número de elementos por página
  currentPage = 1; 
  totalItems = 0;
  dataSource: MatTableDataSource<MailServer>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Id','Nombre', 'email','Edit'];
  constructor(private service:MailServerService,private route: ActivatedRoute,private router: Router) 
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
        this.router.navigate(['mail/mailserver/add'] );
      }
  findByName(name): void {       
    this.dataSource.filter = name.trim().toLowerCase();
    this.calcular();    
  }
  
  calcular():void
  {
  
  }   

}
