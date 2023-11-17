export class MailServer  {
    Id: number;
    Nombre: string;
    Email: string;
    Server: string;
    Puerto: number;
    TipoServer: string = 'pop'; // Pop-imap-local
    EsSSL: boolean = false;
    Usuario: string;
    Password: string;
    Prioridad: number;
  }
  export const tipoServerMail: string[] = ["pop", "imap", "local"];