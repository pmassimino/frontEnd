import { Sujeto } from '../../comun/models/model';

export class CuentaMayor {
    id: string;
    nombre: string;
    idSuperior: string;
    idTipo: string;
    idUso: string;
    tipoCuentaMayor: TipoCuentaMayor;
    usoCuentaMayor: UsoCuentaMayor;
    superior: CuentaMayor;
}

export class UsoCuentaMayor {
    id: string;
    nombre: string;
}

export class TipoCuentaMayor {
    id: string;
    nombre: string;
}

export class Mayor {
    id: string;
    idEmpresa: string;
    idSucursal: string;
    idArea: string;
    idSeccion: string;
    idTransaccion: string;
    fecha: string;
    fechaComp: string;
    fechaVenc: string;
    concepto: string;
    idComprobante: string;
    pe:number;
    numero:number;
    origen: string;
    detalle: DetalleMayor[];
}

export class DetalleMayor {
    id: string;
    item: number;
    fechaVenc: string;
    idCuentaMayor: string;
    concepto: string;
    idCuenta: string;
    idTipo: string;
    importe: number;
    cantidad: number;
    cuentaMayor: CuentaMayor;
    sujeto: Sujeto;
}