import { Component } from '@angular/core';
import { MaxLengthValidator, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfigFactura } from '../../models/model';
import { ConfigFacturaService } from '../../services/config-factura.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config-factura-form',
  templateUrl: './config-factura-form.component.html',
  styleUrls: ['./config-factura-form.component.css']
})
export class ConfigFacturaFormComponent {
  form: UntypedFormGroup;
  entity: ConfigFactura = new ConfigFactura();
  submitted = false;
  mode = "new";
  _id: String;
  errMsg = [];

  get f() { return this.form.controls; }

  constructor(private entityService: ConfigFacturaService,
    private router: Router, private route: ActivatedRoute,
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
      Id: new UntypedFormControl(this.entity.Id,Validators.required),
      Nombre: new UntypedFormControl(this.entity.Nombre, [Validators.required, Validators.maxLength(60)]),
      Reporte: new UntypedFormControl(this.entity.Reporte),
      ReporteFiscal: new UntypedFormControl(this.entity.ReporteFiscal),
    });
  }

  popupData(): void {

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
    if (confirm("Desea borrar el actual asiento ? ")) {

      this.entityService.delete(this.entity.Id)
        .subscribe(res => this.goBack(),
          err => {
            alert("El servidor de mail no se puede eliminar.");
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
    this.router.navigate(['ventas/configfactura/list']);
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
