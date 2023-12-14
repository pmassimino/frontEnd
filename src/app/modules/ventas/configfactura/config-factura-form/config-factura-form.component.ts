import { Component } from '@angular/core';
import { MaxLengthValidator, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfigFactura, ItemPuntoEmision, PuntoEmision } from '../../models/model';
import { ConfigFacturaService } from '../../services/config-factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EntitySelectDialogComponent } from '../../../../shared/entity-select-dialog/entity-select-dialog.component';
import { EntitySelectView } from '../../../../shared/models/model';
import { PuntoEmisionService } from '../../services/punto-emision.service';

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
  puntoEmision: PuntoEmision[] = [];

  get f() { return this.form.controls; }

  get puntosemision(): UntypedFormArray {
    return this.form.get('PuntosEmision') as UntypedFormArray;
  }

  constructor(private entityService: ConfigFacturaService,
    private router: Router, private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder, private dialog: MatDialog,
    private puntoEmisionService: PuntoEmisionService) {
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
      Nombre: new UntypedFormControl(this.entity.Nombre, [Validators.required, Validators.maxLength(60)]),
      Reporte: new UntypedFormControl(this.entity.Reporte),
      ReporteFiscal: new UntypedFormControl(this.entity.ReporteFiscal),
      PuntosEmision: this.formBuilder.array([]),
    });
  }
  createPuntoEmision(itemPU: ItemPuntoEmision): UntypedFormGroup {

    //this.entity.PuntosEmision.push(itemPU);
    //let item = this.entity.PuntosEmision.length;
    let itemPUG = this.formBuilder.group({
      Id: itemPU.Id,
      IdPuntoEmision: new UntypedFormControl(itemPU.IdPuntoEmision, Validators.required),
    });
    this.puntosemision.push(itemPUG);
    return itemPUG;
  }

  popupData(): void {
    this.puntoEmisionService.findAll().subscribe(res => { 
      this.puntoEmision = res;       
    });

  }
  popupEntity(entity: ConfigFactura): void {
    entity.PuntosEmision.forEach(item => this.createPuntoEmision(item));      
  }

  setDefaultValues(): void {
    this.entityService.newDefault().subscribe(res => { this.entity = res; this.createForm(); }, err => { console.log(err); });
  }

  getById(id): void {
    this.entityService.findOne(id).subscribe(res => {
       this.entity = res; this.createForm();
       this.popupEntity(res);   });
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
  openDialogAddPuntoEmision(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "dialog-responsive";
    
    const data: EntitySelectView[] = this.puntoEmision.map(puntoEmision =>{
      const entitySelectView = new EntitySelectView();
      entitySelectView.Id = puntoEmision.Id;
      entitySelectView.Nombre = puntoEmision.Nombre;      
      return entitySelectView;
    });
    const filteredIds:string[] = this.form.get('PuntosEmision').value.map(item => item.IdPuntoEmision);
    dialogConfig.data = { entityData:data,filteredIds: filteredIds,titulo : "Seleccione los puntos de emision" };
    dialogConfig.width = "50%";
    dialogConfig.height = "50%";
    this.dialog.open(EntitySelectDialogComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (response.result == "ok") {
          if (response && response.selectedEntities) {
            const entitySelected: EntitySelectView[] = response.selectedEntities;
            let puntoEmisionSelected: PuntoEmision[]=[];            
            entitySelected.forEach(element => {
              let itemPE = new ItemPuntoEmision();
              itemPE.Id = this.entity.Id;
              itemPE.IdPuntoEmision = element.Id;
              //puntoEmisionSelected.push({ Id: element.Id});  // Corrección en esta línea              
              let item = this.createPuntoEmision(itemPE);              
            });
            this.puntoEmisionService.select(puntoEmisionSelected);
          }
        }
      });
  }
  removePuntoEmision(id: string) {
    const controlToRemove = this.puntosemision.controls.find(control =>
      control.get('IdPuntoEmision').value === id
    );
    if (controlToRemove) {
      this.puntosemision.removeAt(this.puntosemision.controls.indexOf(controlToRemove));
    }
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
