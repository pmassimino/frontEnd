import { Component, OnInit, ViewChild } from '@angular/core';
import { Factura } from '../../models/model';
import { FacturaService } from '../../services/factura.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ParamBase } from '../../../../core/models/common';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css']
})
export class FacturaListComponent implements OnInit {
  
  form :  UntypedFormGroup;
  param : ParamBase = new ParamBase;
  //Paginacion
  pageSize = 14; // Número de elementos por página
  currentPage = 1; 
  totalItems = 0;
  dataSource: MatTableDataSource<Factura>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Fecha', 'Tipo', 'Numero','Cliente','Total','Edit','Print','Delete'];
  totalItem: number;  
  total:number;
    
  constructor(private service: FacturaService, 
    private router: Router,private excelService: ExcelService) {
      this.createForm();
     }

  ngOnInit(): void
    {
      this.onSubmit();
      this.calcular();
    }
    onSubmit():void
    {
        this.param =   this.form.value;    
        this.service.listView(this.param.Fecha,this.param.FechaHasta)
        .subscribe(res=>{this.dataSource = new MatTableDataSource(res);this.configTable();this.calcular();})  
    }
    createForm():void
  {
      this.form = new UntypedFormGroup({
      Fecha: new UntypedFormControl(this.param.Fecha,Validators.required),
      FechaHasta: new UntypedFormControl(this.param.FechaHasta,Validators.required)});
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


  addNew(): void
    {       
      this.router.navigate(['ventas/factura/add']);
    }
    exportToExcel() {
      this.excelService.exportAsExcelFile(this.dataSource.filteredData, 'factura');
    }
  edit(id:string)
    {

    }
  
  getTipoFactura(entity:Factura):string
  {
    return this.service.TipoFactura(entity);
  }  
  print(id:string)
  {
    this.service.print(id).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
  }  
  
  delete(entity){
      if (confirm("Seguro quiere eliminar  " + entity.nombre + "?")) {
        var index = this.dataSource.filteredData.indexOf(entity);
        this.dataSource.filteredData.splice(index, 1);    
        this.service.delete(entity.Id)
          .subscribe(null,
            err => {
              alert("El item no se puede eliminar.");
              // Revert the view back to its original state
              this.dataSource.filteredData.splice(index, 0, entity);
            });
      }
    }

}
