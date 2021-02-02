import { UnidadMedida } from '../../global/models/models/model';

    export class Familia {
        id: number;
        nombre: string;
        idFamilia: string;
    }

        export class Articulo {
        constructor();
        constructor(
            public _id?: string,
            public _nombre?: string
        )
        {
            this.id=_id;
            this.nombre=_nombre;
        }
        id: string;
        nombre: string;
        idFamilia?: string;
        idUnidad?: string;
        estado?: string;
        costoVenta: number = 0;
        impuestoVenta: number = 0;
        precioVenta: number = 0;
        alicuotaIva: number = 0;
        condIva?: string;
        precioVentaFinal: number = 0;
        margenVenta: number = 0;
        stockMinimo: number = 0;
        stockActual: number = 0;
        stockReposicion: number = 0;
        stockMaximo: number = 0;
        observacion?: string;
        familia?: Familia;
        unidadMedida?: UnidadMedida;
    }
    export class ItemCarrito {
        articulo: Articulo;
        cantidad: number;        
    }

    
    


