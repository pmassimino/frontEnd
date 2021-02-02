import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../../core/services/auth.guard';


import { IndexComponent } from './index/index.component';


const routes: Routes = [ { path: '', component: IndexComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})
export class DashboardRoutingModule {}
