import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { Articulo } from '../../models/model';
import { ArticuloService } from '../../services/articulo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';

@Component({
  selector: 'app-articulo-list-mat',
  templateUrl: './articulo-list-mat.component.html',
  styleUrls: ['./articulo-list-mat.component.css']
})
export class ArticuloListMatComponent implements OnInit {
  dataList: Articulo[] = [];  
  dataSource: MatTableDataSource<Articulo>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Id', 'Nombre', 'PrecioVentaFinal','Edit'];
  constructor(private service: ArticuloService,private router: Router,private route: ActivatedRoute,private excelService: ExcelService) { }

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

  edit(item:Articulo)
  {
    this.router.navigate(['../' + item.Id],{relativeTo: this.route});
    
  }

  addNew(): void
      {       
        this.router.navigate(['almacen/articulo/add']);
      }

  exportToExcel() {
    this.excelService.exportAsExcelFile(this.dataSource.data, 'articulos');
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
