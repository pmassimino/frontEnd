import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Sujeto } from '../../../comun/models/model';
import { SessionService } from '../../../comun/services/session.service';
import { SujetoService } from '../../../comun/services/sujeto.service';
import { CuentaMayorSelectComponent } from '../../../contable/cuentamayor/cuenta-mayor-select/cuenta-mayor-select.component';
import { ComprobanteMayor, CuentaMayor, DetalleMayor, Mayor } from '../../../contable/models/model';
import { CuentaMayorService } from '../../../contable/services/cuenta-mayor.service';
import { MayorService } from '../../services/mayor.service';
import { ComprobanteMayorService } from '../../services/comprobante-mayor.service';


@Component({
  selector: 'app-asiento-form',
  templateUrl: './asiento-form.component.html',
  styleUrls: ['./asiento-form.component.css']
})
export class AsientoFormComponent implements OnInit {

form :  UntypedFormGroup;
entity: Mayor= new Mayor();
sujetos:Sujeto[] = [];  
comprobanteMayor:ComprobanteMayor[]=[];
submitted = false;
mode = "new";
id : String = "";
idCuenta:string="";
idCuentaMayor:string = "";
errors = [];
cuentasSubdiario :CuentaMayor[]=[];
totalDebe : number=0;
totalHaber:number=0;
totalSaldo :number=0;

constructor(private entityService: MayorService,private sujetoService : SujetoService,
            private cuentaMayorService:CuentaMayorService,private sessionServie:SessionService,
            private comprobanteMayorService:ComprobanteMayorService,
            private router: Router,private route: ActivatedRoute,
            private formBuilder: UntypedFormBuilder,private dialog: MatDialog)            
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
      this.form = new UntypedFormGroup({
        Id: new UntypedFormControl(this.entity.Id),
        IdEmpresa: new UntypedFormControl(this.entity.IdEmpresa),
        IdSucursal: new UntypedFormControl(this.entity.IdSucursal),
        IdArea: new UntypedFormControl(this.entity.IdArea),
        IdSeccion: new UntypedFormControl(this.entity.IdSeccion),
        IdTransaccion: new UntypedFormControl(this.entity.IdTransaccion), 
        Pe:new UntypedFormControl(this.entity.Pe),
        Numero:new UntypedFormControl(this.entity.Numero),
        IdComprobante: new UntypedFormControl(this.entity.IdComprobante),
        Concepto: new UntypedFormControl(this.entity.Concepto),
        Fecha:new UntypedFormControl(this.entity.Fecha),
        FechaComp:new UntypedFormControl(this.entity.FechaComp),
        FechaVenc:new UntypedFormControl(this.entity.FechaVenc),
        Detalle:this.formBuilder.array([],Validators.required),
        }); 
        //this.onChanges(); 
  }

  onAdd():void
  {
    var newItem = new DetalleMayor();
    newItem.Id = this.entity.Id
    newItem.Item= this.entity.Detalle.length;
    this.addDetalle(newItem);
  }
  
  addDetalle(itemDetalle : DetalleMayor):UntypedFormGroup {          
    let item = this.entity.Detalle.length;
    if (itemDetalle.IdTipo == "1" )
        itemDetalle.Debe= itemDetalle.Importe        
    else
        itemDetalle.Haber= itemDetalle.Importe

    let itemGrp =  this.formBuilder.group({
      Id: this.entity.Id,
      Item: itemDetalle.Item,
      IdTipo: new UntypedFormControl(itemDetalle.IdTipo,Validators.required),      
      IdCuentaMayor: new UntypedFormControl(itemDetalle.IdCuentaMayor),
      Concepto: new UntypedFormControl(itemDetalle.Concepto),
      Cantidad: new UntypedFormControl(itemDetalle.Cantidad),
      Debe: new UntypedFormControl(itemDetalle.Debe),
      Haber: new UntypedFormControl(itemDetalle.Haber),    
      Importe: new UntypedFormControl(itemDetalle.Importe)
    });       
     // Suscribirse a los cambios del control "IdCuenta" del nuevo itemGrp
     itemGrp.get('IdCuentaMayor').valueChanges.subscribe((idCuenta: string) => {
      const conceptoControl = itemGrp.get('Concepto');
      // Actualizar el valor del campo "Concepto" con el nombre de la cuenta    
      this.cuentaMayorService.findOne(idCuenta).subscribe(res=>{conceptoControl.setValue(res.Nombre)})    
    }); 
    itemGrp.get('Debe').valueChanges.subscribe((debe: number) => {
      const haberControl = itemGrp.get('Haber');      
      const importeControl = itemGrp.get('Importe');   
      const idTipoControl = itemGrp.get('IdTipo');   
      // Verificar si se ha cargado un valor en el campo "Debe"      
      if (debe !== 0) {
        // Deshabilitar el campo "Haber" y establecer su valor en cero
        importeControl.setValue(debe);
        idTipoControl.setValue(1);
        haberControl.setValue(0);
        haberControl.disable();
       } else {
        // Habilitar el campo "Haber" si no se ha cargado un valor en el campo "Debe"
        haberControl.enable();
      }     
    });    
    itemGrp.get('Haber').valueChanges.subscribe((haber: number) => {
      const debeControl = itemGrp.get('Debe');  
      const importeControl = itemGrp.get('Importe');   
      const idTipoControl = itemGrp.get('IdTipo');       
      // Verificar si se ha cargado un valor en el campo "Haber"
      if (haber !== 0) {
        // Deshabilitar el campo "Debe" y establecer su valor en cero
        importeControl.setValue(haber);
        idTipoControl.setValue(2);
        debeControl.setValue(0);
        debeControl.disable();
      }  
      else {
        // Habilitar el campo "Debe" si no se ha cargado un valor en el campo "Haber"
        debeControl.enable();
      }    
    });            
    const cantidadControl = itemGrp.get('Cantidad');      
    cantidadControl.setValue(0);
    this.detalle.push(itemGrp);   
    this.calculateTotal();
    this.detalle.valueChanges.subscribe(res=>this.calculateTotal());    
    return itemGrp;
  }
  
  get detalle(): UntypedFormArray {
    return this.form.get('Detalle') as UntypedFormArray;
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
  
  removeDetalle(i:number):void
  {
    this.detalle.removeAt(i);    
  }
  selectCuentaMayor(i:number):void
  {
    const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.panelClass="dialog-responsive";

  this.dialog.open(CuentaMayorSelectComponent, dialogConfig).afterClosed()
  .subscribe(response => {if (response.data=="ok"){
    const detalleFormArray = this.form.get('Detalle') as FormArray;
    const detalleItem = detalleFormArray.at(i);
    detalleItem.get('IdCuentaMayor').setValue(this.cuentaMayorService.Current.Id);    
  }});   
  }
 
  calculateTotal()
  {
    this.totalSaldo = 0;
    this.totalDebe=0;
    this.totalHaber=0;
    this.detalle.controls.forEach((control) => {      
    var IdTipo = control.get("IdTipo").value;          
    var Importe:number = control.get("Importe").value;
    var debe:number = control.get("Debe").value;          
    var haber:number = control.get("Haber").value;    
    this.totalDebe += Number(debe);
    this.totalHaber += Number(haber);
    this.totalSaldo = this.totalDebe - this.totalHaber;                   
    //Desabilitar controles
    const haberControl = control.get('Haber'); 
    const debeControl = control.get('Debe');  
    //if (debeControl.value !== 0)
      // haberControl.disable();
    
  });
}       
   
  
  popupData():void
  { 
    this.sujetoService.findAll().subscribe(res => { this.sujetos = res; }, err => {console.log(err); });
    this.cuentaMayorService.CuentasSubdiario().subscribe(res=>this.cuentasSubdiario=res);
    this.comprobanteMayorService.findAll().subscribe(res=>{this.comprobanteMayor=res;})
  }
  setDefaultValues():void
  {
    this.entityService.newDefault().subscribe(res=>
      {
        this.entity=res;
        this.entity.IdArea = this.sessionServie.CurrentArea.Id;
        this.entity.IdSeccion = this.sessionServie.CurrentSeccion.Id;
        this.entity.IdSucursal = this.sessionServie.CurrentSeccion.Id;
        this.entity.IdEmpresa = "001"//this.sessionServie.CurrentEmpresa.Id;
        this.createForm();        
       },
       err => 
       {
         console.log(err);
        });
       //this.entityService.NextNumber(this.sessionServie.CurrentSeccion.Id).subscribe(res=>{this.form.get("Pe").patchValue(res.PuntoEmision);this.form.get("Numero").patchValue(res.Numero);});
  }
  getById(id):void
  {
    this.entityService.findOne(id).subscribe(res=>{this.entity = res,this.createForm();this.popupEntity(res);});
  }
  popupEntity(entity:Mayor):void
  {
     entity.Detalle.forEach(item=>this.addDetalle(item));      
  }
 new(): void
  {
    this.submitted = false;   
  }
   
  save() 
  {
    var entity = this.form.value;
    // Recálculo del detalle
    entity.Detalle.forEach((item: DetalleMayor) => {
          const debe = isNaN(item.Debe) ? 0 : item.Debe;
          const haber = isNaN(item.Haber) ? 0 : item.Haber;
          item.Importe = debe + haber;
          item.IdTipo = debe > 0 ? "1" : "2";
          });
    if( this.mode=="new"){  //new
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
      this.entityService.update(this.entity.Id,entity)
      .subscribe(data => {console.log(data);
                 this.goBack();this.submitted = true; }, error => {
                 console.log(error);                 
                 this.setControlsError(error.error);               
                 }
       );
     }
  }

  delete(){
    if (confirm("Desea borrar el actual asiento ? ")) {
      
      this.entityService.delete(this.entity.Id)
        .subscribe(res=>this.goBack(),
          err => {
            alert("El asiento no se puede eliminar.");
            // Revert the view back to its original state
            
          });
    }
  }

 
  print()
   {
    
  } 
  isValidAddComprobante():boolean
  {
    var result = true;    
    return result;
  } 
  
  onSubmit() 
  {
     this.save();
  }

  goBack() {
    this.router.navigate(['contable/mayor/list']);
  }


addCuentaMayorDialog() {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.panelClass="dialog-responsive";

  this.dialog.open(CuentaMayorSelectComponent, dialogConfig).afterClosed()
  .subscribe(response => {if (response.data=="ok"){}});
}
descargaComprobante()
  {
    
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

