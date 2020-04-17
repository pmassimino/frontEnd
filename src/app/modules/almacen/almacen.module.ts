import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloComponent } from './articulo/articulo.component';
import { AlmacenRoutingModule } from './almacen-routing.module';
import {ArticuloService} from './services/articulo.service';
import { SharedModule } from '../../shared/shared.module';
import { ArticuloCreateComponent } from './articulo/articulo-create/articulo-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticuloComponent, ArticuloCreateComponent],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    ArticuloService
  ]

})
export class AlmacenModule { }
