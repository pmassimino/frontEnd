import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../../core/services/auth.guard';

import { FacturaFormComponent } from './factura/factura-form/factura-form.component';
import { FacturaListComponent } from './factura/factura-list/factura-list.component';
import { PuntoEmisionListComponent } from './puntoemision/punto-emision-list/punto-emision-list.component';
import { PuntoEmisionFormComponent } from './puntoemision/punto-emision-form/punto-emision-form.component';
import { ConfigFacturaListComponent } from './configfactura/config-factura-list/config-factura-list.component';
import { ConfigFacturaFormComponent } from './configfactura/config-factura-form/config-factura-form.component';


const routes: Routes = [
  { path: 'factura/list', component: FacturaListComponent ,canActivate: [AuthGuard],data:{permiso:"Venta.Factura.GetAll"}},
  { path: 'factura/add', component: FacturaFormComponent ,canActivate: [AuthGuard],data:{permiso:"Venta.Factura.Add"}},
  { path: 'factura/:id', component: FacturaFormComponent ,canActivate: [AuthGuard],data:{permiso:"Venta.Factura.Edit"}},
  { path: 'puntoemision/list', component: PuntoEmisionListComponent ,canActivate: [AuthGuard]},
  { path: 'puntoemision/add', component: PuntoEmisionFormComponent ,canActivate: [AuthGuard]},
  { path: 'puntoemision/:id', component: PuntoEmisionFormComponent ,canActivate: [AuthGuard]},
  { path: 'configfactura/list', component: ConfigFacturaListComponent ,canActivate: [AuthGuard]},
  { path: 'configfactura/add', component: ConfigFacturaFormComponent ,canActivate: [AuthGuard]},
  { path: 'configfactura/:id', component: ConfigFacturaFormComponent ,canActivate: [AuthGuard]}      

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule {}
