import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CuentaMayor } from '../../models/model';
import { CuentaMayorService } from '../../services/cuenta-mayor.service';

@Component({
  selector: 'app-cuenta-mayor-select',
  templateUrl: './cuenta-mayor-select.component.html',
  styleUrls: ['./cuenta-mayor-select.component.css']
})
export class CuentaMayorSelectComponent implements OnInit {

  entityData: CuentaMayor[] = [];
    

  constructor(private service: CuentaMayorService,
     private router: Router,private dialogRef: MatDialogRef<CuentaMayorSelectComponent>,
     @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void
    {
      this.getAll();
    }

  add(item:CuentaMayor): void
    {       
     this.service.Current = item;
     this.dialogRef.close({ data: 'ok' });
    }
  
  getAll():void
    {
      this.service.findAll()
      .subscribe(res => {this.entityData = res.filter(f=>f.IdUso != "1"); } ,
      err => {console.log(err) ; });
    }
    findByName(name): void {       
      this.service.findByName(name)
     .subscribe(res => {this.entityData = res.filter(f=>f.IdUso != "1");} , err => {console.log(err) ; });
    }
    close():void
    {
      this.dialogRef.close({ data: 'cancel' });
    }
    cancel():void
    {
      this.dialogRef.close({ data: 'cancel' });
    }

}
