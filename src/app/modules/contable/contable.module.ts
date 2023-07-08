import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaMayorListComponent } from './cuentamayor/cuenta-mayor-list/cuenta-mayor-list.component';
import { CuentaMayorFormComponent } from './cuentamayor/cuenta-mayor-form/cuenta-mayor-form.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ContableRoutingModule } from './contable-routing.module';
import { MayorListComponent } from './mayor/mayor-list/mayor-list.component';
import { ResumenSaldoListComponent } from './ctacte/resumen-saldo-list/resumen-saldo-list.component';
import { ResumenComponent } from './ctacte/resumen/resumen.component';
import { TestComponent } from './ctacte/test/test.component';
import { CuentaMayorSelectComponent } from './cuentamayor/cuenta-mayor-select/cuenta-mayor-select.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LibroIvaListComponent } from './libroiva/libro-iva-list/libro-iva-list.component';
import { AsientoFormComponent } from './asiento/asiento-form/asiento-form.component';
import { MayorBalanceComponent } from './mayor/mayor-balance/mayor-balance.component';
import { DiarioListComponent } from './diario/diario-list/diario-list.component';
import { MayorListViewComponent } from './mayor/mayor-list-view/mayor-list-view.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef, CdkTableModule } from '@angular/cdk/table';






@NgModule({
  declarations: [CuentaMayorListComponent, CuentaMayorFormComponent, MayorListComponent, ResumenSaldoListComponent, ResumenComponent, TestComponent, CuentaMayorSelectComponent, LibroIvaListComponent, AsientoFormComponent, MayorBalanceComponent, DiarioListComponent, MayorListViewComponent ],
  imports: [
    CommonModule,ContableRoutingModule,SharedModule,FormsModule,
    ReactiveFormsModule, MatIconModule,MatSelectModule,MatInputModule,SharedModule,FormsModule,
    MatDialogModule,NgxPaginationModule,MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    CdkTableModule,
    MatTableModule,    
    MatPaginatorModule, 
    MatSortModule,
  ],
  providers: [CdkColumnDef]
})
export class ContableModule { }
