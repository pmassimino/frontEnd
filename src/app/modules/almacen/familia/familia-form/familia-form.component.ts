import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { FamiliaService } from '../../services/familia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Familia } from '../../models/model';

@Component({
  selector: 'app-familia-form',
  templateUrl: './familia-form.component.html',
  styleUrls: ['./familia-form.component.css']
})
export class FamiliaFormComponent implements OnInit {

form :  FormGroup;
entity: Familia = new Familia();
submitted = false;
mode = "new";
_id= String;

constructor(private entityService: FamiliaService, 
            private router: Router,private route: ActivatedRoute,
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
    this.calculateOnInit();
    }

  createForm():void
    {
      this.form = this.formBuilder.group({
      id: new FormControl(this.entity.id,Validators.required),
      nombre: new FormControl(this.entity.nombre,Validators.required)});
      
  }

  popupData():void
  { 
  }
  setDefaultValues():void
  {
    this.entityService.newDefault().subscribe(res=>this.entity=res,err => {console.log(err);});

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
    if( this.mode=="new"){  //new
    this.entityService.add(this.form.value)
    .subscribe(data => {console.log(data);
               this.goBack();this.submitted = true; }, 
               error => {console.log(error);               
               this.setControlsError(error.error);               
               }
     );
     }
     else //Edit
     {
      this.entityService.update(this.entity.id,this.form.value)
      .subscribe(data => {console.log(data);
                 this.goBack();this.submitted = true; }, error => {
                 console.log(error);                 
                 this.setControlsError(error.error);               
                 }
       );
     }
  }
  
  calculateOnInit():void{         
  
}
  onSubmit() {
     this.save();
  }

  goBack() {
    this.router.navigate(['almacen/familia/list']);
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