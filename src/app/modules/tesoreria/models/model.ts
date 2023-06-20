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
    IdMovCtaCte: string;
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
export class CarteraValor {
    Id: string;
    IdEmpresa: string;
    IdSucursal: string;
    IdArea: string;
    IdSeccion: string;
    IdTransaccion: string;
    IdCuenta: string;
    IdCuentaMayor: string;
    Fecha: string;
    FechaVencimiento: string;
    Numero: number;
    Tipo: string;
    Banco: string;
    Sucursal: string;
    Importe: number;
    Obs: string;
    MovCarteraValor: MovCarteraValor[];
    CuentaMayor: CuentaMayor;
    Sujeto: Sujeto;
}

export class MovCarteraValor {
    Id: string;
    Item: number;
    Tipo: string;
    IdTransaccion: string;
    Fecha: string;
    Estado: string;
    Concepto: string;
    CarteraValor: CarteraValor;
}

export class CarteraValorView {
    Id: string;
    IdEmpresa: string;
    IdSucursal: string;
    IdArea: string;
    IdSeccion: string;
    IdTransaccion: string;
    IdCuenta: string;
    NombreCuenta: string;
    IdCuentaMayor: string;
    NombreCuentaMayor: string;
    Fecha: string;
    FechaVencimiento: string;
    Numero: number;
    Tipo: string;
    Banco: string;
    Sucursal: string;
    Importe: number;
    Obs: string;
    Estado: string;
}