import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo, Familia, CondIvaOp } from '../../models/model';
import { Router } from '@angular/router';
import { CondIvaOpService } from '../../services/cond-iva.service';
import { FamiliaService } from '../../services/familia.service';

@Component({
  selector: 'app-articulo-create',
  templateUrl: './articulo-create.component.html',
  styleUrls: ['./articulo-create.component.css']
})
export class ArticuloCreateComponent implements OnInit {
articulo: Articulo = new Articulo();
condIvaOp: CondIvaOp[] = [];
familia: Familia[] = [];
submitted = false;

constructor(private articuloService: ArticuloService, private condIvaOpService: CondIvaOpService,
            private familiaService: FamiliaService, private router: Router) { }


  ngOnInit(): void {
    this.condIvaOpService.findAll()
    .subscribe(res => { this.condIvaOp = res; }, err => {console.log(err); });
    this.familiaService.findAll()
    .subscribe(res => { this.familia = res; }, err => {console.log(err); });
    }

  new(): void {
    this.submitted = false;
    this.articulo = new Articulo();
  }
  save() {
    this.articuloService.save(this.articulo)
      .subscribe(data => {console.log(data); this.articulo = new Articulo();
                          this.gotoList(); }, error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['almacen/articulos']);
  }

}
