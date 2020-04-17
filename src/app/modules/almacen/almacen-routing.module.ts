import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticuloComponent } from '../almacen/articulo/articulo.component';
import { ArticuloCreateComponent } from './articulo/articulo-create/articulo-create.component';


const routes: Routes = [
  {
    path: 'articulo',
    component: ArticuloComponent
  },
  { path: 'articulo/add', component: ArticuloCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule {}
