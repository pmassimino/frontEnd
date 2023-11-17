import { Component } from '@angular/core';
import { MailServerService } from '../../services/mail-server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MailServer,tipoServerMail } from '../../services/models/model';


@Component({
  selector: 'app-mail-server-form',
  templateUrl: './mail-server-form.component.html',
  styleUrls: ['./mail-server-form.component.css']
})
export class MailServerFormComponent {form :  UntypedFormGroup;
  entity: MailServer = new MailServer();  
  submitted = false;
  mode = "new";
  _id: String;  
  errMsg = [];
  tipoServerMail = [];

  get f() { return this.form.controls; }
  
  constructor(private entityService: MailServerService,
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
        Id: [this.entity.Id],
        Nombre: new UntypedFormControl(this.entity.Nombre,Validators.required),
        Email: new UntypedFormControl(this.entity.Email,Validators.email),
        Server: new UntypedFormControl(this.entity.Server,Validators.required),
        Puerto: new UntypedFormControl(this.entity.Puerto,Validators.required),
        TipoServer: new UntypedFormControl(this.entity.TipoServer,Validators.required),
        Usuario: new UntypedFormControl(this.entity.Usuario,Validators.required),        
        Password: new UntypedFormControl(this.entity.Password,Validators.required),        
        Prioridad: new UntypedFormControl(this.entity.Prioridad,Validators.required),
        EsSSL: new UntypedFormControl(this.entity.EsSSL),
      });
    }
  
    popupData():void
    {
      this.tipoServerMail = tipoServerMail;      
    }
    setDefaultValues():void
    {
      this.entityService.newDefault().subscribe(res=>{this.entity=res;this.createForm();},err => {console.log(err);});
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
      if (confirm("Desea borrar el actual asiento ? ")) {
        
        this.entityService.delete(this.entity.Id)
          .subscribe(res=>this.goBack(),
            err => {
              alert("El servidor de mail no se puede eliminar.");
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
      this.router.navigate(['mail/mailserver/list']);
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
