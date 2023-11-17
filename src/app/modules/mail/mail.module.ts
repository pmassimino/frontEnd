import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailServerListComponent } from './mailserver/mail-server-list/mail-server-list.component';
import { ContableRoutingModule } from '../contable/contable-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MailRoutingModule } from './mail-routing.module';
import { MailServerFormComponent } from './mailserver/mail-server-form/mail-server-form.component';



@NgModule({
  declarations: [
    MailServerListComponent,
    MailServerFormComponent
  ],
  imports: [ 
    CommonModule,MailRoutingModule,SharedModule,FormsModule,
    ReactiveFormsModule, MatIconModule,MatSelectModule,MatInputModule,SharedModule,FormsModule,
    MatDialogModule,NgxPaginationModule,MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    CdkTableModule,
    MatTableModule,    
    MatPaginatorModule, 
    MatSortModule
  ]
})
export class MailModule { }
