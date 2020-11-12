import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaFormComponent } from './factura/factura-form/factura-form.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FacturaListComponent } from './factura/factura-list/factura-list.component';



@NgModule({
  declarations: [FacturaFormComponent, FacturaListComponent],
  imports: [
    CommonModule,VentasRoutingModule,SharedModule,FormsModule,
    ReactiveFormsModule, 
    MatIconModule,MatSelectModule,MatInputModule,
  ]
})
export class VentasModule { }
