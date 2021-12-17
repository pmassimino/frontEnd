import { Sujeto } from "../../comun/models/model";
import { CuentaMayor } from "../../contable/models/model";

export class ReciboCtaCte {
    Id: string;
    IdEmpresa: string;
    IdSucursal: string;
    IdArea: string;
    IdSeccion: string;
    IdTransaccion: string;
    IdCuenta: string;
    IdCuentaMayor: string;
    Fecha: Date;
    FechaVencimiento: Date;
    Pe: number;
    Numero: number;
    IdTipo: string;
    Importe: number;
    Obs: string="";
    DetalleComprobante: DetalleComprobante[]=[];
    DetalleValores: DetalleValores[]=[];
    DetalleRelacion: DetalleRelacion[]=[];
    CuentaMayor: CuentaMayor;
    Sujeto: Sujeto;
}

export class DetalleComprobante {
    Id: string;
    Item: number;
    IdTipo: string;
    IdTipoComp: string;
    IdMovCtaCte: number;
    Fecha: string;
    Pe: number;
    Numero: number;
    Concepto: string;
    Importe: number;
    ReciboCtaCte: ReciboCtaCte;
}

export class DetalleValores {
    Id: string;
    Item: number;
    IdTipo: string;
    IdCuentaMayor: string;
    IdComp: string;
    Fecha: Date;
    FechaVencimiento: Date;
    Numero: number;
    Concepto: string="";
    Importe: number;
    Banco: string="";
    Sucursal: string="";
    CuentaMayor: CuentaMayor;
    ReciboCtaCte: ReciboCtaCte;
}

export class DetalleRelacion {
    Id: string;
    Item: number;
    IdMovCtaCte: number;
    Importe: number;
    ReciboCtaCte: ReciboCtaCte;
}
export class ComprobantesDisponible {
    Id: string;
    IdMovCtaCte: number;
    Concepto: string;
    IdTipo: string;
    Fecha: string;
    Pe: number;
    Numero: number;
    Importe: number;
    ImporteDisponible: number;
    ImporteAsignar: number;
    Select: boolean;
}