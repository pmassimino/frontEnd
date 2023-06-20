import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../../core/services/auth.guard';
import { CarteraValorListComponent } from './CarteraValor/cartera-valor-list/cartera-valor-list.component';
import { ReciboCtaCteFormComponent } from './ReciboCtaCte/recibo-cta-cte-form/recibo-form.component';
import { ReciboCtaCteListComponent } from './ReciboCtaCte/recibo-cta-cte-list/recibo-cta-cte-list.component';


const routes: Routes = [
  { path: 'reciboctacte/list', component: ReciboCtaCteListComponent ,canActivate: [AuthGuard],data:{permiso:"Tesoreria.ReciboCtaCte.GetAll"}},
  { path: 'reciboctacte/add', component: ReciboCtaCteFormComponent , canActivate: [AuthGuard],data:{permiso:"Tesoreria.ReciboCtaCte.Add"}},
  { path: 'reciboctacte/:id', component: ReciboCtaCteFormComponent ,canActivate: [AuthGuard],data:{permiso:"Tesoreria.ReciboCtaCte.GetAll"}},
  { path: 'carteravalor/list', component: CarteraValorListComponent ,canActivate: [AuthGuard]},  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesoreriaRoutingModule {}
