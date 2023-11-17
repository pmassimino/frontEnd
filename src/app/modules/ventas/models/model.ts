import { Articulo } from '../../almacen/models/model';
import { NumeradorDocumento, Seccion, Sujeto } from '../../comun/models/model';

export class Factura {
    Id: string;
    IdEmpresa: string;
    IdSucursal: string;
    IdArea: string;
    IdSeccion: string;
    IdTransaccion: string;
    Tipo: string;
    Origen: string;
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
    PorDescuento: number = 0;
    TotalDescuento: number;
    TotalExento: number;
    TotalGravado: number;
    TotalNoGravado: number;
    TotalIva: number;
    TotalOTributos: number;
    Total: number;
    Obs: string;
    Detalle: DetalleFactura[] = [];
    Iva: DetalleIva[] = [];
    Tributos: DetalleTributos[] = [];
    MedioPago: MedioPago[] = [];
    ComprobanteAsociado: ComprobanteAsociado[] = [];
    Sujeto: Sujeto;
}

export class DetalleFactura {
    Id: string;
    Item: number;
    IdArticulo: string;
    IdUnidadMedida: string;
    Cantidad: number;
    Concepto: string;
    CondIva: string = "";
    Precio: number;
    PorBonificacion: number = 0;
    Bonificacion: number = 0;
    Gravado: number = 0;
    Iva: number = 0;
    NoGravado: number = 0;
    Exento: number = 0;
    OtroTributo: number = 0;
    Total: number = 0;
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
export class ComprobanteAsociado {
    Id: string;
    Item: number;
    IdFactura: string;
    Factura: Factura;
}
export class FacturaSelectView extends Factura {
    Select: boolean;
    constructor(factura: Factura) {
        super();
        // Copiamos las propiedades de la factura original a la nueva instancia
        Object.assign(this, factura);
        // Inicializamos la propiedad Select en falso por defecto
        this.Select = false;
    }
}

export class PuntoEmision {
    Id: string;
    Nombre: string;
    Numero: number;
    IdAfipWsService: string;
    IdProvincia: string;
    Localidad: string;
    CodigoPostal: string;
    Domicilio: string;
    Altura: number;
    Numeradores: NumeradorPuntoEmision[]=[];
}
export class NumeradorPuntoEmision {
   
    public Id: string;    
    public IdNumeradorDocumento: string;  
    public NumeradorDocumento: NumeradorDocumento;
    public PuntoEmision: PuntoEmision;   
  }


export class ConfigFactura {
    public Id: string;
    public Nombre: string;
    public IdSeccion: string;
    public Reporte: string;
    public ReporteFiscal: string;
    public Numeradores: ItemNumerador[];
    public PuntosEmision: ItemPuntoEmision[];
    public Seccion: Seccion;

    constructor() {
        this.Numeradores = [];
        this.PuntosEmision = [];
    }
}

export class ItemNumerador {
    public Id: string;
    public IdComprobante: number;
    public IdNumeradorDocumento: string;
    public NumeradorDocumento: NumeradorDocumento;
    public ConfigFactura: ConfigFactura;
}

export class ItemPuntoEmision {
    public Id: string;
    public IdPuntoEmision: string;
    public PuntoEmision: PuntoEmision;
    public ConfigFactura: ConfigFactura;
}

