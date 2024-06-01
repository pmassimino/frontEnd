import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators, UntypedFormArray } from '@angular/forms';
import { Factura, DetalleFactura, MedioPago, FacturaSelectView, ComprobanteAsociado, PuntoEmision, ConfigFactura } from '../../models/model';
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
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArticuloSelectComponent } from '../../../almacen/articulo/articulo-select/articulo-select.component';
import { CarritoCompraService } from '../../../almacen/services/carrito-compra.service';
import { FacturaAFIPComponent } from '../factura-afip/factura-afip.component';
import { CondIvaOperacionService } from '../../../global/services/cond-iva-operacion.service';
import { SessionService } from '../../../comun/services/session.service';
import { FacturaSelectComponent } from '../factura-select/factura-select.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PuntoEmisionService } from '../../services/punto-emision.service';
import { ConfigFacturaService } from '../../services/config-factura.service';
import { SettingService } from '../../../comun/services/setting.service';

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css'],
  providers: [DatePipe],  
})
export class FacturaFormComponent implements OnInit {


  form: UntypedFormGroup;
  entity: Factura = new Factura();
  totalItems: number = 0;
  submitted = false;
  mode = "new";
  _id: String;
  articulos: Articulo[] = [];
  sujetos: Sujeto[] = [];
  puntoEmision:PuntoEmision[]=[];
  configFactura:ConfigFactura[]=[];
  sujeto: Sujeto;
  tipoFactura: TipoFactura[] = [];
  mediosPagos: CuentaMayor[] = [];
  letras: String[] = [];
  condIva: CondIvaOperacion[] = [];
  errors = [];
  DigitosDecimal: number = 2;
  

  get f() { return this.form.controls; }


  constructor(private entityService: FacturaService, private sujetoService: SujetoService, private articuloService: ArticuloService,
    private tipoFacturaService: TipoFacturaService, private cuentaMayorService: CuentaMayorService, private condIvaOperacionService: CondIvaOperacionService,
    private sessionServie: SessionService,private puntoEmisionService:PuntoEmisionService,
    private configFacturaService:ConfigFacturaService,
    private router: Router, private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder, private dialog: MatDialog, private carritoService: CarritoCompraService) {
    this.DigitosDecimal = entityService.DigitosDecimal    
  }

  ngOnInit(): void {
    this.popupData();
    this._id = this.route.snapshot.params['id'];
    //editar
    if (this._id) {
      this.getById(this._id);
      this.mode = "edit"
    }
    else //set default values
    {
      this.setDefaultValues();

    }

  }

  createForm(): void {
    this.form = this.formBuilder.group({
      Id: new UntypedFormControl(this.entity.Id),
      IdEmpresa: new UntypedFormControl(this.entity.IdEmpresa),
      IdSucursal: new UntypedFormControl(this.entity.IdSucursal),
      IdArea: new UntypedFormControl(this.entity.IdArea),
      IdSeccion: new UntypedFormControl(this.entity.IdSeccion),
      IdTransaccion: new UntypedFormControl(this.entity.IdTransaccion),
      IdMoneda: new UntypedFormControl(this.entity.IdMoneda),
      Letra: new UntypedFormControl(this.entity.Letra, Validators.required),
      Fecha: new UntypedFormControl(this.entity.Fecha, Validators.required),
      FechaComp: new UntypedFormControl(this.entity.FechaComp, Validators.required),
      FechaVencimiento: new UntypedFormControl(this.entity.FechaVencimiento, Validators.required),
      IdCuenta: new UntypedFormControl(this.entity.IdCuenta, Validators.required),
      IdPuntoEmision: new UntypedFormControl(this.entity.IdPuntoEmision),
      Pe: new UntypedFormControl(this.entity.Pe, { validators: Validators.required }),
      Numero: new UntypedFormControl(this.entity.Numero, { validators: Validators.required }),
      Tipo: new UntypedFormControl(this.entity.Tipo, { validators: Validators.required }),
      TotalNeto: new UntypedFormControl(this.entity.TotalNeto),
      TotalItems: new UntypedFormControl(0),
      PorDescuento: new UntypedFormControl(this.entity.PorDescuento),
      TotalDescuento: new UntypedFormControl(this.entity.TotalDescuento),
      TotalGravado: new UntypedFormControl(this.entity.TotalGravado),
      TotalNoGravado: new UntypedFormControl(this.entity.TotalNoGravado),
      TotalExento: new UntypedFormControl(this.entity.TotalExento),
      TotalIva: new UntypedFormControl(this.entity.TotalIva),
      TotalOTributos: new UntypedFormControl(this.entity.TotalOTributos),
      Total: new UntypedFormControl(this.entity.Total),
      Obs: new UntypedFormControl(this.entity.Obs),
      Detalle: this.formBuilder.array([], Validators.required),
      MedioPago: this.formBuilder.array([]),
      ComprobanteAsociado: this.formBuilder.array([])
    });
    this.form.get('Letra').valueChanges.subscribe(res => this.onNextNumber());
    this.form.get('Tipo').valueChanges.subscribe(res => this.onNextNumber());  
  }

