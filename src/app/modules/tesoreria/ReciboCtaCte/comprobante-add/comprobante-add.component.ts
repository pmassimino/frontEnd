import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { isTypeNode } from 'typescript';
import { ComprobantesDisponible, DetalleComprobante } from '../../models/model';
import { ReciboCtaCteService } from '../../services/recibo-cta-cte.service';

@Component({
  selector: 'app-comprobante-add',
  templateUrl: './comprobante-add.component.html',
  styleUrls: ['./comprobante-add.component.css']
})
export class ComprobanteAddComponent implements OnInit {

  entityData: ComprobantesDisponible[] = [];
  private idCuenta:string;
  private idCuentaMayor:string;
  form :  UntypedFormGroup;
    

constructor(private service : ReciboCtaCteService,private route: ActivatedRoute,
    private router: Router,private dialogRef: MatDialogRef<ComprobanteAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,private formBuilder: UntypedFormBuilder)
    {
      this.idCuenta = data.idCuenta;
      this.idCuentaMayor = data.idCuentaMayor;
      this.getAll();
    }

ngOnInit(): void
   {
       
   this.getAll();
   }
createForm():void
   {
   this.form = new UntypedFormGroup({
    ComprobanteDisponible:this.formBuilder.array([],Validators.required)});        
   }

addIten(item : ComprobantesDisponible):UntypedFormGroup {          
   let i = this.entityData.length;
   let itemGrp =  this.formBuilder.group({
   Id: new UntypedFormControl(item.Id),
   Item:new UntypedFormControl(i),
   IdTipo: new UntypedFormControl(item.IdTipo),
   IdTipoComp: new UntypedFormControl("1"),
   IdMovCtaCte: new UntypedFormControl(item.IdMovCtaCte),
   Fecha: new UntypedFormControl(item.Fecha),
   Pe: new UntypedFormControl(item.Pe),
   Numero: new UntypedFormControl(item.Numero),
   Concepto: new UntypedFormControl(item.Concepto),
   Importe: new UntypedFormControl(item.Importe),
   ImporteDisponible: new UntypedFormControl(item.ImporteDisponible),
   ImporteAsignar: new UntypedFormControl(item.ImporteAsignar),
   Select: new UntypedFormControl(item.Select)          
   });            
   itemGrp.get("Item").patchValue(this.ComprobanteDisponible.length);    
       
  this.ComprobanteDisponible.push(itemGrp);
        
        
  return itemGrp;
}
get ComprobanteDisponible(): UntypedFormArray {
   return this.form.get('ComprobanteDisponible') as UntypedFormArray;
}

add(i:number):void
{
  var item = <UntypedFormGroup>this.ComprobanteDisponible.controls[i];
  let select = this.ComprobanteDisponible.at(i).get('Select').value;
  let importeDisponible = this.ComprobanteDisponible.at(i).get('ImporteDisponible').value;  
  if (select)
  {
    this.ComprobanteDisponible.at(i).get('ImporteAsignar').setValue(importeDisponible);
  }
  else
  {
    this.ComprobanteDisponible.at(i).get('ImporteAsignar').setValue(0);
  }
}
    
getAll():void
{
   this.service.ComprobantesDisponibles(this.idCuenta,this.idCuentaMayor)
   .subscribe(res => {this.entityData = res;this.createForm();res.map(item=>this.addIten(item)); } ,
   err => {console.log(err) ; });
 }
findByName(name): void {       
   this.entityData.filter(w=>w.Concepto==name);
 }
onSubmit():void
 {
  this.tranformData();
  this.dialogRef.close({ data: 'ok' });
 }
 onClose():void
 {
    this.dialogRef.close({ data: 'cancel' });
 }
      
 isFormValid():boolean
   {
    var result:boolean = false;
    this.ComprobanteDisponible.controls.forEach(function (value) {
    if(value.get("Select").value==true)
       {
        result = true;
       }
    }); 
    return result;
    }
  
  tranformData():void
  {
    var result:DetalleComprobante[]=[];
    this.ComprobanteDisponible.controls.forEach(function (control) {
      if(control.get("Select").value==true)
         {var item:DetalleComprobante= new DetalleComprobante();
          item.IdMovCtaCte = control.get("IdMovCtaCte").value;
          item.IdTipo = control.get("IdTipo").value;
          item.IdTipoComp = control.get("IdTipoComp").value;
          item.Importe = control.get("ImporteAsignar").value;
          item.Item = control.get("Item").value;
          item.Pe = control.get("Pe").value;
          item.Fecha =  control.get("Fecha").value;
          item.Numero = control.get("Numero").value; 
          item.Concepto = control.get("Concepto").value;
          result.push(item);          
         }
      }); 
      this.service.DetalleComprobante = result;
  }

}
