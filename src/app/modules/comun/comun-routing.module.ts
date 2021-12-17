import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../../core/services/auth.guard';
import { SujetoListComponent } from './sujeto/sujeto-list/sujeto-list.component';
import { SujetoFormComponent } from './sujeto/sujeto-form/sujeto-form.component';
import { AreaSelectComponent } from './Area/area-select/area-select.component';


const routes: Routes = [
  { path: 'sujeto/list', component: SujetoListComponent ,canActivate: [AuthGuard]},
  { path: 'sujeto/add', component: SujetoFormComponent ,canActivate: [AuthGuard]},
  { path: 'sujeto/:id', component: SujetoFormComponent ,canActivate: [AuthGuard]},
  { path: 'area/select', component: AreaSelectComponent ,canActivate: [AuthGuard]},   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunRoutingModule {}
