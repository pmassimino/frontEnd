import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

export interface RouteInfoGlobal {
  title: string;
  icon: string;
  Routes: RouteInfo[];
}
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard',     title: 'Dashboard',         icon:'fas fa-home',       class: '' },
  { path: '/almacen/articulo',         title: 'Articulos',             icon:'nc-diamond',    class: '' },
  { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
  { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
  { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
  { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
  { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
  { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

export const ROUTESGLOBAL: RouteInfoGlobal[] = [{title: 'Almacen', icon: '',
Routes: [{ path: '/almacen/articulo',     title: 'Articulos',    icon: 'nc-diamond',  class: '' }]},
{title: 'Ventas', icon: '',
Routes: [{ path: '/ventas/factura',     title: 'Facturas',    icon: 'nc-diamond',  class: '' }]}];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTESGLOBAL.filter(menuItem => menuItem);
    }

}
