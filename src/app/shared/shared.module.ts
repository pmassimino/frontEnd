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
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { ToolbarFormComponent } from './toolbar-form/toolbar-form.component';
import { EntitySelectDialogComponent } from './entity-select-dialog/entity-select-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [LayoutComponent, NavbarComponent, FooterComponent, HeaderComponent,SidebarComponent, ToolbarComponent, ToolbarFormComponent, EntitySelectDialogComponent],
  imports: [CommonModule, RouterModule, MatIconModule, FormsModule ,
    MatExpansionModule,MatListModule,MatDialogModule,MatTableModule,MatPaginatorModule],
  exports:[LayoutComponent,ToolbarComponent,ToolbarFormComponent]
})
export class SharedModule { }
