import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';



const routes: Routes = [{path: 'login', component: LoginComponent},
{ path: 'almacen', loadChildren: () => import('./modules/almacen/almacen.module').then(m => m.AlmacenModule) },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