  get detalle(): UntypedFormArray {
    return this.form.get('Detalle') as UntypedFormArray;
  }
  get mediopago(): UntypedFormArray {
    return this.form.get('MedioPago') as UntypedFormArray;
  }
  
  get comprobanteasociado(): UntypedFormArray {
    return this.form.get('ComprobanteAsociado') as UntypedFormArray;
  }


  onNextNumber() {
    if (this.mode == "new") {
      const idSeccion = this.form.get("IdSeccion").value;      
      const letra = this.form.get("Letra").value;
      const idPuntoEmision = this.form.get("IdPuntoEmision").value;
      const tipo = this.form.get("Tipo").value;
      this.entityService.nextNumber(idPuntoEmision, letra, tipo).subscribe(res => {
        this.form.get("Pe").patchValue(res.PuntoEmision);
        this.form.get("Numero").patchValue(res.Numero);
      })
    }
  }

  addDetalle() {
    //let detalleFactura = new DetalleFactura();
    let itemDetalle = new DetalleFactura();
    itemDetalle.Cantidad = 1;
    itemDetalle.Precio = 0;
    itemDetalle.Total = 0;
    this.entity.Detalle.push(itemDetalle);
    let item = this.createItem(itemDetalle);
  }
  addMedioPago() {
    let medioPago = new MedioPago();
    medioPago.Id = this.entity.Id;
    medioPago.IdCuentaMayor = "1111"
    medioPago.Concepto = "CONTADO"
    medioPago.Importe = this.entity.Total;
    let item = this.createMedioPago(medioPago);
  }
  removeMedioPago(i: number) {
    this.mediopago.removeAt(i);
    this.calculateTotal();
  }

  removeDetalle(i: number) {
    this.detalle.removeAt(i);
    this.calculateTotal();
  }
  removeComprobanteAsociado(id: string) {
    const controlToRemove = this.comprobanteasociado.controls.find(control =>
      control.get('IdFactura').value === id
    );

    if (controlToRemove) {
      this.comprobanteasociado.removeAt(this.comprobanteasociado.controls.indexOf(controlToRemove));
    }
  }
  createItem(itemDetalle: DetalleFactura): UntypedFormGroup {

    let item = this.entity.Detalle.length;
    let itemGrp = this.formBuilder.group({
      Id: this.entity.Id,
      Item: item,
      IdArticulo: new UntypedFormControl(itemDetalle.IdArticulo, Validators.required),
      Cantidad: new UntypedFormControl(itemDetalle.Cantidad, Validators.required),
      Concepto: new UntypedFormControl(itemDetalle.Concepto, Validators.required),
      Precio: new UntypedFormControl(itemDetalle.Precio, Validators.required),
      PorBonificacion: new UntypedFormControl(itemDetalle.PorBonificacion),
      Bonificacion: new UntypedFormControl(itemDetalle.Bonificacion),
      Gravado: new UntypedFormControl(itemDetalle.Gravado),
      NoGravado: new UntypedFormControl(itemDetalle.NoGravado),
      Exento: new UntypedFormControl(itemDetalle.Exento),
      CondIva: new UntypedFormControl(itemDetalle.CondIva),
      OtroTributo: new UntypedFormControl(itemDetalle.OtroTributo),
      ImpuestoVenta: new UntypedFormControl(itemDetalle.OtroTributo / itemDetalle.Cantidad),
      Iva: new UntypedFormControl(itemDetalle.Iva),
      Total: new UntypedFormControl(itemDetalle.Total, Validators.required),
    });
    itemGrp.get('Cantidad').valueChanges.subscribe(res => this.calculateTotal());
    itemGrp.get('PorBonificacion').valueChanges.subscribe(res => this.calculateTotal());
    itemGrp.get('Precio').valueChanges.subscribe(res => this.calculateTotal());
    itemGrp.get('IdArticulo').valueChanges.subscribe(res => this.calculateTotal());
    this.detalle.push(itemGrp);
    return itemGrp;
  }
  createMedioPago(medioPago: MedioPago): UntypedFormGroup {

    this.entity.MedioPago.push(medioPago);
    let item = this.entity.MedioPago.length;
    let itemGrpMP = this.formBuilder.group({
      Id: medioPago.Id,
      Item: item,
      Concepto: new UntypedFormControl(medioPago.Concepto, Validators.required),
      IdCuentaMayor: new UntypedFormControl(medioPago.IdCuentaMayor, Validators.required),
      Importe: new UntypedFormControl(medioPago.Importe, Validators.required),
    });
    itemGrpMP.get('Importe').valueChanges.subscribe(res => this.updateImporteMedioPago(res));

    this.mediopago.push(itemGrpMP);
    return itemGrpMP;
  }
  createComprobanteAsociado(item: ComprobanteAsociado): UntypedFormGroup {

    let numero = this.entity.ComprobanteAsociado.length;
    let itemGrp = this.formBuilder.group({
      Id: this.entity.Id,
      Item: numero,
      IdFactura: new UntypedFormControl(item.IdFactura, Validators.required)
    });
    this.comprobanteasociado.push(itemGrp);
    return itemGrp;
  }
  updateImporteMedioPago(item: any) {
    let pitem = item;
  }


