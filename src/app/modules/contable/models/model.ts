import { Sujeto } from '../../comun/models/model';

export class CuentaMayor {
    Id: string;
    Nombre: string;
    IdSuperior: string;
    IdTipo: string;
    IdUso: string;
    TipoCuentaMayor: TipoCuentaMayor;
    UsoCuentaMayor: UsoCuentaMayor;
    Superior: CuentaMayor;
}

export class UsoCuentaMayor {
    Id: string;
    Nombre: string;
}

export class TipoCuentaMayor {
    Id: string;
    Nombre: string;
}

export class Mayor {
    Id: string;
    IdEmpresa: string;
    IdSucursal: string;
    IdArea: string;
    IdSeccion: string;
    IdTransaccion: string;
    Fecha: string;
    FechaComp: string;
    FechaVenc: string;
    Concepto: string;
    IdComprobante: string;
    Pe:number;
    Numero:number;
    Origen: string;
    Obs: string;
    Detalle: DetalleMayor[];
}

export class DetalleMayor {
    Id: string;
    Item: number;
    FechaVenc: string;
    IdCuentaMayor: string;
    Concepto: string;
    IdCuenta: string;
    IdTipo: string;
    Importe: number;
    Debe:number;
    Haber:number;
    Cantidad: number;
    CuentaMayor: CuentaMayor;
    Sujeto: Sujeto;
}

export class MovCtaCte {
    Id: string;
    IdEmpresa: string;
    IdSucursal: string;
    IdArea: string;
    IdSeccion: string;
    IdTransaccion: string;
    IdCuenta: string;
    IdCuentaMayor: string;
    IdComprobante: string;
    Fecha: string;
    FechaComp: string;
    FechaVenc: string;
    Pe: number;
    Numero: number;
    Concepto: string;
    IdTipo: string;
    Importe: number;
    Origen: string;
    CuentaMayor: CuentaMayor;
    Sujeto: Sujeto;
}
export class MovSaldoCtaCte {
    IdCuenta: string;
    IdCuentaMayor: string;
    Nombre: string;
    SaldoVencido: number;
    SaldoAVencer: number;
    Saldo: number;
}

export class MovCtaCteView {
    MovCtaCte: MovCtaCte;
    CuentaMayor: CuentaMayor;
    Cuenta: Sujeto;
    Debe: number;
    Haber: number;
    Saldo: number;
    Vencido: boolean;
}

export class LibroIva {
    Id: string;
    IdEmpresa: string;
    IdSucursal: string;
    IdArea: string;
    IdSeccion: string;
    IdTransaccion: string;
    Tipo: string;
    Fecha: string;
    FechaComp: string;
    FechaVenc: string;
    IdComprobante: string;
    IdMoneda: string;
    CotizacionMoneda: number;
    Pe: number;
    Numero: number;
    IdCuenta: string;
    Nombre: string;
    IdTipoDoc: string;
    NumeroDocumento: number;
    Origen: string;
    Gravado: number;
    Iva: number;
    NoGravado: number;
    Exento: number;
    OtrosTributos: number;
    Total: number;
    Autorizado: boolean;
    DetalleIva: ItemIva[];
    DetalleTributo: ItemTributo[];
}

export class ItemIva {
    Id: string;
    Item: number;
    CondIva: string;
    BaseImponible: number;
    Importe: number;
    lLibroIva: LibroIva;
}

export class ItemTributo {
    Id: string;
    Item: number;
    IdTributo: string;
    Nombre: string;
    BaseImponible: number;
    Tarifa: number;
    Importe: number;
    LibroIva: LibroIva;
}
export class LibroIvaView {
    Id: string;
    IdTransaccion: string;
    LibroIva: LibroIva;
    Cuenta: Sujeto;
    Fecha: string;
    FechaComprobante: string;
    Pe: number;
    Numero: number;
    IdCuenta: string;
    Nombre: string;
    IdTipoDoc: string;
    NumeroDocumento: number;
    Gravado: number;
    NoGravado: number;
    Exento: number;
    Iva21: number;
    Iva105: number;
    Iva27: number;
    IvaOtro: number;
    OtrosTributos: number;
    Total: number;
}

export class ComprobanteMayor {
    Id: string
    Nombre: string
    IdComprobante: string
    IdTipo: string
  }

export class BalanceMayorView
{
    Id:string
    Nombre:string
    IdTipo:string
    IdUso:string
    SaldoAnterior:number
    Debitos:number
    Creditos:number
    SaldoPeriodo:number
    Saldo:number
}
export interface MayorView {
    Id: string
    Fecha: string
    FechaComp: string
    FechaVenc: string
    IdCuentaMayor: string
    Nombre: string
    Concepto: string
    Pe: number
    Numero: number
    Debe: number
    Haber: number
    SaldoPeriodo:number
    Saldo: number
  }
  



