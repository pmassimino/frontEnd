import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/services/auth.guard';
import { ConfigService} from './core/services/config.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'
// Interceptors
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { LoginComponent } from './modules/login/login.component';
import { ExcelService } from './core/services/excel.service';
import { CoreService } from './core/services/core.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { CacheRouteReuseStrategy } from './core/services/cache-route-reuse.strategy';



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
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,        
    NgxPaginationModule,        
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
      },
      {
        provide: RouteReuseStrategy,
        useClass: CacheRouteReuseStrategy
      }],      
  bootstrap: [AppComponent],  
  
})
export class AppModule { }
