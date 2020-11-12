import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../../core/services/auth.guard';

import { FacturaFormComponent } from './factura/factura-form/factura-form.component';
import { FacturaListComponent } from './factura/factura-list/factura-list.component';


const routes: Routes = [
  { path: 'factura/list', component: FacturaListComponent ,canActivate: [AuthGuard]},
  { path: 'factura/add', component: FacturaFormComponent ,canActivate: [AuthGuard]},
  { path: 'factura/:id', component: FacturaFormComponent ,canActivate: [AuthGuard]},   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule {}
