import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaSelectComponent } from './empresa/empresa-select/empresa-select.component';
import { GlobalRoutingModule } from './global-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [EmpresaSelectComponent],
  imports: [
    CommonModule,GlobalRoutingModule,SharedModule,FormsModule,
    ReactiveFormsModule, 
    MatIconModule,MatSelectModule,MatInputModule,SharedModule,FormsModule,
    ReactiveFormsModule, 
    MatIconModule,MatSelectModule,MatInputModule,
  ]
})
export class GlobalModule { }