  updateTotalMedioPago(total) {
    if (this.mediopago.length == 1) {
      this.mediopago.at(0).get("Importe").setValue(total.toFixed(this.DigitosDecimal));
    }
  }
  addArticulo(itemGrp: UntypedFormGroup) {
    let idArticulo = itemGrp.get('IdArticulo').value;
    this.articuloService.findOne(idArticulo).subscribe(
      res => {
        itemGrp.get('Concepto').setValue(res.Nombre, { onlySelf: true });
        let precioVenta = res.PrecioVenta;
        itemGrp.get('CondIva').setValue(res.CondIva, { onlySelf: true });
        itemGrp.get('Precio').setValue(precioVenta, { onlySelf: true });
        itemGrp.get('CondIva').setValue(res.CondIva, { onlySelf: true });
        itemGrp.get('ImpuestoVenta').setValue(res.ImpuestoVenta, { onlySelf: true });
      },
      err => { console.log(err); });

  }

  popupData(): void {
    this.entityService.letrasDisponible(this.sessionServie.CurrentSeccion.Id).subscribe(res => this.letras = res);
    this.sujetoService.findAll().subscribe(res => { this.sujetos = res; }, err => { console.log(err); });
    this.articuloService.findAll().subscribe(res => { this.articulos = res; }, err => { console.log(err); });
    this.tipoFacturaService.findAll().subscribe(res => { this.tipoFactura = res; }, err => { console.log(err); });
    this.cuentaMayorService.findMediosPagos().subscribe(res => { this.mediosPagos = res }, err => { console.log(err); })
    this.sujetoService.findOne(this.entity.IdCuenta).subscribe();
    this.condIvaOperacionService.findAll().subscribe(res => { this.condIva = res; }, err => { console.log(err); });
    this.configFacturaService.findAll().subscribe(res=>{this.configFactura=res;this.popupPuntosEmision(this.entity.IdSeccion)})
  }
  popupEntity(entity: Factura): void {
    entity.MedioPago.forEach(item => this.createMedioPago(item));
    entity.Detalle.forEach(item => this.createItem(item));
    entity.ComprobanteAsociado.forEach(item => this.createComprobanteAsociado(item));
    this.popupPuntosEmision(this.entity.IdSeccion)
  }
  popupPuntosEmision(idSeccion: string) {
    // Obtener la instancia de ConfigFactura con el id proporcionado
    const configFacturaInstancia = this.configFactura.find(w=>w.Id==idSeccion); // Supongamos que ya tienes esta instancia

    // Obtener los ids de PuntosEmision de la ConfigFactura actual con el idSeccion proporcionado
    const idsPuntosEmision = configFacturaInstancia.PuntosEmision
      .filter(item => item.Id === idSeccion)
      .map(item => item.IdPuntoEmision);

    // Filtrar los puntos de emisión por los ids obtenidos
    this.puntoEmisionService.findAll().subscribe(res => {
      const puntosEmisionFiltrados = res.filter(punto => idsPuntosEmision.includes(punto.Id));
     this.puntoEmision= puntosEmisionFiltrados;
    });

    // Devolver un array vacío en caso de que aún no se haya completado la suscripción
    return [];
  }
  
