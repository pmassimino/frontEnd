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
import { MatDialogModule } from '@angular/material/dialog';
import { FacturaAFIPComponent } from './factura/factura-afip/factura-afip.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FacturaSelectComponent } from './factura/factura-select/factura-select.component';



@NgModule({
    declarations: [FacturaFormComponent, FacturaListComponent, FacturaAFIPComponent, FacturaSelectComponent],
    imports: [
        CommonModule, VentasRoutingModule, SharedModule, FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        MatPaginatorModule, 
        MatSortModule,        
        MatTableModule,          
    ]
})
export class VentasModule { }
