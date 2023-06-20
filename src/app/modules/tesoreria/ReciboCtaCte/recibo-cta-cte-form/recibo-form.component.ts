import { formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { isTryStatement } from 'typescript';
import { Sujeto } from '../../../comun/models/model';
import { SessionService } from '../../../comun/services/session.service';
import { SujetoService } from '../../../comun/services/sujeto.service';
import { CuentaMayorSelectComponent } from '../../../contable/cuentamayor/cuenta-mayor-select/cuenta-mayor-select.component';
import { CuentaMayor } from '../../../contable/models/model';
import { CuentaMayorService } from '../../../contable/services/cuenta-mayor.service';
import { ComprobantesDisponible, DetalleComprobante, DetalleValores, ReciboCtaCte } from '../../models/model';
import { ReciboCtaCteService } from '../../services/recibo-cta-cte.service';
import { ACtaAddComponent } from '../acta-add/acta-add.component';
import { ComprobanteAddComponent } from '../comprobante-add/comprobante-add.component';

@Component({
  selector: 'app-recibo-form',
  templateUrl: './recibo-form.component.html',
  styleUrls: ['./recibo-form.component.css']
})
export class ReciboCtaCteFormComponent implements OnInit {

form :  FormGroup;
entity: ReciboCtaCte= new ReciboCtaCte();
sujetos:Sujeto[] = [];  
submitted = false;
mode = "new";
id : String = "";
idCuenta:string="";
idCuentaMayor:string = "";
errors = [];
cuentasSubdiario :CuentaMayor[]=[];
totalComprobantes : number=0;
totalValores:number=0;
totalSaldo :number=0;

constructor(private entityService: ReciboCtaCteService,private sujetoService : SujetoService,
            private cuentaMayorService:CuentaMayorService,private sessionServie:SessionService,
            private router: Router,private route: ActivatedRoute,
            private formBuilder: FormBuilder,private dialog: MatDialog)            
            { 
                            
            }


  ngOnInit(): void {
    this.popupData();    
    this.id = this.route.snapshot.params['id'];
    this.idCuenta = this.route.snapshot.params['idCuenta'];
    this.idCuentaMayor = this.route.snapshot.params['idCuentaMayor'];
    //editar
    if(this.id)
    { 
       this.getById(this.id);
       this.mode="edit"
    }
    else //set default values
    {
      this.setDefaultValues();
    }   
    }

  createForm():void
    {
      this.form = new FormGroup({
        Id: new FormControl(this.entity.Id),
        IdEmpresa: new FormControl(this.entity.IdEmpresa),
        IdSucursal: new FormControl(this.entity.IdSucursal),
        IdArea: new FormControl(this.entity.IdArea),
        IdSeccion: new FormControl(this.entity.IdSeccion),
        IdTransaccion: new FormControl(this.entity.IdTransaccion), 
        Pe:new FormControl(this.entity.Pe),
        Numero:new FormControl(this.entity.Numero),
        Fecha:new FormControl(this.entity.Fecha),
        FechaVencimiento:new FormControl(this.entity.FechaVencimiento),        
        IdCuenta: new FormControl(this.entity.IdCuenta),
        IdCuentaMayor: new FormControl(this.entity.IdCuentaMayor),                
        Obs:new FormControl(this.entity.Obs),
        IdTipo: new FormControl(this.entity.IdTipo),    
        Importe:new FormControl(this.entity.Importe),
        DetalleComprobante:this.formBuilder.array([],Validators.required),
        DetalleValores:this.formBuilder.array([],Validators.required),
        DetalleRelacion:this.formBuilder.array([])}); 
        this.onChanges(); 
  }

  addDetalleComprobante(itemDetalle : DetalleComprobante):FormGroup {          
    let item = this.entity.DetalleComprobante.length;
    let itemGrp =  this.formBuilder.group({
      Id: this.entity.Id,
      Item: item,
      IdTipo: new FormControl(itemDetalle.IdTipo,Validators.required),
      IdTipoComp: new FormControl(itemDetalle.IdTipoComp),
      IdMovCtaCte: new FormControl(itemDetalle.IdMovCtaCte),
      Fecha: [formatDate(itemDetalle.Fecha, 'yyyy-MM-dd', 'en'), [Validators.required]],
      Pe: new FormControl(itemDetalle.Pe),
      Numero: new FormControl(itemDetalle.Numero),
      Importe: new FormControl(itemDetalle.Importe),      
      Concepto: new FormControl(itemDetalle.Concepto)      
    });    
    this.detalleComprobante.push(itemGrp);
    this.calculateTotal();
    this.detalleComprobante.valueChanges.subscribe(res=>this.calculateTotal());    
    return itemGrp;
  }
  
  addDetalleValores(itemDetalle : DetalleValores):FormGroup {          
    let item = this.entity.DetalleComprobante.length;
    let itemGrp =  this.formBuilder.group({
      Id: this.entity.Id,
      Item: item,
      IdTipo: new FormControl(itemDetalle.IdTipo,Validators.required),
      IdComp: new FormControl(itemDetalle.IdTipo),
      IdCuentaMayor: new FormControl(itemDetalle.IdCuentaMayor,Validators.required),      
      Concepto: new FormControl(itemDetalle.Concepto),      
      Banco: new FormControl(itemDetalle.Banco),
      Fecha: new FormControl(itemDetalle.Fecha),
      FechaVencimiento: new FormControl(itemDetalle.FechaVencimiento),
      Sucursal: new FormControl(itemDetalle.Sucursal),
      Numero: new FormControl(itemDetalle.Numero),
      Importe: new FormControl(itemDetalle.Importe)
    });    
    this.detalleValores.push(itemGrp);
    this.calculateTotal();
    this.detalleValores.valueChanges.subscribe(res=>this.calculateTotal());    
    return itemGrp;
  }
  get detalleValores(): FormArray {
    return this.form.get('DetalleValores') as FormArray;
  }

  get detalleComprobante(): FormArray {
    return this.form.get('DetalleComprobante') as FormArray;
  }
  onChanges(): void {
    this.form.get('IdCuenta').valueChanges.subscribe(value => {
      this.idCuenta = this.form.get('IdCuenta').value;
    });
  }

  onCuentaMayorChange(id:string):void
  {
    this.idCuentaMayor = id;
  }
  
  removeDetalleComprobante(i:number):void
  {
    this.detalleComprobante.removeAt(i);    
  }
  removeDetalleValor(i:number):void
  {
    this.detalleValores.removeAt(i);    
  }

  calculateTotal()
  {
    this.totalComprobantes = 0;
    this.detalleComprobante.controls.forEach((control) => {      
    var IdTipo = control.get("IdTipo").value;          
    var Importe:number = control.get("Importe").value;          
    this.totalComprobantes += IdTipo==1?Importe:-Importe;                   
    })       
    this.totalValores = 0;
    this.detalleValores.controls.forEach((control) => {      
    var IdTipo = control.get("IdTipo").value;          
    var Importe = control.get("Importe").value;          
    this.totalValores += IdTipo==1?Importe:-Importe;                   
    }) 
    this.totalSaldo = 0;
    this.totalSaldo = (this.totalComprobantes-this.totalValores);    
  }

  popupData():void
  { 
    this.sujetoService.findAll().subscribe(res => { this.sujetos = res; }, err => {console.log(err); });
    this.cuentaMayorService.CuentasSubdiario().subscribe(res=>this.cuentasSubdiario=res);
  }
  setDefaultValues():void
  {
    this.entityService.newDefault().subscribe(res=>
      {
        this.entity=res;
        this.entity.IdArea = this.sessionServie.CurrentArea.Id;
        this.entity.IdSeccion = this.sessionServie.CurrentSeccion.Id;
        this.entity.IdSucursal = this.sessionServie.CurrentSeccion.Id;
        this.entity.IdEmpresa = "001";
        this.entity.Obs = "";
        this.entity.IdTipo = "1";
        this.createForm();        
       },
       err => 
       {
         console.log(err);
        });
       this.entityService.NextNumber(this.sessionServie.CurrentSeccion.Id).subscribe(res=>{this.form.get("Pe").patchValue(res.PuntoEmision);this.form.get("Numero").patchValue(res.Numero);});
  }
  getById(id):void
  {
    this.entityService.findOne(id).subscribe(res=>{this.entity = res,this.createForm();this.popupEntity(res);});
  }
  popupEntity(entity:ReciboCtaCte):void
  {
     entity.DetalleComprobante.forEach(item=>this.addDetalleComprobante(item));
      entity.DetalleValores.forEach(item=>this.addDetalleValores(item));
  }
 new(): void
  {
    this.submitted = false;   
  }
   
  save() 
  {
    if( this.mode=="new"){  //new
    var entity = this.form.value;
    this.entityService.add(entity)
    .subscribe(data => {console.log(data);
               this.goBack();this.submitted = true; }, 
               error => {console.log(error);               
               this.setControlsError(error.error);
               for(var tKey in error.error) this.errors.push({name: tKey, value: error.error[tKey]});               
               }
     );
     }
     else //Edit
     {
      this.entityService.update(this.entity.Id,this.form.value)
      .subscribe(data => {console.log(data);
                 this.goBack();this.submitted = true; }, error => {
                 console.log(error);                 
                 this.setControlsError(error.error);               
                 }
       );
     }
  }
 
  print()
   {
    this.entityService.print(this.entity.Id).subscribe((resultBlob: Blob) => {
    var downloadURL = URL.createObjectURL(resultBlob);
    window.open(downloadURL);});
  } 
  isValidAddComprobante():boolean
  {
    var result = true;
    if (this.form.get("IdCuenta").value == null || this.form.get("IdCuentaMayor").value== null)
    {
      result = false;
    }
    if (this.mode == "edit")
    {
      result = false;
    }
    return result;
  } 
  
  onSubmit() 
  {
     this.save();
  }

  goBack() {
    this.router.navigate(['tesoreria/reciboctacte/list']);
  }

  addComprobanteDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass="dialog-responsive";
    dialogConfig.width='1200px';
    this.idCuenta=this.form.get('IdCuenta').value;
    this.idCuentaMayor = this.form.get('IdCuentaMayor').value;
    dialogConfig.data = {idCuenta:this.idCuenta,idCuentaMayor:this.idCuentaMayor}
    this.dialog.open(ComprobanteAddComponent, dialogConfig).afterClosed()
    .subscribe(response  => {if (response.data=="ok"){this.descargaComprobante()};      
    });
}
addACtaDialog() {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.panelClass="dialog-responsive";
  dialogConfig.width='1200px';
  this.idCuenta=this.form.get('IdCuenta').value;
  this.idCuentaMayor = this.form.get('IdCuentaMayor').value;  
  dialogConfig.data = {idCuenta:this.idCuenta,idCuentaMayor:this.idCuentaMayor,totalSaldo:this.totalSaldo}
  this.dialog.open(ACtaAddComponent, dialogConfig).afterClosed()
  .subscribe(response  => {if (response.data=="ok"){this.descargaComprobante()};      
  });
}

addCuentaMayorDialog() {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.panelClass="dialog-responsive";

  this.dialog.open(CuentaMayorSelectComponent, dialogConfig).afterClosed()
  .subscribe(response => {if (response.data=="ok"){this.addDetalleValor()}});
}
addDetalleValor()
{
  var cuentaMayor = this.cuentaMayorService.Current;
  var item:DetalleValores = new DetalleValores();
  item.Id = this.form.get('Id').value;
  item.IdTipo = "1";
  item.IdCuentaMayor = cuentaMayor.Id;
  item.Concepto = cuentaMayor.Nombre;
  item.Numero = 0;  
  item.Importe = this.totalSaldo;
  item.Fecha = new Date();
  item.FechaVencimiento = new Date();
  this.addDetalleValores(item);
}
descargaComprobante()
  {
    this.entityService.DetalleComprobante.map(item=>this.addDetalleComprobante(item));
    this.entityService.DetalleComprobante=[];    
  }

  setControlsError(validationErrors)
  {    
    Object.keys(validationErrors).forEach(prop=>
      {
        const formControl = this.form.get(prop);
        if (formControl)
           {
            formControl.setErrors({serverError: validationErrors[prop]});
            formControl.markAsTouched();
                   }
       });    
  }
  
}
