import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,public auth: AuthService,private permissionService:PermissionService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var result = false;
    if (this.auth.isAuthenticated()) {      
      const permiso = next.data.permiso;
      if (permiso!=null)
      {
        result = this.permissionService.hasPermission(permiso);
      }
      else
      result=true;
    }
    else
    {
      this.router.navigate(['/login']);
    }
    return result;
  }
}