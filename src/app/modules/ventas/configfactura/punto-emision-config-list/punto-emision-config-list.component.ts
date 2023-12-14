import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { PuntoEmision } from '../../models/model';
import { PuntoEmisionService } from '../../services/punto-emision.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-punto-emision-config-list',
  templateUrl: './punto-emision-config-list.component.html',
  styleUrls: ['./punto-emision-config-list.component.css']
})
export class PuntoEmisionConfigListComponent {
  @Input() dataSource: UntypedFormArray;
  @Output() removeEvent = new EventEmitter<string>();
  PuntoEmision: Map<string, PuntoEmision> = new Map<string, PuntoEmision>(); // Mapa para almacenar los detalles de la factura por idFactura
 
  subscription: Subscription;
  constructor(private puntoEmisionService: PuntoEmisionService)
  {
    this.subscription = this.puntoEmisionService.selectEvent.subscribe((data) => {
      this.loadEntities();
    });
  }
  
  ngOnChanges()
  {
    this.loadEntities(); // Cargamos los detalles de la factura al iniciar el componente
  }

  loadEntities() {
    this.dataSource.controls.forEach((control) => {
      const id = control.get('IdPuntoEmision').value;
      if (!this.PuntoEmision.has(id)) {
        this.puntoEmisionService.findOne(id).subscribe(
          (response) => {
            this.PuntoEmision.set(id, response);
          },
          (error) => {
            console.error(`Error al obtener los detalles de la factura ${id}`, error);
          }
        );
      }
    });
  }
  getDetails(id: string):string {
    const entity = this.PuntoEmision.get(id);
    var result:string="";
    if (entity==undefined) 
       return result;
    result = entity.Nombre;
    return result;
  }
  onEliminar(id: string): void {
    this.removeEvent.emit(id);
  }

}
