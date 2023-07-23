export class ParamBase {
    Fecha: string;
    FechaHasta: string;  
    constructor() {
      this.WholeMonth();
    }
    public WholeMonth()
    {
      var today: Date = new Date();
      var month = today.getMonth() + 1;
      var year = today.getFullYear();
      var Fecha = year.toString() + "-" + month.toString().padStart(2, '0') + "-01";
      var lastDay = new Date(year, month + 1, 0).getDate();
      var FechaHasta = year.toString() + "-" + month.toString().padStart(2, '0') + "-" + lastDay.toString();
      this.Fecha = Fecha;
      this.FechaHasta = FechaHasta;
    }
  }
  