import { Component, OnInit } from '@angular/core';
import { Factura } from '../../models/model';
import { FacturaService } from '../../services/factura.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css']
})
export class FacturaListComponent implements OnInit {

  data: Factura[] = [];
    
  constructor(private entityService: FacturaService, 
    private router: Router,private excelService: ExcelService) { }

  ngOnInit(): void
    {
      this.getAll();
    }

  addNew(): void
    {       
      this.router.navigate(['ventas/factura/add']);
    }
    exportToExcel() {
      this.excelService.exportAsExcelFile(this.data, 'factura');
    }
  edit(id:string)
    {

    }
  print(id:string)
  {
    this.entityService.print(id).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
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
