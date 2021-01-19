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



import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { ModalQuienesSomosComponent } from './Componentes/modal-quienes-somos/modal-quienes-somos.component';
import { ModalLoginIncorrectoComponent } from './Componentes/modal-login-incorrecto/modal-login-incorrecto.component';
import { TransaccionesComponent } from './Componentes/transacciones/transacciones.component';
import { MovimientosComponent } from './Componentes/movimientos/movimientos.component';
import { MiPerfilComponent } from './Componentes/mi-perfil/mi-perfil.component';
import { LoginRequest } from './Modelos/LoginRequest';
import { FormDomicilioComponent } from './Componentes/form-domicilio/form-domicilio.component';
import { MyInterceptor } from './interceptors/my-interceptor';
import { CuentaComponent } from './Componentes/cuenta/cuenta.component';
import { RecuperarPasswordComponent } from './Componentes/recuperar-password/recuperar-password.component';
import { NewPasswordComponent } from './Componentes/new-password/new-password.component';
import { RetirarPesosComponent } from './Componentes/retirar-pesos/retirar-pesos.component';
import { GiroComponent } from './Componentes/giro/giro.component';
import { GiroCondicionesComponent } from './Componentes/giro-condiciones/giro-condiciones.component';
import { ImagenDniComponent } from './Componentes/imagen-dni/imagen-dni.component';
<<<<<<< HEAD
=======
import { TransferenciasComponent } from './Componentes/transferencias/transferencias.component';
>>>>>>> bdada01d38358dcd99204a52032ba9ef0d075a51
import { IngresarPesosComponent } from './Componentes/ingresar-pesos/ingresar-pesos.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    MenuPrincipalComponent,
    InicioComponent,
    ModalQuienesSomosComponent,
    ModalLoginIncorrectoComponent,
    TransaccionesComponent,
    MovimientosComponent,
    MiPerfilComponent,
    FormDomicilioComponent,
    CuentaComponent,
    RecuperarPasswordComponent,
    NewPasswordComponent,
    RetirarPesosComponent,
    GiroComponent,
    GiroCondicionesComponent,
    TransferenciasComponent,
    IngresarPesosComponent
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
      { path: 'menu-principal', component: MenuPrincipalComponent, canActivate: [AuthGuard] },
      { path: 'form-domicilio', component: FormDomicilioComponent, canActivate: [AuthGuard] },
      { path: 'app-mi-perfil', component: MiPerfilComponent, canActivate: [AuthGuard] },
      { path: 'cuenta-pesos', component: CuentaComponent, canActivate: [AuthGuard] },
      { path: 'transacciones', component: TransaccionesComponent, canActivate: [AuthGuard] },
      { path: 'recuperar-password', component: RecuperarPasswordComponent },
      { path: 'new-password', component: NewPasswordComponent },
      { path: 'movimientos', component: MovimientosComponent},
      { path: 'retirar-pesos', component: RetirarPesosComponent, canActivate: [AuthGuard]},
      { path: 'giro-descubierto', component: GiroComponent, canActivate: [AuthGuard]},
      { path: 'giro-condiciones', component: GiroCondicionesComponent, canActivate: [AuthGuard]},
      { path: 'imagen-dni', component: ImagenDniComponent},
      { path: 'transferencias', component: TransferenciasComponent, canActivate: [AuthGuard]},
      { path: 'ingresar-pesos', component:IngresarPesosComponent, canActivate:[AuthGuard]}, 
      { path: '**', redirectTo: '/login', pathMatch: 'full' }
      
      ]
    ),

  ],
 /*  exports: [
    RecuperarPasswordComponent
  ], */
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
  }, {provide: APP_BASE_HREF, useValue : '/'}, LoginRequest, DatePipe, { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }],
  bootstrap: [InicioComponent]
})
export class AppModule { }