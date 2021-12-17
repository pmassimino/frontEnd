import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../../core/services/auth.guard';
import { ReciboCtaCteFormComponent } from './ReciboCtaCte/recibo-cta-cte-form/recibo-form.component';
import { ReciboCtaCteListComponent } from './ReciboCtaCte/recibo-cta-cte-list/recibo-cta-cte-list.component';


const routes: Routes = [
  { path: 'reciboctacte/list', component: ReciboCtaCteListComponent ,canActivate: [AuthGuard]},
  { path: 'reciboctacte/add', component: ReciboCtaCteFormComponent ,canActivate: [AuthGuard]},
  { path: 'reciboctacte/:id', component: ReciboCtaCteFormComponent ,canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesoreriaRoutingModule {}
