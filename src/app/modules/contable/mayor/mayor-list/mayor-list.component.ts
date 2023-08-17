import { Component, OnInit, ViewChild } from '@angular/core';
import { DetalleMayor, Mayor } from '../../models/model';
import { MayorService } from '../../services/mayor.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ParamBase } from '../../../../core/models/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mayor-list',
  templateUrl: './mayor-list.component.html',
  styleUrls: ['./mayor-list.component.css']
})
export class MayorListComponent implements OnInit {

    entityList: Mayor[] = [];
    entityFiltredList: Mayor[] = [];
    form :  UntypedFormGroup;
    param : ParamBase = new ParamBase();
     //Paginacion
    pageSize = 14; // Número de elementos por página
    currentPage = 1; 
    totalItems = 0;
    total = 0;
    dataSource: MatTableDataSource<Mayor>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['Fecha', 'Numero', 'Concepto','Importe','Edit'];  
    constructor(private service: MayorService, private router: Router,private excelService: ExcelService) 
    {
      this.createForm();   
     }
     
    addNew(): void
      {       
        this.router.navigate(['contable/mayor/add'] );
      }
      exportToExcel() {
        this.excelService.exportAsExcelFile(this.entityFiltredList, 'Mayor');
      }
    edit(id:string)
      {
  
      }
      ngOnInit(): void {   
        this.onSubmit();
      }
      onSubmit():void
      {     
          this.param =   this.form.value;    
          this.service.diario(this.param.Fecha,this.param.FechaHasta)
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
      calcular():void
      {
        this.total = this.dataSource.filteredData.reduce((total, item) => {
          const importeToSum = item.Detalle
            .filter(detalle => detalle.IdTipo === '1')
            .reduce((subtotal, detalle) => subtotal + detalle.Importe, 0);
          
          return total + importeToSum;
        }, 0);
      }
      calculateTotalDebe(detalles: DetalleMayor[]): number {
       
        const result =  detalles
              .filter(detalle => detalle.IdTipo === '1')
              .reduce((total, detalle) => total + detalle.Importe, 0);
        return result;
      }   
      findByName(name): void {       
        this.dataSource.filter = name.trim().toLowerCase();
        this.calcular();    
      }
    
      delete(entity){
        if (confirm("Seguro quiere eliminar  " + entity.Nombre + "?")) {
          var index = this.entityFiltredList.indexOf(entity);
          this.entityFiltredList.splice(index, 1);    
          this.service.delete(entity.id)
            .subscribe(null,
              err => {
                alert("El item no se puede eliminar.");
                // Revert the view back to its original state
                this.entityFiltredList.splice(index, 0, entity);
              });
        }
      }


}
