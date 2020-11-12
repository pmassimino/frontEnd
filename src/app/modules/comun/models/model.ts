export class Sujeto {
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
    telefono1: string;
    telefono2: string;
    telefono3: string;
    movil1: string;
    movil2: string;
    movil3: string;
    fax1: string;
    fax2: string;
    fax3: string;
    email1: string;
    email2: string;
    email3: string;
    idCondicionIva: string;
    idCondicionGanancia: string;
    idCondicionIB: string;
    numeroIB: number;
    idCondicionProductor: string;
    estado: string;
    domicilios: Domicilio[];
    rolSujeto: RolSujeto[]=[];
    vehiculos: Vehiculo[];
    contactos: Contacto[];
}

export class Domicilio {
    id: string;
    idSujeto: string;
    nombre: string;
    idLocalidad: string;
    direccion: string;
    altura: number | null;
    codigoPostal: string;
    codigoPlanta: number | null;
    sujeto: Sujeto;
}
export class Vehiculo {
    id: string;
    idSujeto: string;
    nombre: string;
    nombreChofer: string;
    numeroDocumento: number;
    patenteChasis: string;
    patenteAcoplado: string;
    sujeto: Sujeto;
}

export class Contacto {
    id: string;
    idSujeto: string;
    nombre: string;
    cargo: string;
    telefono1: string;
    telefono2: string;
    telefono3: string;
    movil1: string;
    movil2: string;
    movil3: string;
    email1: string;
    email2: string;
    email3: string;
    sujeto: Sujeto;
}

export class RolSujeto {

    constructor(idRol:string,idSujeto:string) {
        this.idRol=idRol;
        this.idSujeto = idSujeto;
    }
    idSujeto: string;
    idRol: string;
    dateAdd: string | null;
    rol: Rol;
    sujeto: Sujeto;
}

export class Rol {
    id: string;
    nombre: string;
}

