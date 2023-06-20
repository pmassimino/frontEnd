import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TransaccionService } from '../../../comun/services/transaccion.service';
import { LibroIvaView } from '../../models/model';
import { LibroIvaService } from '../../services/libro-iva.service';

@Component({
  selector: 'app-libro-iva-list',
  templateUrl: './libro-iva-list.component.html',
  styleUrls: ['./libro-iva-list.component.css']
})
export class LibroIvaListComponent implements OnInit {  
  paramForm:LibroIvaParam;
  form :  UntypedFormGroup;
  fecha:Date;
  fechaHasta:Date;
  tipo:string="V";
  filtraAutorizado: boolean=true;
  autorizado:boolean=true;
  entityList:LibroIvaView[]=[];
  totalGravado:number=0;
  totalNoGravado:number=0;
  totalExento:number=0;
  totalIva105:number=0;
  totalIva21:number=0;
  totalIva27:number=0;
  totalIvaOtro:number=0;
  totalOtrosTributos:number=0;
  total:number=0;
 
  constructor(private libroIvaService:LibroIvaService,private transaccionService:TransaccionService,private formBuilder: UntypedFormBuilder) 
  {
    var today:Date= new Date;
    var month = today.getMonth()
    var year = today.getFullYear()
    this.fecha = new Date(year,month,1)
    this.fechaHasta = new Date(year,month + 1,0);
    this.paramForm = new LibroIvaParam();
    this.paramForm.Fecha = this.fecha.toDateString();
    this.paramForm.FechaHasta = this.fechaHasta.toDateString();    
  }

  createForm():void
  {
    this.form = this.formBuilder.group({
      Tipo: new UntypedFormControl(this.paramForm.Tipo,Validators.required),
      Fecha: new UntypedFormControl(this.paramForm.Fecha,Validators.required),
      FechaHasta: new UntypedFormControl(this.paramForm.FechaHasta,Validators.required),
      FiltrarAutorizado: new UntypedFormControl(this.paramForm.FiltrarAutorizado),
      Autorizado: new UntypedFormControl(this.paramForm.Autorizado)});
  }

  ngOnInit(): void {
    this.onGetAll();
  }
  onGetAll():void
  {
    if(this.tipo=="V")
    {
      this.libroIvaService.ventas(this.fecha,this.fechaHasta,this.filtraAutorizado,this.autorizado)
      .subscribe(res=>{this.entityList=res;this.calcular();})
    }
    if(this.tipo=="C")
    {
      this.libroIvaService.compras(this.fecha,this.fechaHasta,this.filtraAutorizado,this.autorizado)
      .subscribe(res=>{this.entityList=res;this.calcular();})
    }
    
  }
  onPrint():void
  {
    this.libroIvaService.print(this.tipo,this.fecha,this.fechaHasta,this.filtraAutorizado,this.autorizado).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
  }
  onPrintItem(item:LibroIvaView):void  
  {
    this.transaccionService.print(item.IdTransaccion).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
  }
  calcular():void
  {
    this.totalGravado = 0;
    this.totalNoGravado = 0;
    this.totalExento=0;
    this.totalIva105 = 0;
    this.totalIva21 = 0;
    this.totalIva27 = 0;
    this.totalIvaOtro = 0;
    this.totalOtrosTributos = 0;
    this.total = 0;
    this.entityList.map(a=>this.totalGravado += a.Gravado );
    this.entityList.map(a=>this.totalNoGravado += a.NoGravado );
    this.entityList.map(a=>this.totalExento += a.Exento );
    this.entityList.map(a=>this.totalIva105 += a.Iva105 );
    this.entityList.map(a=>this.totalIva21 += a.Iva21 );
    this.entityList.map(a=>this.totalIva27 += a.Iva27 );
    this.entityList.map(a=>this.totalIvaOtro += a.IvaOtro );
    this.entityList.map(a=>this.totalOtrosTributos += a.OtrosTributos );
    this.entityList.map(a=>this.total += a.Total);
  }
  parseFecha(dateString: string): void 
  {
    if (dateString) {
        dateString.replace("-","/");
        this.fecha =  new Date(dateString);
    }    
  }
  parseFechaHasta(dateString: string): void
  {
  if (dateString) {
      dateString = this.replaceAll(dateString,"-","/");
      this.fechaHasta =  new Date(dateString);
  }    
}

replaceAll(str, find, replace):string {
  var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, 'g'), replace);
}

}
export class LibroIvaParam
{
  Tipo:String="V";
  Fecha: string;
  FechaHasta:string;
  FiltrarAutorizado:boolean=true;
  Autorizado:Boolean=true;
}

