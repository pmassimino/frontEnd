import { CondIvaOperacion, UnidadMedida } from '../../global/models/models/model';

    export class Familia {
        Id: number;
        Nombre: string;
        IdFamilia: string;
    }

        export class Articulo {
        constructor();
        constructor(
            public _id?: string,
            public _nombre?: string
        )
        {
            this.Id=_id;
            this.Nombre=_nombre;
        }
        Id: string;
        Nombre: string;
        IdFamilia?: string;
        IdUnidad?: string;
        Estado?: string;
        CostoVenta: number = 0;
        ImpuestoVenta: number = 0;
        PrecioVenta: number = 0;
        AlicuotaIva: number = 0;
        CondIva?: string;
        PrecioVentaFinal: number = 0;
        MargenVenta: number = 0;
        StockMinimo: number = 0;
        StockActual: number = 0;
        StockReposicion: number = 0;
        StockMaximo: number = 0;
        Observacion?: string;
        Familia?: Familia;
        UnidadMedida?: UnidadMedida;        
    }
    export class ItemCarrito {
        Articulo: Articulo;
        Cantidad: number;        
    }

    
    


