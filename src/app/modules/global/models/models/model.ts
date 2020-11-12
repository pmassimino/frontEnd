import { DecimalPipe } from '@angular/common';

export class UnidadMedida {
    id: string;
    nombre: string;
    codAfip: string;        
}

export class CondIvaOperacion {
    id: string;
    nombre: string;
    codAfip: string;
    alicuota: number;
}

export class TipoDocumento {
   id: string;
   nombre: string;
   codAfip: string;
}
export class TipoFactura {
    id: string;
    nombre: string;
    codAfip: string;
}
export class CondIva {
    id: string;
    nombre: string;
    codAfip: string;
}
export class Empresa {
    id: string;
    nombre: string;
    nombreComercial: string;
    idTipoDoc: string;
    numeroDocumento: number;
    idLocalidad: string;
    domicilio: string;
    altura: number;
    piso: number;
    oficina: number;
    telefono: string;
    telefonoSec: string;
    movil: string;
    movilSec: string;
    fax: string;
    email: string;
    idCondicionIva: string;
    idCondicionGanancia: string;
    idCondicionIB: string;
    numeroIB: number;
    databaseName: string;
    idOrganizacion: string;
    idOwner: string;
    accounts: EmpresaAccount[];
}

export class EmpresaAccount {
    id: string;
    idAccount: string;
}
export class Account {
    id: string;
    nombre: string;
    email: string;
    idGrupo: string;
    estado: string;
}    
    


