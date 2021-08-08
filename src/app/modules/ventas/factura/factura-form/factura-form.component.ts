import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Factura, DetalleFactura, MedioPago } from '../../models/model';
import { FacturaService } from '../../services/factura.service';
import { SujetoService } from '../../../comun/services/sujeto.service';
import { ArticuloService } from '../../../almacen/services/articulo.service';
import { TipoFacturaService } from '../../../global/services/tipo-factura.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Articulo } from '../../../almacen/models/model';
import { Sujeto } from '../../../comun/models/model';
import { CondIvaOperacion, TipoFactura } from '../../../global/models/models/model';
import { CuentaMayor } from '../../../contable/models/model';
import { CuentaMayorService } from '../../../contable/services/cuenta-mayor.service';
import { identifierModuleUrl } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArticuloSelectComponent } from '../../../almacen/articulo/articulo-select/articulo-select.component';
import { CarritoCompraService } from '../../../almacen/services/carrito-compra.service';
import { FacturaAFIPComponent } from '../factura-afip/factura-afip.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CondIvaOperacionService } from '../../../global/services/cond-iva-operacion.service';

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css'],
  providers:[DatePipe]
})
export class FacturaFormComponent implements OnInit {

  
  form :  FormGroup;
  entity: Factura = new Factura();
  totalItems:number=0;
  submitted = false;
  mode = "new";
  _id: String;
  articulos:Articulo[] = [];
  sujetos:Sujeto[] = [];  
  sujeto:Sujeto;
  tipoFactura:TipoFactura[] = [];  
  mediosPagos:CuentaMayor[] = [];  
  letras:String[]=[];
  condIva:CondIvaOperacion[]=[];
  errors = [];

  get f() { return this.form.controls; }
  
  constructor(private entityService: FacturaService,private sujetoService : SujetoService,private articuloService:ArticuloService,
    private tipoFacturaService:TipoFacturaService,private cuentaMayorService:CuentaMayorService,private condIvaOperacionService:CondIvaOperacionService,
    private router: Router,private route: ActivatedRoute,
              private formBuilder: FormBuilder,private dialog: MatDialog,private carritoService: CarritoCompraService)            
              {                      
              }
    