  setDefaultValues(): void {
    this.entityService.newDefault().subscribe(res => {
      this.entity = res; this.createForm(); this.onNextNumber();
      this.markFormGroupTouched(this.form); this.addMedioPago();
      this.popupPuntosEmision(this.entity.IdSeccion);      
      this.form.patchValue({"IdPuntoEmision": "00002"});
        
    }, err => { console.log(err); });
  }
  getById(id): void {
    this.entityService.findOne(id).subscribe(
      res => {
        this.entity = res; this.createForm(); this.popupEntity(this.entity);
        this.markFormGroupTouched(this.form);
      });
  }
  new(): void {
    this.submitted = false;
  }
  print() {
    this.entityService.print(this.entity.Id).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);
    });
  }
  save() {
    this.entity = this.form.value;

    if (this.mode == "new") {  //new
      this.entityService.add(this.entity)
        .subscribe(data => { this.goEdit(data.Id); },
          error => {
            console.log(error);
            this.setControlsError(error.error); for (var tKey in error.error) this.errors.push({ name: tKey, value: error.error[tKey] });
          });
    }
    else //Edit
    {
      this.entityService.update(this.entity.Id, this.entity)
        .subscribe(data => { this.goEdit(data.Id); }, error => {
          console.log(error);
          this.setControlsError(error.error); for (var tKey in error.error) this.errors.push({ name: tKey, value: error.error[tKey] });
        });
    }
  }
  onAddNew(): void {
    this.router.navigate(['ventas/factura/add']);
  }

  calculateTotal(): void {
    this.entity = this.form.value;
    let totalNoGravado = 0;
    let totalExento = 0;
    let totalGravado = 0;
    let total = 0;
    let totalIva = 0;
    let totalItems = 0;
    let totalOTributos = 0;
    for (let item of this.detalle.controls) {
      let tmpCondIva = this.condIva.find(i => i.Id == this.detalle.at(totalItems).get('CondIva').value);
      //Bonificacion
      let cantidad = this.detalle.at(totalItems).get('Cantidad').value;
      let precio = this.detalle.at(totalItems).get('Precio').value;
      let impuestoVenta = this.detalle.at(totalItems).get('ImpuestoVenta').value;
      let porBonificacion = this.detalle.at(totalItems).get('PorBonificacion').value
      let bonificacion = cantidad * precio * porBonificacion / 100;
      let subTotal = cantidad * precio - bonificacion;
      let subTotalImpuesto = cantidad * impuestoVenta;
      let gravado = 0;
      let noGravado = 0;
      let exento = 0;

      if (tmpCondIva.Id == "001")//No Gravado
      {
        item.get("NoGravado").patchValue(subTotal);
        noGravado = subTotal;
      }
      else if (tmpCondIva.Id == "002")//Exento
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
      let iva = gravado * tmpCondIva.Alicuota / 100;
      totalNoGravado += noGravado;
      totalExento += exento;
      totalGravado += gravado;
      totalOTributos += subTotalImpuesto;
      totalIva += iva;
      this.detalle.at(totalItems).get('OtroTributo').patchValue(totalOTributos);
      this.detalle.at(totalItems).get('Total').patchValue(subTotal);
      this.detalle.at(totalItems).get('Item').patchValue(totalItems);
      totalItems += 1;
    }
    //let totalOTributos = 0;
    // for (let item of this.entity.Tributos) 
    // {
    //   totalOTributos += item.Importe;
    // }

    this.entity.TotalOTributos = totalOTributos;
    let totalNeto = totalNoGravado + totalExento + totalGravado;
    let totalDescuento = totalNeto * this.entity.PorDescuento / 100
    total = totalNeto - totalDescuento + totalOTributos + totalIva;

    this.form.patchValue({
      "TotalNeto": totalNeto.toFixed(this.DigitosDecimal), "TotalItems": totalItems, "TotalGravado": totalGravado.toFixed(this.DigitosDecimal),
      "TotalNoGravado": totalNoGravado.toFixed(this.DigitosDecimal), "TotalExento": totalExento.toFixed(this.DigitosDecimal), "TotalOTributos": totalOTributos.toFixed(this.DigitosDecimal), "TotalIva": totalIva.toFixed(this.DigitosDecimal), "Total": total.toFixed(this.DigitosDecimal)
    });
    this.updateTotalMedioPago(total);


  }

  private markFormGroupTouched(form: UntypedFormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsPristine();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as UntypedFormGroup);
      }
    });
  }
  onCuentaChange() {
    this.sujetoService.findOne(this.form.get("IdCuenta").value).subscribe(
      res => this.setDefaultLetra(res.IdCondicionIva));

  }
  setDefaultLetra(idCondIva: string) {
    if (idCondIva == "01") {
      this.form.get("Letra").patchValue("A");
    }
    else {
      this.form.get("Letra").patchValue("B");
    }
    if (this.sessionServie.CurrentEmpresa.IdCondicionIva == "05") {
      this.form.get("Letra").patchValue("C");
    }
  }
  onSubmit() {
    this.save();
  }

  goBack() {
    this.router.navigate(['ventas/factura/list']);
  }
  goEdit(id) {
    this.getById(this._id);
    this.router.navigate(['ventas/factura/', id]);
  }
  onDelete() {
    if (confirm("Desea borrar la actual Factura ? ")) {

      this.entityService.delete(this.entity.Id)
        .subscribe(res => this.goBack(),
          err => {
            alert("El asiento no se puede eliminar.");
            // Revert the view back to its original state

          });
    }
  }  

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "dialog-responsive";
    dialogConfig.width = "80%";
    dialogConfig.height = "80%";

    this.dialog.open(ArticuloSelectComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        this.descargaCarrito();
      });
  }
  openDialogAfip() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "dialog-responsive";
    this.dialog.open(FacturaAFIPComponent, { data: { id: this.entity.Id }, width: '50%', height: '50%' }).afterClosed()
      .subscribe(response => {
        this.getById(this._id);
      });
  }
  openDialogAddFactura(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "dialog-responsive";
    dialogConfig.data = { idCuenta: this.form.get("IdCuenta").value };
    dialogConfig.width = "100%";
    dialogConfig.height = "90%";

    this.dialog.open(FacturaSelectComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (response.result == "ok") {
          if (response && response.selectedFacturas) {
            const facturasSelect: FacturaSelectView[] = response.selectedFacturas;
            let i: number = 0;
            facturasSelect.forEach(element => {
              let itemCA = new ComprobanteAsociado();
              itemCA.Id = this.entity.Id;
              itemCA.Item = i;
              i += 1;
              itemCA.IdFactura = element.Id;
              //this.entity.ComprobanteAsociado.push(itemCA);               
              let item = this.createComprobanteAsociado(itemCA);
            });
            const facturas: Factura[] = facturasSelect.map((facturaSelectView) => {
              const factura = new Factura();
              // Copiar las propiedades de FacturaSelectView a Factura
              Object.assign(factura, facturaSelectView);
              // No olvides establecer Select en Factura si es necesario
              // factura.Select = facturaSelectView.Select;
              return factura;
            });
            this.entityService.select(facturas);

          }
        }
      });
  }

  descargaCarrito() {
    var articulos = this.carritoService.getAll();
    articulos.forEach(element => {
      let itemDetalle = new DetalleFactura();
      itemDetalle.IdArticulo = element.Articulo.Id;
      itemDetalle.Concepto = element.Articulo.Nombre;
      itemDetalle.Cantidad = element.Cantidad;
      itemDetalle.Precio = element.Articulo.PrecioVenta;
      itemDetalle.CondIva = element.Articulo.CondIva;
      this.entity.Detalle.push(itemDetalle);
      let item = this.createItem(itemDetalle);
      item.get('ImpuestoVenta').setValue(element.Articulo.ImpuestoVenta, { onlySelf: true });

    });
    this.carritoService.deleteAll();
    this.calculateTotal();
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

}
