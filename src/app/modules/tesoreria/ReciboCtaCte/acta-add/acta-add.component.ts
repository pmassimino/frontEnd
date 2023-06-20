import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleComprobante } from '../../models/model';
import { ReciboCtaCteService } from '../../services/recibo-cta-cte.service';
import { ComprobanteAddComponent } from '../comprobante-add/comprobante-add.component';

@Component({
  selector: 'app-acta-add',
  templateUrl: './acta-add.component.html',
  styleUrls: ['./acta-add.component.css']
})
export class ACtaAddComponent implements OnInit {

  form :  FormGroup;
  formBuilder: any;
  idCuentaMayor:string;
  totalSaldo:number = 0;
  constructor(private service : ReciboCtaCteService,private route: ActivatedRoute,
    private router: Router,private dialogRef: MatDialogRef<ComprobanteAddComponent>,
    @Inject(MAT_DIALOG_DATA) data)
    {
      this.idCuentaMayor = data.idCuentaMayor;
      this.totalSaldo = data.totalSaldo;
    }
  ngOnInit(): void {
    this.createForm();
  }
  createForm():void
  {
    this.form = new FormGroup({   
    Concepto: new FormControl("A Cuenta",Validators.required),
    Importe: new FormControl(this.totalSaldo,Validators.required)   
  });
 }
 onSubmit() : void
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
  if(this.form.get("Importe").value > 0)
     {
      result = true;
     }   
  return result;
  }

  tranformData():void
  {   
    var result:DetalleComprobante[]=this.service.DetalleComprobante;
    var item:DetalleComprobante= new DetalleComprobante();
    item.IdTipo = "1"; //Debito
    item.IdMovCtaCte = "00000000-0000-0000-0000-000000000000";
    item.Pe = 0;
    item.Numero=0;
    item.IdTipoComp = "2"; //A Cta.
    item.Importe = +this.form.get("Importe").value;
    item.Item = 0;  
    const now = new Date();  
    item.Fecha =  now.toDateString();    
    item.Concepto = this.form.get("Concepto").value;
    result.push(item);
    this.service.DetalleComprobante = result;
  }

}
