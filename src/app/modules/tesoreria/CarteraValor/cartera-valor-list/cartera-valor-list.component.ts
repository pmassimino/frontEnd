import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransaccionService } from '../../../comun/services/transaccion.service';
import { CarteraValorView } from '../../models/model';
import { CarteraValorService } from '../../services/cartera-valor.service';

@Component({
  selector: 'app-cartera-valor-list',
  templateUrl: './cartera-valor-list.component.html',
  styleUrls: ['./cartera-valor-list.component.css']
})
export class CarteraValorListComponent implements OnInit {

  paramForm:CarteraValorParam;
  form :  FormGroup;
  fecha:Date;
  fechaHasta:Date;
  tipo:string="V";
  filtraAutorizado: boolean=true;
  autorizado:boolean=true;
  entityList:CarteraValorView[]=[]; 
  total:number=0;
 
  constructor(private service:CarteraValorService,private transaccionService:TransaccionService,private formBuilder: FormBuilder) 
  {
    var today:Date= new Date;
    var month = today.getMonth();
    var year = today.getFullYear();
    var day = today.getUTCDay();
    //this.fecha = new Date(year,month,day)
    this.fecha = new Date(today)
    this.fechaHasta = new Date(year,month + 1,0);
    this.paramForm = new CarteraValorParam();
    this.paramForm.Fecha = this.fecha;
    this.paramForm.Estado = "ACTIVO";
    this.createForm();
  }

  createForm():void
  {
    this.form = this.formBuilder.group({
      Estado: new FormControl(this.paramForm.Estado),
      Fecha: new FormControl(this.paramForm.Fecha,Validators.required)});
  }

  ngOnInit(): void {
    this.onGetAll();
  }
  onGetAll():void
  {   
   var fecha = this.form.get("Fecha").value;
   var estado = this.form.get("Estado").value
    this.service.listView(fecha,estado)
    .subscribe(res=>{this.entityList=res;this.calcular();})
    
  }
  onPrint():void
  {
    
  }
  onPrintItem(item:CarteraValorView):void  
  {
    this.transaccionService.print(item.IdTransaccion).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
  }
  calcular():void
  {    
    this.total = 0;    
    this.entityList.map(a=>this.total += a.Importe);
  }
  parseFecha(dateString: string): void 
  {
    if (dateString) {
        dateString.replace("-","/");
        //this.paramForm.Fecha =  new Date(dateString);
    }    
  }  

}
export class CarteraValorParam
{
  Estado:string="ACTIVO";
  Fecha: Date;  
}



