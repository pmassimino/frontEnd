import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../../core/services/auth.guard';

import { CuentaMayorListComponent } from './cuentamayor/cuenta-mayor-list/cuenta-mayor-list.component';
import { CuentaMayorFormComponent } from './cuentamayor/cuenta-mayor-form/cuenta-mayor-form.component';
import { MayorListComponent } from './mayor/mayor-list/mayor-list.component';


const routes: Routes = [
  { path: 'cuentamayor/list', component: CuentaMayorListComponent ,canActivate: [AuthGuard]},
  { path: 'cuentamayor/add', component: CuentaMayorFormComponent ,canActivate: [AuthGuard]},
  { path: 'cuentamayor/:id', component: CuentaMayorFormComponent ,canActivate: [AuthGuard]},  
  { path: 'mayor/list', component: MayorListComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContableRoutingModule {}