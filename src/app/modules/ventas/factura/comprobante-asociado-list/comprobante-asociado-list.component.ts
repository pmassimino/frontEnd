import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComprobanteAsociado, Factura } from '../../models/model';
import { UntypedFormArray } from '@angular/forms';
import { FacturaService } from '../../services/factura.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comprobante-asociado-list',
  templateUrl: './comprobante-asociado-list.component.html',
  styleUrls: ['./comprobante-asociado-list.component.css']
})
export class ComprobanteAsociadoListComponent {
  @Input() dataSource: UntypedFormArray;
  @Output() removeEvent = new EventEmitter<string>();
  facturas: Map<string, Factura> = new Map<string, Factura>(); // Mapa para almacenar los detalles de la factura por idFactura
 
  subscription: Subscription;
  constructor(private facturaService: FacturaService)
  {
    this.subscription = this.facturaService.selectEvent.subscribe((data) => {
      this.loadFacturas();
    });
  }
  
  ngOnChanges()
  {
    this.loadFacturas(); // Cargamos los detalles de la factura al iniciar el componente
  }

  loadFacturas() {
    this.dataSource.controls.forEach((control) => {
      const idFactura = control.get('IdFactura').value;
      if (!this.facturas.has(idFactura)) {
        this.facturaService.findOne(idFactura).subscribe(
          (response) => {
            this.facturas.set(idFactura, response);
          },
          (error) => {
            console.error(`Error al obtener los detalles de la factura ${idFactura}`, error);
          }
        );
      }
    });
  }

  getFacturaDetails(idFactura: string):string {
    const factura = this.facturas.get(idFactura);
    var result:string="";
    if (factura==undefined) 
       return result;
    result = "Fac." + factura.Letra + " Num:" +  factura.Pe.toString().padStart(4,"0") + "-"  + factura.Numero.toString().padStart(8,"0")    
    return result;
  }
  onEliminar(id: string): void {
    this.removeEvent.emit(id);
  }

}
