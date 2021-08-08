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

    data: Mayor[] = [];
      
    constructor(private entityService: MayorService, private router: Router,private excelService: ExcelService) { }
  
    ngOnInit(): void
      {
        this.getAll();
      }
  
    addNew(): void
      {       
        this.router.navigate(['contable/mayor/add'], { queryParams: { idSuperior: "" } });
      }
      exportToExcel() {
        this.excelService.exportAsExcelFile(this.data, 'Mayor');
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
          this.entityService.delete(entity.id)
            .subscribe(null,
              err => {
                alert("El item no se puede eliminar.");
                // Revert the view back to its original state
                this.data.splice(index, 0, entity);
              });
        }
      }


}
