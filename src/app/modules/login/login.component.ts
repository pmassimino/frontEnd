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

  constructor(private auth: AuthService, private router: Router,private empresaService :EmpresaService ) { }

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
    //Cargar empresas y leleccionar preseterminada
    this.empresaService.findAll()
    .subscribe(
      data => {
        localStorage.setItem('empresas', JSON.stringify(data));
        this.empresaService.select(data[0].Id);
      }  
    )  
    this.router.navigate(['']);
  }
}