import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../../../core/services/excel.service';
import { MovCtaCteView } from '../../models/model';
import { MovCtaCteService } from '../../services/mov-cta-cte.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  idCuenta:string;
  idCuentaMayor:string;
  fecha: Date =  new Date();

  fechaHasta: Date = new Date();
  entity : MovCtaCteView[]=[]; 
  
  constructor(private entityService: MovCtaCteService, private router: Router,private excelService: ExcelService,private route: ActivatedRoute) { }
  
  ngOnInit(): void {    
    this.fecha.setDate(this.fecha.getDate() - 30);    
    this.idCuenta = this.route.snapshot.params['id'];
    this.idCuentaMayor = this.route.snapshot.queryParams['idCuentaMayor'];
    this.popupData();
  } 
  popupData()
  {
    this.entityService.resumen(this.idCuenta,this.idCuentaMayor,this.fecha,this.fechaHasta).subscribe(res=>this.entity = res)
  }
  findByName(name): void 
  {       
    
  }
  onPrint():void
   {    
    this.entityService.print(this.idCuenta,this.idCuentaMayor,this.fecha,this.fechaHasta).subscribe((resultBlob: Blob) => {
    var downloadURL = URL.createObjectURL(resultBlob);
    window.open(downloadURL);});
  } 

}
