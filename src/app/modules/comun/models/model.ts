export class Sujeto {
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
    Telefono1: string;
    Telefono2: string;
    Telefono3: string;
    Movil1: string;
    Movil2: string;
    Movil3: string;
    Fax1: string;
    Fax2: string;
    Fax3: string;
    Email1: string;
    Email2: string;
    Email3: string;
    IdCondicionIva: string;
    IdCondicionGanancia: string;
    IdCondicionIB: string;
    NumeroIB: number;
    IdCondicionProductor: string;
    Estado: string;
    Domicilios: Domicilio[];
    RolSujeto: RolSujeto[]=[];
    Vehiculos: Vehiculo[];
    Contactos: Contacto[];
}

export class Domicilio {
    Id: string;
    IdSujeto: string;
    Nombre: string;
    IdLocalidad: string;
    Direccion: string;
    Altura: number | null;
    CodigoPostal: string;
    CodigoPlanta: number | null;
    Sujeto: Sujeto;
}
export class Vehiculo {
    Id: string;
    IdSujeto: string;
    Nombre: string;
    NombreChofer: string;
    NumeroDocumento: number;
    PatenteChasis: string;
    PatenteAcoplado: string;
    Sujeto: Sujeto;
}

export class Contacto {
    Id: string;
    IdSujeto: string;
    Nombre: string;
    Cargo: string;
    Telefono1: string;
    Telefono2: string;
    Telefono3: string;
    Movil1: string;
    Movil2: string;
    Movil3: string;
    Email1: string;
    Email2: string;
    Email3: string;
    Sujeto: Sujeto;
}

export class RolSujeto {

    constructor(idRol:string,idSujeto:string) {
        this.IdRol=idRol;
        this.IdSujeto = idSujeto;
    }
    IdSujeto: string;
    IdRol: string;
    DateAdd: string | null;
    Rol: Rol;
    Sujeto: Sujeto;
}

export class Rol {
    Id: string;
    Nombre: string;
}
export class Sucursal {
    Id: string;
    Nombre: string;
}


export class Area {
    Id: string;
    Nombre: string;
}
export class Seccion {
    Id: string;
    Nombre: string;
}
export class Setting {
    Id: string;
    Value: string;
}
export interface NumeradorDocumento {
    Id: string;
    Nombre: string;
    PuntoEmision: number;
    Numero: number;
}
