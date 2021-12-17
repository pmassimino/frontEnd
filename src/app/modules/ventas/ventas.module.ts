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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticuloSelectComponent } from '../almacen/articulo/articulo-select/articulo-select.component';
import { BrowserModule } from '@angular/platform-browser';
import { FacturaAFIPComponent } from './factura/factura-afip/factura-afip.component';



@NgModule({
    declarations: [FacturaFormComponent, FacturaListComponent, FacturaAFIPComponent],
    imports: [
        CommonModule, VentasRoutingModule, SharedModule, FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
    ]
})
export class VentasModule { }
