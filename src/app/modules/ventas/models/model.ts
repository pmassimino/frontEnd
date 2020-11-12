import { Articulo } from '../../almacen/models/model';
import { Sujeto } from '../../comun/models/model';

export class Factura {
    id: string;
    idEmpresa: string;
    idSucursal: string;
    idArea: string;
    idSeccion: string;
    idTransaccion: string;
    tipo: string;
    letra: string;
    pe: number;
    numero: number;
    fecha: string;
    fechaComp: string;
    fechaVencimiento: string;
    idMoneda: string;
    cotizacionMoneda: number;
    idCuenta: string;
    cae: number;
    idConceptoAfip: number;
    totalNeto: number;
    porDescuento: number;
    totalDescuento: number;
    total: number;
    totalExento: number;
    totalGravado: number;
    totalNoGravado: number;
    totalIva: number;
    totalOTributos: number;
    obs: string;
    detalle: DetalleFactura[]=[];
    iva: DetalleIva[]=[];
    tributos: DetalleTributos[]=[];
    medioPago: MedioPago[]=[];
    sujeto: Sujeto;
}

export class DetalleFactura {
    id: string;
    item: number;
    idArticulo: string;
    idUnidadMedida: string;
    cantidad: number;
    concepto: string;
    precio: number;
    porBonificacion: number;
    bonificacion: number;
    gravado: number;
    condIva: string;
    iva: number;
    noGravado: number;
    exento: number;
    total: number;
    lote: string;
    serie: string;
    articulo: Articulo;
}

export class DetalleIva {
    id: string;
    item: number;
    condIva: string;
    baseImponible: number;
    importe: number;
}

export class DetalleTributos {
    id: string;
    item: number;
    idTributo: string;
    nombre: string;
    baseImponible: number;
    tarifa: number;
    importe: number;
}

export class MedioPago {
    id: string;
    item: number;
    idCuentaMayor: string;
    concepto: string;
    importe: number;
    fechaVenc: string;
}