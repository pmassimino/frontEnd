import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenRoutingModule } from './almacen-routing.module';
import {ArticuloService} from './services/articulo.service';
import { SharedModule } from '../../shared/shared.module';
import { ArticuloFormComponent } from './articulo/articulo-form/articulo-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ArticuloListComponent } from './articulo/articulo-list/articulo-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FamiliaListComponent } from './familia/familia-list/familia-list.component';
import { FamiliaFormComponent } from './familia/familia-form/familia-form.component';


@NgModule({
  declarations: [ ArticuloFormComponent,ArticuloListComponent, FamiliaListComponent, FamiliaFormComponent],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule, 
    MatIconModule,   
  ],
  providers: [
    ArticuloService
  ]

})
export class AlmacenModule { }
