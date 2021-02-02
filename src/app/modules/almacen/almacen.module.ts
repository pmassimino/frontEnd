import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenRoutingModule } from './almacen-routing.module';
import {ArticuloService} from './services/articulo.service';
import { SharedModule } from '../../shared/shared.module';
import { ArticuloFormComponent } from './articulo/articulo-form/articulo-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ArticuloListComponent } from './articulo/articulo-list/articulo-list.component';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from "@angular/material/dialog";
import { FamiliaListComponent } from './familia/familia-list/familia-list.component';
import { FamiliaFormComponent } from './familia/familia-form/familia-form.component';
import { ArticuloSelectComponent } from './articulo/articulo-select/articulo-select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [ ArticuloFormComponent,ArticuloListComponent, 
    FamiliaListComponent, FamiliaFormComponent, ArticuloSelectComponent],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule 
  ],
  entryComponents: [
    ArticuloSelectComponent
  ],
  providers: [
    ArticuloService
  ],
  exports: [ArticuloSelectComponent],

})
export class AlmacenModule { }