  ngOnInit(): void {
      this.popupData();    
      this._id = this.route.snapshot.params['id'];
      //editar
      if(this._id)
      { 
         this.getById(this._id);
         this.mode="edit"
      }
      else //set default values
      {
        this.setDefaultValues();        
      }   
  
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
        Letra: new FormControl(this.entity.Letra,Validators.required),
        Fecha: new FormControl(this.entity.Fecha,Validators.required),        
        FechaVencimiento: new FormControl(this.entity.FechaVencimiento,Validators.required),
        IdCuenta: new FormControl(this.entity.IdCuenta,{ validators: Validators.required}),
        Pe: new FormControl(this.entity.Pe,{ validators: Validators.required}),
        Numero: new FormControl(this.entity.Numero,{ validators: Validators.required}),
        Tipo: new FormControl(this.entity.Tipo,{ validators: Validators.required}),
        TotalNeto: new FormControl(this.entity.TotalNeto),
        TotalItems: new FormControl(0),
        PorDescuento: new FormControl(this.entity.PorDescuento),
        TotalDescuento: new FormControl(this.entity.TotalDescuento),
        TotalGravado: new FormControl(this.entity.TotalGravado),
        TotalNoGravado: new FormControl(this.entity.TotalNoGravado),
        TotalExento: new FormControl(this.entity.TotalExento),
        TotalIva: new FormControl(this.entity.TotalIva),
        TotalOTributos: new FormControl(this.entity.TotalOTributos),
        Total: new FormControl(this.entity.Total),
        Obs: new FormControl(this.entity.Obs),
        Detalle:this.formBuilder.array([],Validators.required),
        MedioPago:this.formBuilder.array([])
      });    
    }
    
    get detalle(): FormArray {
      return this.form.get('Detalle') as FormArray;
    }
    get mediopago(): FormArray {
      return this.form.get('MedioPago') as FormArray;
    }
   
    addDetalle()
    {
      //let detalleFactura = new DetalleFactura();
      let itemDetalle = new DetalleFactura();    
      itemDetalle.Cantidad = 1;
      itemDetalle.Precio = 0;
      itemDetalle.Total = 0;
      this.entity.Detalle.push(itemDetalle);
      let item = this.createItem(itemDetalle);           
    }
    addMedioPago()
    {
      let medioPago = new MedioPago();
      medioPago.Id = this.entity.Id;
      medioPago.IdCuentaMayor = "1111"
      medioPago.Concepto = "CONTADO"
      medioPago.Importe = this.entity.Total;
      let item = this.createMedioPago(medioPago);           
    }
    removeMedioPago(i:number) {    
      this.mediopago.removeAt(i);
      this.calculateTotal();
    }
     
    removeDetalle(i:number) {    
      this.detalle.removeAt(i);
      this.calculateTotal();
    }
    createItem(itemDetalle : DetalleFactura):FormGroup {
          
      let item = this.entity.Detalle.length;
      let itemGrp =  this.formBuilder.group({
        Id: this.entity.Id,
        Item: item,
        IdArticulo: new FormControl(itemDetalle.IdArticulo,Validators.required),
        Cantidad: new FormControl(itemDetalle.Cantidad,Validators.required),
        Concepto: new FormControl(itemDetalle.Concepto,Validators.required),
        Precio: new FormControl(itemDetalle.Precio,Validators.required),
        PorBonificacion: new FormControl(itemDetalle.PorBonificacion),
        Bonificacion: new FormControl(itemDetalle.Bonificacion),
        Gravado: new FormControl(itemDetalle.Gravado),
        NoGravado: new FormControl(itemDetalle.NoGravado),
        Exento: new FormControl(itemDetalle.Exento),
        CondIva: new FormControl(itemDetalle.CondIva),
        Iva: new FormControl(itemDetalle.Iva),
        Total: new FormControl(itemDetalle.Total,Validators.required),
      });
      itemGrp.get('Cantidad').valueChanges.subscribe(res=>this.calculateTotal());
      itemGrp.get('PorBonificacion').valueChanges.subscribe(res=>this.calculateTotal());
      itemGrp.get('Precio').valueChanges.subscribe(res=>this.calculateTotal());
      itemGrp.get('IdArticulo').valueChanges.subscribe(res=>this.calculateTotal());
      this.detalle.push(itemGrp);
      return itemGrp;
    }
    createMedioPago(medioPago : MedioPago):FormGroup {
    
      this.entity.MedioPago.push(medioPago);
      let item = this.entity.MedioPago.length;    
      let itemGrpMP =  this.formBuilder.group({
        Id: medioPago.Id,
        Item: item,
        Concepto: new FormControl(medioPago.Concepto,Validators.required),
        IdCuentaMayor: new FormControl(medioPago.IdCuentaMayor,Validators.required),
        Importe: new FormControl(medioPago.Importe,Validators.required),        
      }); 
      itemGrpMP.get('Importe').valueChanges.subscribe(res=>this.updateImporteMedioPago(res));    

      this.mediopago.push(itemGrpMP);
      return itemGrpMP;
    }
    updateImporteMedioPago(item: any)
    {
      let pitem = item;
    }

  
  updateTotalMedioPago(total)
  {    
    if (this.mediopago.length == 1)
    {
    this.mediopago.at(0).get("Importe").setValue(total);  
    }
  }
  addArticulo(itemGrp:FormGroup)
  {
    let idArticulo = itemGrp.get('IdArticulo').value;    
    this.articuloService.findOne(idArticulo).subscribe(
      res=>{  itemGrp.get('Concepto').setValue(res.Nombre, { onlySelf: true });      
      let precioVenta = res.PrecioVenta;            
      itemGrp.get('CondIva').setValue(res.CondIva,{ onlySelf: true });
      itemGrp.get('Precio').setValue(precioVenta,{ onlySelf: true });      
      itemGrp.get('CondIva').setValue(res.CondIva,{ onlySelf: true });      
      },
      err => {console.log(err); });
          
  }
    
 popupData():void
  {
      this.sujetoService.findAll().subscribe(res => { this.sujetos = res; }, err => {console.log(err); });
      this.articuloService.findAll().subscribe(res => { this.articulos = res; }, err => {console.log(err); });
      this.tipoFacturaService.findAll().subscribe(res => { this.tipoFactura = res; }, err => {console.log(err); });
      this.cuentaMayorService.findMediosPagos().subscribe(res=>{this.mediosPagos=res},err => {console.log(err); })
      this.sujetoService.findOne(this.entity.IdCuenta).subscribe();
      this.condIvaOperacionService.findAll().subscribe(res=>{this.condIva = res;},err => {console.log(err);});
      this.popupLetras();
  }
  popupEntity(entity:Factura):void
  {
     entity.MedioPago.forEach(item=>this.createMedioPago(item));
      entity.Detalle.forEach(item=>this.createItem(item));
  }
  popupLetras(idCondIva:string="")
  {
    this.entityService.letrasDisponible(idCondIva).subscribe(res=>this.letras=res);
  }
    
  setDefaultValues():void
  {
    this.entityService.newDefault().subscribe(res=>{this.entity=res;this.createForm(); 
      this.markFormGroupTouched(this.form);this.addMedioPago();},err => {console.log(err);});      
  }
       
  getById(id):void
   {
     this.entityService.findOne(id).subscribe(res=>{this.entity = res; this.createForm();this.popupEntity(this.entity); 
      this.markFormGroupTouched(this.form);});
   }
   
  new(): void
   {
     this.submitted = false;   
   }
  print()
   {
    this.entityService.print(this.entity.Id).subscribe((resultBlob: Blob) => {
    var downloadURL = URL.createObjectURL(resultBlob);
    window.open(downloadURL);});
  } 
  save() 
   {
    this.entity = this.form.value;   
       
    if( this.mode=="new"){  //new
    this.entityService.add(this.entity)
    .subscribe(data => {this.goEdit(data.Id);}, 
               error => {console.log(error);                            
               this.setControlsError(error.error);for(var tKey in error.error) this.errors.push({name: tKey, value: error.error[tKey]});});
   }
   else //Edit
   {
     this.entityService.update(this.entity.Id,this.entity)
     .subscribe(data => {this.goBack();}, error => {
               console.log(error);                 
               this.setControlsError(error.error);for(var tKey in error.error) this.errors.push({name: tKey, value: error.error[tKey]});});
    }
    }
  
  calculateTotal():void
  {
    this.entity = this.form.value;      
    let totalNoGravado = 0;
    let totalExento = 0;
    let totalGravado = 0;    
    let total = 0;
    let totalIva = 0;
    let totalItems = 0;
    for (let item of this.detalle.controls) 
    {

      
      let tmpCondIva = this.condIva.find(i => i.Id == this.detalle.at(totalItems).get('CondIva').value);
      //Bonificacion
      let cantidad = this.detalle.at(totalItems).get('Cantidad').value;
      let precio = this.detalle.at(totalItems).get('Precio').value;
      let porBonificacion = this.detalle.at(totalItems).get('PorBonificacion').value
      let bonificacion = cantidad * precio * porBonificacion / 100;
      let subTotal = cantidad * precio - bonificacion;    
      let gravado = 0;
      let noGravado = 0;
      let exento = 0;
      if (tmpCondIva.Id =="001")//No Gravado
      {        
        item.get("NoGravado").patchValue(subTotal);
        noGravado = subTotal;
      }
      else if (tmpCondIva.Id=="002")//Exento
      {
        item.get("Exento").patchValue(subTotal);
        exento = subTotal;
      }
      else //Gravado
      {        
        item.get("Gravado").patchValue(subTotal);
        gravado = subTotal;
      }       
      //iva
      let iva = gravado*tmpCondIva.Alicuota/100;
      totalNoGravado += noGravado;
      totalExento += exento;
      totalGravado += gravado;
      totalIva += iva;   
      this.detalle.at(totalItems).get('Total').patchValue(subTotal);
      this.detalle.at(totalItems).get('Item').patchValue(totalItems);
      totalItems +=1;
    }
   let totalOTributos = 0;
   // for (let item of this.entity.Tributos) 
  // {
  //   totalOTributos += item.Importe;
  // }
  this.entity.TotalOTributos = totalOTributos;
  let totalNeto = totalNoGravado + totalExento + totalGravado;
  let totalDescuento = totalNeto * this.entity.PorDescuento /100
  total = totalNeto - totalDescuento + totalOTributos + totalIva;  
 
   this.form.patchValue({"TotalNeto":totalNeto,"TotalItems":totalItems,"TotalGravado":totalGravado,"TotalNoGravado":totalNoGravado,"TotalExento":totalExento,"TotalOTributos": totalOTributos,"TotalIva":totalIva,"Total":total});
   this.updateTotalMedioPago(total);
  
        
  }
  
  private markFormGroupTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsPristine();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
}
   onCuentaChange(idCuenta:string)
   {
     this.sujetoService.findOne(this.entity.IdCuenta).subscribe(res=>this.popupLetras(res.IdCondicionIva));

   }
    onSubmit() {
       this.save();
    }
  
    goBack() {
      this.router.navigate(['ventas/factura/list']);    
    }
    goEdit(id)
    {
      this.router.navigate(['ventas/factura/',id]);
    }

    openDialog() {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.panelClass="dialog-responsive";

      this.dialog.open(ArticuloSelectComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        this.descargaCarrito();
      });
  }
  openDialogAfip() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass="dialog-responsive";
  

    this.dialog.open(FacturaAFIPComponent,{data:{id:this.entity.Id},width: '50%',height: '50%'}).afterClosed()
    .subscribe(response => {
      //alguna Accion
    });
}

  descargaCarrito()
  {
    var articulos = this.carritoService.getAll();
    articulos.forEach(element => 
      {
        let itemDetalle = new DetalleFactura();
        itemDetalle.IdArticulo = element.Articulo.Id;
        itemDetalle.Concepto = element.Articulo.Nombre;
        itemDetalle.Cantidad = element.Cantidad;
        itemDetalle.Precio = element.Articulo.PrecioVenta;
        itemDetalle.CondIva = element.Articulo.CondIva;
        this.entity.Detalle.push(itemDetalle);       
        let item = this.createItem(itemDetalle);
    });
    this.carritoService.deleteAll();
    this.calculateTotal();
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
