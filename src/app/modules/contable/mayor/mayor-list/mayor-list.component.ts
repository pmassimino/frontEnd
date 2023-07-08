import { Component, OnInit } from '@angular/core';
import { Mayor } from '../../models/model';
import { MayorService } from '../../services/mayor.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';

@Component({
  selector: 'app-mayor-list',
  templateUrl: './mayor-list.component.html',
  styleUrls: ['./mayor-list.component.css']
})
export class MayorListComponent implements OnInit {

    entityList: Mayor[] = [];
    entityFiltredList: Mayor[] = [];
      
    constructor(private entityService: MayorService, private router: Router,private excelService: ExcelService) { }
  
    ngOnInit(): void
      {
        this.getAll();
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
    getAll():void
      {
        this.entityService.findAll()
        .subscribe(res => {this.entityList = res;this.entityFiltredList=res; } ,
        err => {console.log(err) ; });
      }
      findByName(name): void {       
        this.entityFiltredList = this.entityList.filter(f =>
          f.Concepto.toLowerCase().includes(name.toLowerCase()) ||
          f.Numero.toString().toLowerCase().includes(name.toLowerCase()) ||
          f.Detalle.some(detalle => detalle.Concepto.toLowerCase().includes(name.toLowerCase())));
        
      }
      delete(entity){
        if (confirm("Seguro quiere eliminar  " + entity.Nombre + "?")) {
          var index = this.entityFiltredList.indexOf(entity);
          this.entityFiltredList.splice(index, 1);    
          this.entityService.delete(entity.id)
            .subscribe(null,
              err => {
                alert("El item no se puede eliminar.");
                // Revert the view back to its original state
                this.entityFiltredList.splice(index, 0, entity);
              });
        }
      }


}
