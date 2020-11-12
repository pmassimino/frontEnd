import { Component, OnInit } from '@angular/core';
import { SujetoService } from '../../services/sujeto.service';
import { Router } from '@angular/router';
import { Sujeto } from '../../models/model';
import { ExcelService } from '../../../../core/services/excel.service';

@Component({
  selector: 'app-sujeto-list',
  templateUrl: './sujeto-list.component.html',
  styleUrls: ['./sujeto-list.component.css']
})
export class SujetoListComponent implements OnInit {

  data: Sujeto[] = [];
    
  constructor(private entityService: SujetoService, private router: Router,private excelService: ExcelService) { }

  ngOnInit(): void
    {
      this.getAll();
    }

  addNew(): void
    {       
      this.router.navigate(['comun/sujeto/add']);
    }
    exportToExcel() {
      this.excelService.exportAsExcelFile(this.data, 'sujeto');
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
      if (confirm("Seguro quiere eliminar  " + entity.nombre + "?")) {
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
