import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { CuentaMayor, TipoCuentaMayor, UsoCuentaMayor } from '../../models/model';
import { CuentaMayorService } from '../../services/cuenta-mayor.service';
import { UsoCuentaMayorService } from '../../services/uso-cuenta-mayor.service';
import { TipoCuentaMayorService } from '../../services/tipo-cuenta-mayor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuenta-mayor-form',
  templateUrl: './cuenta-mayor-form.component.html',
  styleUrls: ['./cuenta-mayor-form.component.css']
})
export class CuentaMayorFormComponent implements OnInit {

  
  form :  UntypedFormGroup;
  entity: CuentaMayor = new CuentaMayor();
  tipoCuentaMayor:TipoCuentaMayor[] = [];
  usoCuentaMayor:UsoCuentaMayor[] = [];
  submitted = false;
  mode = "new";
  _id: String;
  _idSuperior: string;
  errMsg = [];  
  get f() { return this.form.controls; }
  
  constructor(private entityService: CuentaMayorService,private usoCuentaMayorService : UsoCuentaMayorService,private tipoCuentaMayorService : TipoCuentaMayorService,
              private router: Router,private route: ActivatedRoute,
              private formBuilder: UntypedFormBuilder)            
              {
                      
              }
    
    ngOnInit(): void {
      this.popupData();    
      this._id = this.route.snapshot.params['id'];
      this._idSuperior = this.route.snapshot.queryParamMap.get('IdSuperior');
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
      
  
      //this.createForm();
      this.calculateOnInit();
      }
  
    createForm():void
      {
        this.form = this.formBuilder.group({
        Id: new UntypedFormControl(this.entity.Id,Validators.required),
        IdSuperior: new UntypedFormControl(this.entity.IdSuperior),
        Nombre: new UntypedFormControl(this.entity.Nombre,Validators.required),
        IdTipo: new UntypedFormControl(this.entity.IdTipo,Validators.required),
        IdUso: new UntypedFormControl(this.entity.IdUso,{ validators: Validators.required})               
      });
    }
  
    popupData():void
    {
      this.tipoCuentaMayorService.findAll().subscribe(res => { this.tipoCuentaMayor = res; }, err => {console.log(err); });
      this.usoCuentaMayorService.findAll().subscribe(res => { this.usoCuentaMayor = res; }, err => {console.log(err); });
    }
    setDefaultValues():void
    {
      this.entityService.newDefault().subscribe(res=>{this.entity=res;this.entity.IdSuperior=this._idSuperior;this.createForm();},err => {console.log(err);});
      
    }
       
    getById(id):void
    {
      this.entityService.findOne(id).subscribe(res=>{this.entity = res;this.createForm();});
    }
   new(): void
    {
      this.submitted = false;   
    }
     
    save() 
    {    
      if( this.mode=="new"){  //new
      this.entityService.add(this.form.value)
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
    
  calculateOnInit():void
  {         
   
  }
    onSubmit() {
       this.save();
    }
  
    goBack() {
      this.router.navigate(['contable/cuentamayor/list']);
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
