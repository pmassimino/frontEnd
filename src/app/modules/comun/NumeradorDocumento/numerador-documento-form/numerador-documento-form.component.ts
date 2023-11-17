import { Component } from '@angular/core';
import { NumeradorDocumentoService } from '../../services/numerador-documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NumeradorDocumento } from '../../models/model';
import { MatTabsModule } from '@angular/material/tabs';
import { Comprobante } from '../../../global/models/models/model';
import { ComprobanteService } from '../../../global/services/comprobante.service';

@Component({
  selector: 'app-numerador-documento-form',
  templateUrl: './numerador-documento-form.component.html',
  styleUrls: ['./numerador-documento-form.component.css'],  
})
export class NumeradorDocumentoFormComponent {
  form: UntypedFormGroup;
  entity: NumeradorDocumento = new NumeradorDocumento();
  submitted = false;
  mode = "new";
  _id: String;
  errMsg = [];
  comprobante:Comprobante[]=[];
  

  get f() { return this.form.controls; }

  constructor(private entityService: NumeradorDocumentoService, 
    private router: Router, private route: ActivatedRoute,
    private comprobanteService: ComprobanteService,
    private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.popupData();
    this._id = this.route.snapshot.params['id'];
    this.createForm();
    //editar
    if (this._id) {
      this.getById(this._id);
      this.mode = "edit"
    }
    else //set default values
    {
      this.setDefaultValues();
    }


    this.calculateOnInit();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      Id: new UntypedFormControl(this.entity.Id, Validators.required),
      IdComprobante: new UntypedFormControl(this.entity.IdComprobante, Validators.required),
      Nombre: new UntypedFormControl(this.entity.Nombre, Validators.required),
      PuntoEmision: new UntypedFormControl(this.entity.PuntoEmision, Validators.required),      
      Numero: new UntypedFormControl(this.entity.Numero, Validators.required),      
    });
  }

  popupData(): void {
    this.comprobanteService.findAll().subscribe(res=>{this.comprobante=res;});
  }
  setDefaultValues(): void {
    this.entityService.newDefault().subscribe(res => { this.entity = res; this.createForm(); }, err => { console.log(err); });
  }

  getById(id): void {
    this.entityService.findOne(id).subscribe(res => { this.entity = res; this.createForm(); });
  }
  new(): void {
    this.submitted = false;
  }

  save() {
    var entity = this.form.value;
    if (this.mode == "new") {  //

      this.entityService.add(entity)
        .subscribe(data => { this.goBack(); },
          error => {
            console.log(error);
            this.errMsg = error;
            this.setControlsError(error.error);
          });
    }
    else //Edit
    {
      this.entityService.update(this.entity.Id, this.form.value)
        .subscribe(data => { this.goBack(); }, error => {
          console.log(error);
          this.setControlsError(error.error);
        }
        );
    }
  }
  delete() {
    if (confirm("Desea borrar el actual registro ? ")) {

      this.entityService.delete(this.entity.Id)
        .subscribe(res => this.goBack(),
          err => {
            alert("El registro no se puede eliminar.");
            // Revert the view back to its original state              
          });
    }
  }
  calculateOnInit(): void {

  }
  onSubmit() {
    this.save();
  }

  goBack() {
    this.router.navigate(['comun/numeradordocumento/list']);
  }

  setControlsError(validationErrors) {
    Object.keys(validationErrors).forEach(prop => {
      const formControl = this.form.get(prop);
      if (formControl) {
        formControl.setErrors({ serverError: validationErrors[prop] });
        formControl.markAsTouched();
      }
    });
  }
  get id() { return this.form.get('Id'); }
}
