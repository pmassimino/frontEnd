
    export class Familia {
        id: number;
        nombre: string;
    }

    export class CondIvaOp {
        id: number;
        nombre: string;
        codigo: string;
    }

    export class Articulo {
        id: number;
        codigo: string;
        nombre: string;
        costoVenta: number;
        impuestoVenta: number;
        alicuotaIva: number;
        margenVenta: number;
        precioVenta: number;
        precioVentaFinal: number;
        familia: Familia;
        condIva: CondIvaOp;
    }


