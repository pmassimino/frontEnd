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
import { MatCardModule } from '@angular/material/card';
import { FacturaSelectComponent } from './factura/factura-select/factura-select.component';
import { ComprobanteAsociadoListComponent } from './factura/comprobante-asociado-list/comprobante-asociado-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PuntoEmisionListComponent } from './puntoemision/punto-emision-list/punto-emision-list.component';
import { PuntoEmisionFormComponent } from './puntoemision/punto-emision-form/punto-emision-form.component';
import { ConfigFacturaListComponent } from './configfactura/config-factura-list/config-factura-list.component';
import { ConfigFacturaFormComponent } from './configfactura/config-factura-form/config-factura-form.component';
import { PuntoEmisionSelectComponent } from './puntoemision/punto-emision-select/punto-emision-select.component';
import { PuntoEmisionConfigListComponent } from './configfactura/punto-emision-config-list/punto-emision-config-list.component';



@NgModule({
    declarations: [FacturaFormComponent, FacturaListComponent, FacturaAFIPComponent, FacturaSelectComponent, ComprobanteAsociadoListComponent, PuntoEmisionListComponent, PuntoEmisionFormComponent, ConfigFacturaListComponent, ConfigFacturaFormComponent, PuntoEmisionSelectComponent, PuntoEmisionConfigListComponent],
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
        MatTabsModule,
        MatCardModule         
    ]
})
export class VentasModule { }
