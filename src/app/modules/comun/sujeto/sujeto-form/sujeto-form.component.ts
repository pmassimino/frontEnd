import { Component, OnInit } from '@angular/core';
import { Sujeto, RolSujeto, Rol } from '../../models/model';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors, FormArray, FormGroupDirective, NgForm } from '@angular/forms';
import { SujetoService } from '../../services/sujeto.service';
import { RolService } from '../../services/rol.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoDocumentoService } from '../../../global/services/tipo-documento.service';
import { TipoDocumento, CondIva } from '../../../global/models/models/model';
import { CoreService } from '../../../../core/services/core.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { variable } from '@angular/compiler/src/output/output_ast';
import { CondIvaService } from '../../../global/services/cond-iva.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-sujeto-form',
  templateUrl: './sujeto-form.component.html',
  styleUrls: ['./sujeto-form.component.css']
})
export class SujetoFormComponent implements OnInit {

  
form :  FormGroup;
entity: Sujeto = new Sujeto();
tipoDocumento:TipoDocumento[] = [];
condIva:CondIva[] = [];
matcher = new MyErrorStateMatcher();

submitted = false;
mode = "new";
_id= String;
_idSuperior= String;
_coreService:CoreService;
get f() { return this.form.controls; }

constructor(private entityService: SujetoService,rolService : RolService, coreService:CoreService,
            private tipoDocumentoService:TipoDocumentoService,private condIvaService:CondIvaService,
            private router: Router,private route: ActivatedRoute,
            private formBuilder: FormBuilder)            
            { 
            this._coreService = coreService;                
            }


  ngOnInit(): void {
    this.popupData();    
    this._id = this.route.snapshot.params['id'];
    this._idSuperior = this.route.snapshot.params['idSuperior'];
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
    this.calculateOnInit();
    }

  createForm():void
    {
      this.form = this.formBuilder.group({
      id: new FormControl(this.entity.id,Validators.required),
      nombre: new FormControl(this.entity.nombre,Validators.required),
      nombreComercial: new FormControl(this.entity.nombreComercial,Validators.required),
      domicilio: new FormControl(this.entity.domicilio),
      altura: new FormControl(this.entity.altura),
      idLocalidad: new FormControl(this.entity.idLocalidad),
      IdCondicionIva: new FormControl(this.entity.idCondicionIva),
      IdTipoDoc: new FormControl(this.entity.idTipoDoc,{ validators: Validators.required}),
      NumeroDocumento:new FormControl(this.entity.numeroDocumento, { validators: Validators.required, asyncValidators: [this.numeroDocumentoValidator.bind(this)], updateOn: 'blur' }),
      email1: new FormControl(this.entity.domicilio,Validators.email),
      rolSujeto:new FormArray([this.createItem()])        
    });
  }

  popupData():void
  {
    this.tipoDocumentoService.findAll().subscribe(res => { this.tipoDocumento = res; }, err => {console.log(err); });
    this.condIvaService.findAll().subscribe(res => { this.condIva = res; }, err => {console.log(err); });
  }
  setDefaultValues():void
  {
    this.entityService.newDefault().subscribe(res=>this.entity=res,err => {console.log(err);});
    //this.addRolSujeto();
  }
  
  createItem(): FormGroup {
    let rol = new RolSujeto("1",this.entity.id);    
    this.entity.rolSujeto.push(rol);    
    return this.formBuilder.group({
      idRol: rol.idRol,
      idSujeto: this.entity.id
    });
  }
  getById(id):void
  {
    this.entityService.findOne(id).subscribe(res=>this.entity = res);
  }
 new(): void
  {
    this.submitted = false;   
  }
   
  save() 
  {
    //Update Items
    for (var item of this.form.value.rolSujeto) {
        item.idSujeto = this.entity.id;
    }
    if( this.mode=="new"){  //new
    this.entityService.add(this.form.value)
    .subscribe(data => {this.goBack();}, 
               error => {console.log(error);               
               this.setControlsError(error.error);});
     }
     else //Edit
     {
      this.entityService.update(this.entity.id,this.form.value)
      .subscribe(data => {this.goBack();}, error => {
                 console.log(error);                 
                 this.setControlsError(error.error);               
                 }
       );
     }
  }
  
  calculateOnInit():void{         
  let o = "";
}
  onSubmit() {
     this.save();
  }

  goBack() {
    this.router.navigate(['comun/sujeto/list']);
  }
  
  private numeroDocumentoValidator(control: FormControl): Observable<ValidationErrors | null> {
    let numeroDocumento = this.form.get("NumeroDocumento").value;    
    let idTipoDoc = this.form.get("IdTipoDoc").value;
    return this._coreService.validarNumeroDocumento(idTipoDoc,numeroDocumento).pipe(
      map(notValid => (notValid ==false ? { numeroDocumentoNoValido: true } : null)),
      catchError(() => of(null))
    );
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
  get id() { return this.form.get('id'); }


}
