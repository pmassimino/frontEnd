import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Articulo } from '../../models/model';
import { ArticuloService } from '../../services/articulo.service';
import { CarritoCompraService } from '../../services/carrito-compra.service';

@Component({
  selector: 'app-articulo-select',
  templateUrl: './articulo-select.component.html',
  styleUrls: ['./articulo-select.component.css']
})
export class ArticuloSelectComponentBack implements OnInit {

  articuloData: Articulo[] = [];
    

    constructor(private articuloApi: ArticuloService,private carritoService: CarritoCompraService,
       private router: Router,private dialogRef: MatDialogRef<ArticuloSelectComponentBack>,
       @Inject(MAT_DIALOG_DATA) data) { }

    ngOnInit(): void
      {
        this.getAll();
      }

    add(item:Articulo): void
      {       
       this.carritoService.add(item,1);
      }
    
    getAll():void
      {
        this.articuloApi.findAll()
        .subscribe(res => {this.articuloData = res; } ,
        err => {console.log(err) ; });
      }
      findByName(name): void {       
        this.articuloApi.findByName(name)
       .subscribe(res => {this.articuloData = res; console.log(this.articuloData); } , err => {console.log(err) ; });
      }
      close():void
      {
        this.dialogRef.close({ data: 'ok' });
      }
      cancel():void
      {
        this.dialogRef.close({ data: 'cancel' });
      }
     

}
