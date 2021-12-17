import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';
import { ReciboCtaCte } from '../../models/model';
import { ReciboCtaCteService } from '../../services/recibo-cta-cte.service';

@Component({
  selector: 'app-recibo-cta-cte-list',
  templateUrl: './recibo-cta-cte-list.component.html',
  styleUrls: ['./recibo-cta-cte-list.component.css']
})
export class ReciboCtaCteListComponent implements OnInit {

  data: ReciboCtaCte[] = [];
      
    constructor(private entityService:ReciboCtaCteService, private router: Router,private excelService: ExcelService) { }
  
    ngOnInit(): void
      {
        this.getAll();
      }
  
    addNew(): void
      {       
        this.router.navigate(['tesoreria/reciboctacte/add']);
      }
      exportToExcel() {
        this.excelService.exportAsExcelFile(this.data, 'ReciboCtaCte');
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
    print(id:string)
      {
      this.entityService.print(id).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
      }  
      findByName(name): void {       
        this.entityService.findByName(name)
       .subscribe(res => {this.data = res; console.log(this.data); } , err => {console.log(err) ; });
      }
      delete(entity){
        if (confirm("Seguro quiere eliminar  " + entity.Nombre + "?")) {
          var index = this.data.indexOf(entity);              
          this.entityService.delete(entity.Id)
            .subscribe(res=>this.data.splice(index, 1),
              err => {
                alert("El item no se puede eliminar.");
                // Revert the view back to its original state
               // this.data.splice(index, 0, entity);
              });
        }
      }


}
