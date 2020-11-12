import { Component, OnInit } from '@angular/core';
import { Familia } from '../../models/model';
import { FamiliaService } from '../../services/familia.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';

@Component({
  selector: 'app-familia-list',
  templateUrl: './familia-list.component.html',
  styleUrls: ['./familia-list.component.css']
})
export class FamiliaListComponent implements OnInit {

    data: Familia[] = [];
    
    constructor(private entityService: FamiliaService, private router: Router,private excelService: ExcelService) { }

    ngOnInit(): void
      {
        this.getAll();
      }

    addNew(): void
      {       
        this.router.navigate(['almacen/familia/add']);
      }
      exportToExcel() {
        this.excelService.exportAsExcelFile(this.data, 'familia');
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
        if (confirm("Seguro quiere eleminar  " + entity.nombre + "?")) {
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
