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
import { TipoFactura } from '../../../global/models/models/model';
import { CuentaMayor } from '../../../contable/models/model';
import { CuentaMayorService } from '../../../contable/services/cuenta-mayor.service';
import { identifierModuleUrl } from '@angular/compiler';
import { DatePipe } from '@angular/common';

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
  submitted = false;
  mode = "new";
  _id: String;
  articulos:Articulo[] = [];
  sujetos:Sujeto[] = [];  
  tipoFactura:TipoFactura[] = [];  
  mediosPagos:CuentaMayor[] = [];  
  
  get f() { return this.form.controls; }
  
  constructor(private entityService: FacturaService,private sujetoService : SujetoService,private articuloService:ArticuloService,
    private tipoFacturaService:TipoFacturaService,private cuentaMayorService:CuentaMayorService,private router: Router,private route: ActivatedRoute,
              private formBuilder: FormBuilder)            
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
  
      this.createForm(); 
      this.markFormGroupTouched(this.form);    
      this.calculateOnInit();
      }
  
    createForm():void
      {
        this.form = this.formBuilder.group({
        id: new FormControl(this.entity.id),
        idEmpresa: new FormControl(this.entity.idEmpresa),
        IdSucursal: new FormControl(this.entity.idSucursal),
        IdArea: new FormControl(this.entity.idArea),
        IdSeccion: new FormControl(this.entity.idSeccion),
        IdTransaccion: new FormControl(this.entity.idTransaccion),
        IdMoneda: new FormControl(this.entity.idMoneda),
        Letra: new FormControl(this.entity.letra,Validators.required),
        Fecha: new FormControl(this.entity.fecha,Validators.required),        
        FechaVencimiento: new FormControl(this.entity.fechaVencimiento,Validators.required),
        IdCuenta: new FormControl(this.entity.idCuenta,{ validators: Validators.required}),
        Pe: new FormControl(this.entity.pe,{ validators: Validators.required}),
        Numero: new FormControl(this.entity.numero,{ validators: Validators.required}),
        Tipo: new FormControl(this.entity.tipo,{ validators: Validators.required}),
        TotalNeto: new FormControl(this.entity.totalNeto),
        TotalDescuento: new FormControl(this.entity.totalDescuento),
        TotalGravado: new FormControl(this.entity.totalGravado),
        TotalNoGravado: new FormControl(this.entity.totalNoGravado),
        TotalExento: new FormControl(this.entity.totalExento),
        TotalIva: new FormControl(this.entity.totalIva),
        TotalOTributos: new FormControl(this.entity.totalOTributos),
        Total: new FormControl(this.entity.total),
        Obs: new FormControl(this.entity.obs),
        Detalle:this.formBuilder.array([]),
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
      let detalleFactura = new DetalleFactura();
      let item = this.createItem(detalleFactura);           
    }
    addMedioPago()
    {
      let medioPago = new MedioPago();
      medioPago.id = this.entity.id;
      medioPago.idCuentaMayor = "1111"
      medioPago.concepto = "CONTADO"
      medioPago.importe = this.entity.total;
      let item = this.createMedioPago(medioPago);           
    }
     
    removeDetalle(i:number) {    
      this.detalle.removeAt(i);
      this.entity.detalle.splice(i,1);
    }
    createItem(detalleFactura : DetalleFactura):FormGroup {
      let itemDetalle = new DetalleFactura();    
      itemDetalle.cantidad = 1;
      itemDetalle.precio = 0;
      itemDetalle.total = 0;
      this.entity.detalle.push(itemDetalle);
      let item = this.entity.detalle.length;    
      let itemGrp =  this.formBuilder.group({
        Id: this.entity.id,
        Item: item,
        IdArticulo: new FormControl(itemDetalle.idArticulo,Validators.required),
        Cantidad: new FormControl(itemDetalle.cantidad,Validators.required),
        Concepto: new FormControl(itemDetalle.concepto,Validators.required),
        Precio: new FormControl(itemDetalle.precio,Validators.required),
        Total: new FormControl(itemDetalle.total,Validators.required),
      });
      itemGrp.get('Cantidad').valueChanges.subscribe(this.updateTotal.bind(this,itemGrp));
      itemGrp.get('Precio').valueChanges.subscribe(this.updateTotal.bind(this,itemGrp));
      itemGrp.get('IdArticulo').valueChanges.subscribe(this.addArticulo.bind(this,itemGrp));
      this.detalle.push(itemGrp);
      return itemGrp;
    }
    createMedioPago(medioPago : MedioPago):FormGroup {
    
      this.entity.medioPago.push(medioPago);
      let item = this.entity.medioPago.length;    
      let itemGrpMP =  this.formBuilder.group({
        Id: medioPago.id,
        Item: item,
        Concepto: new FormControl(medioPago.concepto,Validators.required),
        IdCuentaMayor: new FormControl(medioPago.idCuentaMayor,Validators.required),
        Importe: new FormControl(medioPago.importe,Validators.required),        
      });      
      this.mediopago.push(itemGrpMP);
      return itemGrpMP;
    }

  updateTotal(itemGrp:FormGroup)
  {
    let cantidad = itemGrp.get('Cantidad').value;
    let importe = itemGrp.get('Precio').value;    
    if(cantidad && importe)
    {
      let total = Math.round((cantidad * importe).valueOf()*100)/100
      itemGrp.get('Total').setValue(total) ;
    }    
  }
  updateTotalMedioPago(total)
  {    
    this.mediopago.at(0).get("Importe").setValue(total);  
  }
  addArticulo(itemGrp:FormGroup)
  {
    let idArticulo = itemGrp.get('IdArticulo').value;
    this.articuloService.findOne(idArticulo).subscribe(
      res=>{  itemGrp.get('Concepto').setValue(res.nombre, { onlySelf: true });
      itemGrp.get('Precio').setValue(res.precioVenta,{ onlySelf: true });},
      err => {console.log(err); });
          
  }
    
    popupData():void
    {
      this.sujetoService.findAll().subscribe(res => { this.sujetos = res; }, err => {console.log(err); });
      this.articuloService.findAll().subscribe(res => { this.articulos = res; }, err => {console.log(err); });
      this.tipoFacturaService.findAll().subscribe(res => { this.tipoFactura = res; }, err => {console.log(err); });
      this.cuentaMayorService.findMediosPagos().subscribe(res=>{this.mediosPagos=res},err => {console.log(err); })
    }
    popupEntity(entity:Factura):void
    {
      entity.medioPago.forEach(item=>this.createMedioPago(item));
      entity.detalle.forEach(item=>this.createItem(item));
    }
    
    setDefaultValues():void
    {
      this.entityService.newDefault().subscribe(res=>{this.entity=res;this.addMedioPago();},err => {console.log(err);});      
    }
       
    getById(id):void
    {
      this.entityService.findOne(id).subscribe(res=>{this.entity = res; this.popupEntity(this.entity);});
    }
   
    new(): void
    {
      this.submitted = false;   
    }
    print()
    {
      this.entityService.print(this.entity.id).subscribe((resultBlob: Blob) => {
        var downloadURL = URL.createObjectURL(resultBlob);
        window.open(downloadURL);});
    } 
    save() 
    {
      this.entity = this.form.value;      
      if( this.mode=="new"){  //new
      this.entityService.add(this.entity)
      .subscribe(data => {this.goBack();}, 
                 error => {console.log(error);                            
                 this.setControlsError(error.error);});
       }
       else //Edit
       {
        this.entityService.update(this.entity.id,this.entity)
        .subscribe(data => {this.goBack();}, error => {
                   console.log(error);                 
                   this.setControlsError(error.error);               
                   }
         );
       }
    }
    
  calculateOnInit():void
  {
    this.form.get("Detalle").valueChanges.subscribe(values => {
      resolvedPromise.then(() => {
        this.entity.total = values.reduce((acc, cur) => acc + cur.Total, 0);
        this.updateTotalMedioPago(this.entity.total);
      });
    })
   
  }
  
  private markFormGroupTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsPristine();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
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
