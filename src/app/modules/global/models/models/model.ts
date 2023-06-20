import { DecimalPipe } from '@angular/common';

export class UnidadMedida {
    Id: string;
    Nombre: string;
    CodAfip: string;        
}

export class CondIvaOperacion {
    Id: string;
    Nombre: string;
    CodAfip: string;
    Alicuota: number;
}

export class TipoDocumento {
   Id: string;
   Nombre: string;
   CodAfip: string;
}
export class TipoFactura {
    Id: string;
    Nombre: string;
    CodAfip: string;
}
export class CondIva {
    Id: string;
    Nombre: string;
    CodAfip: string;
}
export class Empresa {
    Id: string;
    Nombre: string;
    NombreComercial: string;
    IdTipoDoc: string;
    NumeroDocumento: number;
    IdLocalidad: string;
    Domicilio: string;
    Altura: number;
    Piso: number;
    Oficina: number;
    Telefono: string;
    TelefonoSec: string;
    Movil: string;
    MovilSec: string;
    Fax: string;
    Email: string;
    IdCondicionIva: string;
    IdCondicionGanancia: string;
    IdCondicionIB: string;
    NumeroIB: number;
    DatabaseName: string;
    IdOrganizacion: string;
    IdOwner: string;
    Accounts: EmpresaAccount[];
}

export class EmpresaAccount {
    Id: string;
    IdAccount: string;
}
export class Account {
    Id: string;
    Nombre: string;
    Email: string;
    IdGrupo: string;
    Estado: string;
}    

export class Setting {
    Id: string;
    Value: string;
}

export class Localidad {
    Id: string;
    Nombre: string;
    IdProvincia: string;
    Provincia: Provincia;
}

export class Provincia {
    Id: string;
    Nombre: string;
}

export class Rol {
    Id: number;
    IdOrganizacion: string;
    Nombre: string;
    Organizacion: Organizacion;
    Permisos: RolPermiso[];
    Accounts: RolAccount[];
}

export class RolPermiso {
    IdRol: number;
    IdOrganizacion: string;
    IdPermiso: string;
    Rol: Rol;
}

export class RolAccount {
    IdRol: number;
    IdAccount: string;
    Rol: Rol;
    Account: Account;
}
export class Organizacion {
    Id: string;
    Nombre: string;
}