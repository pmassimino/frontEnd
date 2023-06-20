import { Articulo } from '../../almacen/models/model';
import { Sujeto } from '../../comun/models/model';

export class Factura {
    Id: string;
    IdEmpresa: string;
    IdSucursal: string;
    IdArea: string;
    IdSeccion: string;
    IdTransaccion: string;
    Tipo: string;
    Letra: string;
    Pe: number;
    Numero: number;
    Fecha: string;
    FechaComp: string;
    FechaVencimiento: string;
    IdMoneda: string;
    CotizacionMoneda: number;
    IdCuenta: string;
    Cae: number;
    IdConceptoAfip: number;
    TotalNeto: number;
    PorDescuento: number=0;
    TotalDescuento: number;    
    TotalExento: number;
    TotalGravado: number;
    TotalNoGravado: number;
    TotalIva: number;
    TotalOTributos: number;
    Total: number;    
    Obs: string;
    Detalle: DetalleFactura[]=[];
    Iva: DetalleIva[]=[];
    Tributos: DetalleTributos[]=[];
    MedioPago: MedioPago[]=[];
    Sujeto: Sujeto;
}

export class DetalleFactura {
    Id: string;
    Item: number;
    IdArticulo: string;
    IdUnidadMedida: string;
    Cantidad: number;
    Concepto: string;
    CondIva: string="";
    Precio: number;
    PorBonificacion: number=0;
    Bonificacion: number=0;
    Gravado: number=0;    
    Iva: number=0;
    NoGravado: number=0;
    Exento: number=0;
    OtroTributo: number=0;
    Total: number=0;
    Lote: string;
    Serie: string;
    Articulo: Articulo;
}

export class DetalleIva {
    Id: string;
    Item: number;
    CondIva: string;
    BaseImponible: number;
    Importe: number;
}

export class DetalleTributos {
    Id: string;
    Item: number;
    IdTributo: string;
    Nombre: string;
    BaseImponible: number;
    Tarifa: number;
    Importe: number;
}

export class MedioPago {
    Id: string;
    Item: number;
    IdCuentaMayor: string;
    Concepto: string;
    Importe: number;
    FechaVenc: string;
}