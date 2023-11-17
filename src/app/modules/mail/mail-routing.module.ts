import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/services/auth.guard';
import { MailServerListComponent } from './mailserver/mail-server-list/mail-server-list.component';
import { MailServerFormComponent } from './mailserver/mail-server-form/mail-server-form.component';


const routes: Routes = [
  { path: 'mailserver/list', component: MailServerListComponent ,canActivate: [AuthGuard]},
  { path: 'mailserver/add', component: MailServerFormComponent ,canActivate: [AuthGuard]},
  { path: 'mailserver/:id', component: MailServerFormComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailRoutingModule {}
