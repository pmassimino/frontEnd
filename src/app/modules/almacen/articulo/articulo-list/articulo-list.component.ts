import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/model';
import { ArticuloService } from '../../services/articulo.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';


@Component({
  selector: 'app-articulo-list',
  templateUrl: './articulo-list.component.html',
  styleUrls: ['./articulo-list.component.css']
})
export class ArticuloListComponent implements OnInit {

    articuloData: Articulo[] = [];
    

    constructor(private articuloApi: ArticuloService, private router: Router,private excelService: ExcelService) { }

    ngOnInit(): void
      {
        this.getAll();
      }

    addNew(): void
      {       
        this.router.navigate(['almacen/articulo/add']);
      }
    edit(id:string)
      {

      }
    getAll():void
      {
        this.articuloApi.findAll()
        .subscribe(res => {this.articuloData = res; } ,
        err => {console.log(err) ; });
      }
      findByName(name): void {       
        this.articuloApi.findByName(name)
       .subscribe(res => {this.articuloData = res; console.log(this.articuloData); } , err => {console.log(err) ; });
      }
      delete(articulo){
        if (confirm("Are you sure you want to delete " + articulo.nombre + "?")) {
          var index = this.articuloData.indexOf(articulo);
          this.articuloData.splice(index, 1);
    
          this.articuloApi.delete(articulo.id)
            .subscribe(null,
              err => {
                alert("El articulo no se puede eliminar.");
                // Revert the view back to its original state
                this.articuloData.splice(index, 0, articulo);
              });
        }
      }
      exportToExcel() {
        this.excelService.exportAsExcelFile(this.articuloData, 'articulos');
      }
}
