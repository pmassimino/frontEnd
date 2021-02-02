import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/services/auth.guard';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigService} from './core/services/config.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'
// Interceptors
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { LoginComponent } from './modules/login/login.component';
import { ArticuloListComponent } from './modules/almacen/articulo/articulo-list/articulo-list.component';
import { ExcelService } from './core/services/excel.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoreService } from './core/services/core.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtModule } from '@auth0/angular-jwt';


export function initializeApp(appConfig: ConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent, LoginComponent,
  ],
  imports: [BrowserModule,
    HttpClientModule,
    BrowserModule,    
    BrowserAnimationsModule,
    FormsModule,    
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    NgbModule,        
  ],
  providers: [AuthService,
    AuthGuard ,
    ExcelService ,
    CoreService,
    ConfigService,{ provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
      }],      
  bootstrap: [AppComponent],
  
})
export class AppModule { }
