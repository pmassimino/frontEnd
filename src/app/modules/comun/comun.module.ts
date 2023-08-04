import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SujetoListComponent } from './sujeto/sujeto-list/sujeto-list.component';
import { ComunRoutingModule } from './comun-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { SujetoService } from './services/sujeto.service';
import { SujetoFormComponent } from './sujeto/sujeto-form/sujeto-form.component';
import { MatSelectionList } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { AreaSelectComponent } from './Area/area-select/area-select.component';
import { NumeradorDocumentoListComponent } from './NumeradorDocumento/numerador-documento-list/numerador-documento-list.component';
import { VentasRoutingModule } from '../ventas/ventas-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [SujetoListComponent, SujetoFormComponent, AreaSelectComponent, NumeradorDocumentoListComponent],
  imports: [CommonModule,ComunRoutingModule,SharedModule,FormsModule,
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
    NgxPaginationModule,          
  ],
  providers: [
    SujetoService
  ]
})
export class ComunModule { }
