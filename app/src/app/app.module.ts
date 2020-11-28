import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from '../app/interceptors/auth-interceptor.service';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { HomeComponent } from './Componentes/home/home.component';
import { MenuPrincipalComponent} from './Componentes/menuPrincipal/menu-principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AuthGuard } from './helpers/auth.guard';



import { APP_BASE_HREF } from '@angular/common';
import { ModalQuienesSomosComponent } from './Componentes/modal-quienes-somos/modal-quienes-somos.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    MenuPrincipalComponent,
    InicioComponent,
    ModalQuienesSomosComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot
    (
      [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'menu-principal', component: MenuPrincipalComponent, canActivate: [AuthGuard] }
      ]
    ),

  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
  }, {provide: APP_BASE_HREF, useValue : '/'}],
  bootstrap: [InicioComponent]
})
export class AppModule { }
