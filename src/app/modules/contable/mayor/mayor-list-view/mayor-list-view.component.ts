import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CuentaMayor, MayorView } from '../../models/model';
import { MayorService } from '../../services/mayor.service';
import { TransaccionService } from '../../../comun/services/transaccion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ParamBase } from '../../../../core/models/common';
import { CuentaMayorService } from '../../services/cuenta-mayor.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CuentaMayorSelectComponent } from '../../cuentamayor/cuenta-mayor-select/cuenta-mayor-select.component';



@Component({
  selector: 'app-mayor-list-view',
  templateUrl: './mayor-list-view.component.html',
  styleUrls: ['./mayor-list-view.component.css']
})
export class MayorListViewComponent implements OnInit {
  form: UntypedFormGroup;
  param: ParamMayor = new ParamMayor();
  totalDebe: number;
  totalHaber: number;
  currentCuenta: CuentaMayor;
  idCuentaMayor: string;
  cuentaMayor: CuentaMayor[] = [];
  //Paginacion
  pageSize = 14; // Número de elementos por página
  currentPage = 1;
  totalItems = 0;
  dataSource: MatTableDataSource<MayorView>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Fecha', 'Numero', 'Concepto', 'Debe', 'Haber', 'SaldoPeriodo', 'Saldo', 'Edit'];
  constructor(private service: MayorService, private route: ActivatedRoute,
    private router: Router, private transaccionService: TransaccionService,
    private cuentaMayorService: CuentaMayorService,
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder) {
    this.param.IdCuentaMayor = this.route.snapshot.queryParams['idCuentaMayor'];
    this.createForm();

  }
  ngOnInit(): void {
    this.onSubmit();
  }
  onSubmit(): void {
    this.param = this.form.value;
    this.service.listView(this.param.IdCuentaMayor, this.param.Fecha, this.param.FechaHasta)
      .subscribe(res => { this.dataSource = new MatTableDataSource(res); this.configTable(); this.calcular(); })
  }
  popupData(): void {
    this, this.cuentaMayorService.findAll().subscribe(res => { this.cuentaMayor = res.filter(f => f.IdTipo = "1"); })
  }
  configTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onPrint(): void {
    this.service.print(this.param.IdCuentaMayor, this.param.Fecha, this.param.FechaHasta).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);
    });
  }
  createForm(): void {
    this.form = new UntypedFormGroup({
      Fecha: new UntypedFormControl(this.param.Fecha, Validators.required),
      FechaHasta: new UntypedFormControl(this.param.FechaHasta, Validators.required),
      IdCuentaMayor: new UntypedFormControl(this.param.IdCuentaMayor, Validators.required)
    });
  }
  findByName(name): void {
    this.dataSource.filter = name.trim().toLowerCase();
    this.calcular();
  }

  calcular(): void {
    this.totalDebe = 0;
    this.totalHaber = 0;
    this.totalDebe = this.dataSource.filteredData.reduce((total, item) => total + item.Debe, 0);
    this.totalHaber = this.dataSource.filteredData.reduce((total, item) => total + item.Haber, 0);
  }
  setCuentaMayor(idCuentaMayor:string)
  {
    this.cuentaMayorService.findOne(idCuentaMayor).subscribe(res=>{this.currentCuenta = res;this.onSubmit();});
  }
  showCuentaMayor(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = "dialog-responsive";

    this.dialog.open(CuentaMayorSelectComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (response.data == "ok") {
          this.form.get('IdCuentaMayor').setValue(this.cuentaMayorService.Current.Id);
          this.currentCuenta = this.cuentaMayorService.Current;
          this.onSubmit();
        }
      });
  }


}
class ParamMayor extends ParamBase {
  IdCuentaMayor: string;
}



