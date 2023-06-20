import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { EmpresaService } from '../global/services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public username: string;
  public password: string;
  public error: string;

  constructor(private auth: AuthService, private router: Router) 
  { 
    auth.logout();
  }

  public submit() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(res=>
        this.login(),
        err => this.error = err.error.Nombre
      );

  }
  login():void
  {
    //Cargar empresas y seleccionar preseterminada
    //this.empresaService.Current();
    //this.empresaService.currentValue().subscribe(res=>localStorage.setItem('EmpresaSelected', JSON.stringify(res)));
    //localStorage.setItem('empresas', JSON.stringify(this.empresaService.Current));
    this.router.navigate(['']);
  }
}