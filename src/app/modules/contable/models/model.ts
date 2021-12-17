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