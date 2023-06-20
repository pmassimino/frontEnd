import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReciboCtaCteListComponent } from './ReciboCtaCte/recibo-cta-cte-list/recibo-cta-cte-list.component';
import { GlobalRoutingModule } from '../global/global-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TesoreriaRoutingModule } from './tesoreria-routing.module';
import { ReciboCtaCteService } from './services/recibo-cta-cte.service';
import { ReciboCtaCteFormComponent } from './ReciboCtaCte/recibo-cta-cte-form/recibo-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ComprobanteAddComponent } from './ReciboCtaCte/comprobante-add/comprobante-add.component';
import { ACtaAddComponent } from './ReciboCtaCte/acta-add/acta-add.component';
import { CarteraValorListComponent } from './CarteraValor/cartera-valor-list/cartera-valor-list.component';



@NgModule({
  declarations: [
    ReciboCtaCteListComponent,
    ReciboCtaCteFormComponent,
    ComprobanteAddComponent,
    ACtaAddComponent,
    CarteraValorListComponent,
  ],
  providers: [
    ReciboCtaCteService
  ],
  imports: [
    CommonModule,TesoreriaRoutingModule,GlobalRoutingModule,SharedModule,FormsModule,
    ReactiveFormsModule, 
    MatIconModule,MatSelectModule,MatInputModule,SharedModule,FormsModule,
    MatDialogModule,
  ]
})
export class TesoreriaModule { }
