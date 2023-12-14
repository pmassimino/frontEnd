import { Component } from '@angular/core';
import { NumeradorPuntoEmision, PuntoEmision } from '../../models/model';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PuntoEmisionService } from '../../services/punto-emision.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfipWSService } from '../../../afip/services/afip-ws.service';
import { AfipWs } from '../../../afip/models/model';
import { Comprobante, Provincia } from '../../../global/models/models/model';
import { ProvinciaService } from '../../../global/services/provincia.service';
import { NumeradorDocumento } from '../../../comun/models/model';
import { NumeradorDocumentoService } from '../../../comun/services/numerador-documento.service';
import { ComprobanteService } from '../../../global/services/comprobante.service';

@Component({
  selector: 'app-punto-emision-form',
  templateUrl: './punto-emision-form.component.html',
  styleUrls: ['./punto-emision-form.component.css']
})
export class PuntoEmisionFormComponent {
  form :  UntypedFormGroup;
  entity: PuntoEmision = new PuntoEmision();  
  submitted = false;
  mode = "new";
  _id: String;  
  errMsg = [];
  tipoServerMail = [];
  afipWs: AfipWs[]=[];
  provincia:Provincia[]=[];
  numeradorDocumento:NumeradorDocumento[]=[];
  comprobante:Comprobante[]=[];

  get f() { return this.form.controls; }
  get Numeradores(): UntypedFormArray {
    return this.form.get('Numeradores') as UntypedFormArray;
  }
  
  constructor(private entityService: PuntoEmisionService,private afipWsService: AfipWSService,
              private numeradorDocumentoService:NumeradorDocumentoService,
              private comprobanteService: ComprobanteService,
              private provinciaService:ProvinciaService,
              private router: Router,private route: ActivatedRoute,
              private formBuilder: UntypedFormBuilder)            
              {                      
              }
    
    ngOnInit(): void {
      this.popupData();    
      this._id = this.route.snapshot.params['id'];      
      this.createForm();
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
       
      
      this.calculateOnInit();
      }
  
    createForm():void
      {
        this.form = this.formBuilder.group({
        Id: new UntypedFormControl(this.entity.Id,Validators.required),
        Nombre: new UntypedFormControl(this.entity.Nombre,Validators.required),
        Numero: new UntypedFormControl(this.entity.Numero,Validators.required),
        IdAfipWsService: new UntypedFormControl(this.entity.IdAfipWsService,Validators.required),
        Domicilio: new UntypedFormControl(this.entity.Domicilio,Validators.required),
        Altura: new UntypedFormControl(this.entity.Altura),        
        IdProvincia: new UntypedFormControl(this.entity.IdProvincia),
        Localidad: new UntypedFormControl(this.entity.Localidad),        
        CodigoPostal: new UntypedFormControl(this.entity.CodigoPostal), 
        Numeradores: this.formBuilder.array([]),                       
      });
    }
    addDetalle() {      
      let itemNumerador = new NumeradorPuntoEmision();   
      itemNumerador.IdNumeradorDocumento = "00001";   
      this.entity.Numeradores.push(itemNumerador);
      let item = this.createNumeradorDocumento(itemNumerador);
    }
    createNumeradorDocumento(item: NumeradorPuntoEmision): UntypedFormGroup {

      let numero = this.entity.Numeradores.length;
      let itemGrp = this.formBuilder.group({
        Id: this.entity.Id,
        Item: numero,        
        IdNumeradorDocumento: new UntypedFormControl(item.IdNumeradorDocumento, Validators.required)
      });
      this.Numeradores.push(itemGrp);
      return itemGrp;
    }
    removeNumeradores(index: number) {      
      this.Numeradores.removeAt(index);
    }  
    popupData():void
    {
         this.afipWsService.findAll().subscribe(res=>{this.afipWs=res;});
         this.provinciaService.findAll().subscribe(res=>{this.provincia=res;});
         this.numeradorDocumentoService.findAll().subscribe(res=>{this.numeradorDocumento=res;});
         this.comprobanteService.findAll().subscribe(res=>{this.comprobante=res;});
    }
    popupEntity(entity: PuntoEmision): void {
      entity.Numeradores.forEach(item => this.createNumeradorDocumento(item));      
    }
    setDefaultValues():void
    {
      this.entityService.newDefault().subscribe(res=>{this.entity=res;this.createForm();},err => {console.log(err);});
    }
       
    getById(id):void
    {
      this.entityService.findOne(id).subscribe(res=>{this.entity = res;this.createForm(); this.popupEntity(this.entity);});
    }
   new(): void
    {
      this.submitted = false;   
    }
     
    save() 
    {    
      var entity = this.form.value;
      if( this.mode=="new"){  //
      
      this.entityService.add(entity)
      .subscribe(data => {this.goBack();}, 
                 error => {console.log(error);
                 this.errMsg = error;               
                 this.setControlsError(error.error);});
       }
       else //Edit
       {
        this.entityService.update(this.entity.Id,this.form.value)
        .subscribe(data => {this.goBack();}, error => {
                   console.log(error);                 
                   this.setControlsError(error.error);               
                   }
         );
       }
    }
    delete(){
      if (confirm("Desea borrar el actual REGISTRO ? ")) {
        
        this.entityService.delete(this.entity.Id)
          .subscribe(res=>this.goBack(),
            err => {
              alert("El registro no se puede eliminar.");
              // Revert the view back to its original state              
            });
      }
    }
  calculateOnInit():void
  {         
   
  }
    onSubmit() {
       this.save();
    }
  
    goBack() {
      this.router.navigate(['ventas/puntoemision/list']);
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
    get id() { return this.form.get('Id'); }
}
