import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { IndexComponent } from './modules/dashboard/index/index.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [{path: 'login', component: LoginComponent},
{ path: '', component: IndexComponent ,canActivate: [AuthGuard]},
{ path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
{ path: 'global', loadChildren: () => import('./modules/global/global.module').then(m => m.GlobalModule) },
{ path: 'almacen', loadChildren: () => import('./modules/almacen/almacen.module').then(m => m.AlmacenModule) },
{ path: 'comun', loadChildren: () => import('./modules/comun/comun.module').then(m => m.ComunModule) },
{ path: 'contable', loadChildren: () => import('./modules/contable/contable.module').then(m => m.ContableModule) },
{ path: 'ventas', loadChildren: () => import('./modules/ventas/ventas.module').then(m => m.VentasModule) },
{ path: 'tesoreria', loadChildren: () => import('./modules/tesoreria/tesoreria.module').then(m => m.TesoreriaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
