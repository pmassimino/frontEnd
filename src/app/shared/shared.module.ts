import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from '../modules/login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [LayoutComponent, NavbarComponent, FooterComponent, HeaderComponent,SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports:[LayoutComponent]
})
export class SharedModule { }
