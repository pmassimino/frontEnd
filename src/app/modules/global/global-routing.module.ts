import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/services/auth.guard';
import { EmpresaSelectComponent } from './empresa/empresa-select/empresa-select.component';

const routes: Routes = [
  { path: 'empresa/select', component: EmpresaSelectComponent ,canActivate: [AuthGuard]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalRoutingModule {}
