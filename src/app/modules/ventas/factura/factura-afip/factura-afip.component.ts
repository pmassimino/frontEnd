import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoFactura } from '../../../global/models/models/model';
import { TipoFacturaService } from '../../../global/services/tipo-factura.service';
import { Factura } from '../../models/model';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-factura-afip',
  templateUrl: './factura-afip.component.html',
  styleUrls: ['./factura-afip.component.css']
})
export class FacturaAFIPComponent implements OnInit {
  entity: Factura ;
  id:string;
  form :  UntypedFormGroup;
  errors = [];
  tipoFactura:TipoFactura[] = [];  
  constructor(private router: Router,private route: ActivatedRoute,private service:FacturaService,private tipoFacturaService:TipoFacturaService,
    private formBuilder: UntypedFormBuilder,@Inject(MAT_DIALOG_DATA)  data,private dialogRef: MatDialogRef<FacturaAFIPComponent>) 
  {
    this.id = data.id;
  }

  ngOnInit(): void {
    
    
    if(this.id)
    { 
      this.popupData();
      this.getById(this.id);           
    }
    
  }
  popupData():void
  {
    this.tipoFacturaService.findAll().subscribe(res => { this.tipoFactura = res; }, err => {console.log(err); });
  }
  getById(id):void
    {
      this.service.findOne(id).subscribe(res=>{this.entity = res;this.createForm();});
    }
  goBack():void
  {
    this.dialogRef.close();
  }
  goEdit(id)
  {
    this.dialogRef.close();
    this.router.navigate(['ventas/factura/',id]);
  }
  onSubmit():void
  {
    this.errors = [];
    this.service.autorizar(this.entity.Id).subscribe(data => {this.goEdit(this.id);}, 
    error => {console.log(error);for(var tKey in error.error) this.errors.push({name: tKey, value: error.error[tKey]});});

  }
  createForm():void
      {
        this.form = this.formBuilder.group({
        Id: new UntypedFormControl(this.entity.Id),
        IdEmpresa: new UntypedFormControl(this.entity.IdEmpresa),
        IdSucursal: new UntypedFormControl(this.entity.IdSucursal),
        IdArea: new UntypedFormControl(this.entity.IdArea),
        IdSeccion: new UntypedFormControl(this.entity.IdSeccion),
        IdTransaccion: new UntypedFormControl(this.entity.IdTransaccion),
        IdMoneda: new UntypedFormControl(this.entity.IdMoneda),
        Letra: new UntypedFormControl(this.entity.Letra),
        Fecha: new UntypedFormControl(this.entity.Fecha),        
        FechaVencimiento: new UntypedFormControl(this.entity.FechaVencimiento),        
        Pe: new UntypedFormControl(this.entity.Pe),
        Numero: new UntypedFormControl(this.entity.Numero),
        Tipo: new UntypedFormControl(this.entity.Tipo),
        TotalNeto: new UntypedFormControl(this.entity.TotalNeto),
        TotalDescuento: new UntypedFormControl(this.entity.TotalDescuento),
        TotalGravado: new UntypedFormControl(this.entity.TotalGravado),
        TotalNoGravado: new UntypedFormControl(this.entity.TotalNoGravado),
        TotalExento: new UntypedFormControl(this.entity.TotalExento),
        TotalIva: new UntypedFormControl(this.entity.TotalIva),
        TotalOTributos: new UntypedFormControl(this.entity.TotalOTributos),
        Total: new UntypedFormControl(this.entity.Total),
            });
    }

}
