import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ArticuloFormComponent } from './articulo/articulo-form/articulo-form.component';
import { ArticuloListComponent } from './articulo/articulo-list/articulo-list.component';
import { AuthGuard } from '../../core/services/auth.guard';
import { FamiliaListComponent } from './familia/familia-list/familia-list.component';
import { FamiliaFormComponent } from './familia/familia-form/familia-form.component';


const routes: Routes = [
  { path: 'articulo/add', component: ArticuloFormComponent,canActivate: [AuthGuard] },
  { path: 'articulo/list', component: ArticuloListComponent ,canActivate: [AuthGuard]},
  { path: 'articulo/:id', component: ArticuloFormComponent ,canActivate: [AuthGuard]},
  { path: 'familia/list', component: FamiliaListComponent ,canActivate: [AuthGuard]},
  { path: 'familia/add', component: FamiliaFormComponent,canActivate: [AuthGuard] },
  { path: 'familia/:id', component: FamiliaFormComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule {}
