import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ArticuloFormComponent } from './articulo/articulo-form/articulo-form.component';
import { ArticuloListComponent } from './articulo/articulo-list/articulo-list.component';
import { AuthGuard } from '../../core/services/auth.guard';
import { FamiliaListComponent } from './familia/familia-list/familia-list.component';
import { FamiliaFormComponent } from './familia/familia-form/familia-form.component';
import { ArticuloListMatComponent } from './articulo/articulo-list-mat/articulo-list-mat.component';


const routes: Routes = [  
  { path: 'articulo/list', component: ArticuloListMatComponent ,canActivate: [AuthGuard],data:{permiso:"Almacen.Articulo.GetAll",reuseRoute: true}},   
  { path: 'articulo/add', component: ArticuloFormComponent,canActivate: [AuthGuard] },  
  { path: 'articulo/:id', component: ArticuloFormComponent,canActivate: [AuthGuard],data:{permiso:"Almacen.Articulo.Add"} },
  { path: 'familia/list', component: FamiliaListComponent ,canActivate: [AuthGuard]},
  { path: 'familia/add', component: FamiliaFormComponent,canActivate: [AuthGuard] },
  { path: 'familia/:id', component: FamiliaFormComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule {}
//{ path: 'articulo/:id', component: ArticuloFormComponent ,canActivate: [AuthGuard],data:{permiso:"Almacen.Articulo.GetAll"}}