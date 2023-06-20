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

   page = 1;   
   itemsPerPage = 15;
   totalItems : number; 
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
        if (this.articuloApi.CurrentList == null)
        {
        this.articuloApi.findAll()
        .subscribe(res => {this.articuloData = res;this.articuloApi.CurrentList = res; this.totalItems=res.length;} ,
        err => {console.log(err) ; });
        }
        else
        {
          this.articuloData = this.articuloApi.CurrentList;
        }
      }
      findByName(name): void {       
        //this.articuloApi.findByName(name)
        //.subscribe(res => {this.articuloData = res; console.log(this.articuloData); } , err => {console.log(err) ; });
       this.articuloData.filter(f=> f.Nombre.toUpperCase().includes(name.toUpperCase()));
       
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
