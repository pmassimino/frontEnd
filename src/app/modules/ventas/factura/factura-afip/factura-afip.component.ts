import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  form :  FormGroup;
  errors = [];
  tipoFactura:TipoFactura[] = [];  
  constructor(private router: Router,private route: ActivatedRoute,private service:FacturaService,private tipoFacturaService:TipoFacturaService,
    private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA)  data,private dialogRef: MatDialogRef<FacturaAFIPComponent>) 
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
        Id: new FormControl(this.entity.Id),
        IdEmpresa: new FormControl(this.entity.IdEmpresa),
        IdSucursal: new FormControl(this.entity.IdSucursal),
        IdArea: new FormControl(this.entity.IdArea),
        IdSeccion: new FormControl(this.entity.IdSeccion),
        IdTransaccion: new FormControl(this.entity.IdTransaccion),
        IdMoneda: new FormControl(this.entity.IdMoneda),
        Letra: new FormControl(this.entity.Letra),
        Fecha: new FormControl(this.entity.Fecha),        
        FechaVencimiento: new FormControl(this.entity.FechaVencimiento),        
        Pe: new FormControl(this.entity.Pe),
        Numero: new FormControl(this.entity.Numero),
        Tipo: new FormControl(this.entity.Tipo),
        TotalNeto: new FormControl(this.entity.TotalNeto),
        TotalDescuento: new FormControl(this.entity.TotalDescuento),
        TotalGravado: new FormControl(this.entity.TotalGravado),
        TotalNoGravado: new FormControl(this.entity.TotalNoGravado),
        TotalExento: new FormControl(this.entity.TotalExento),
        TotalIva: new FormControl(this.entity.TotalIva),
        TotalOTributos: new FormControl(this.entity.TotalOTributos),
        Total: new FormControl(this.entity.Total),
            });
    }

}
