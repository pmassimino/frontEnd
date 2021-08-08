import { Component, OnInit } from '@angular/core';
import { CuentaMayor } from '../../models/model';
import { CuentaMayorService } from '../../services/cuenta-mayor.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';

@Component({
  selector: 'app-cuenta-mayor-list',
  templateUrl: './cuenta-mayor-list.component.html',
  styleUrls: ['./cuenta-mayor-list.component.css']
})
export class CuentaMayorListComponent implements 
  OnInit {

    data: CuentaMayor[] = [];
      
    constructor(private entityService: CuentaMayorService, private router: Router,private excelService: ExcelService) { }
  
    ngOnInit(): void
      {
        this.getAll();
      }
  
    addNew(): void
      {       
        this.router.navigate(['contable/cuentamayor/add'], { queryParams: { idSuperior: "" } });
      }
      exportToExcel() {
        this.excelService.exportAsExcelFile(this.data, 'Plan De Cuentas');
      }
    edit(id:string)
      {
  
      }
    getAll():void
      {
        this.entityService.findAll()
        .subscribe(res => {this.data = res; } ,
        err => {console.log(err) ; });
      }
      findByName(name): void {       
        this.entityService.findByName(name)
       .subscribe(res => {this.data = res; console.log(this.data); } , err => {console.log(err) ; });
      }
      delete(entity){
        if (confirm("Seguro quiere eliminar  " + entity.Nombre + "?")) {
          var index = this.data.indexOf(entity);
          this.data.splice(index, 1);    
          this.entityService.delete(entity.Id)
            .subscribe(null,
              err => {
                alert("El item no se puede eliminar.");
                // Revert the view back to its original state
                this.data.splice(index, 0, entity);
              });
        }
      }

}
