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



@NgModule({
  declarations: [CuentaMayorListComponent, CuentaMayorFormComponent, MayorListComponent],
  imports: [
    CommonModule,ContableRoutingModule,SharedModule,FormsModule,
    ReactiveFormsModule, 
    MatIconModule,MatSelectModule,MatInputModule,
  ]
})
export class ContableModule { }
