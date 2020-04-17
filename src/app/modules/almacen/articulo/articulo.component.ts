import { Component, OnInit } from '@angular/core';
import {ArticuloService} from '../services/articulo.service';
import { Articulo } from '../models/model';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  articuloData: Articulo[] = [];

  constructor(private articuloApi: ArticuloService) { }

  ngOnInit(): void {
    this.articuloApi.findAll()
    .subscribe(res => {this.articuloData = res; console.log(this.articuloData); } , err => {console.log(err) ; });
      }
  }


