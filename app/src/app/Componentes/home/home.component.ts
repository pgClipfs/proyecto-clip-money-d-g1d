import { Component, OnInit } from '@angular/core';
import { LoginRequest } from 'src/app/Modelos/LoginRequest';
import { AuthenticationService } from 'src/app/Servicios/authentication.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { ClienteService } from '../../Servicios/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  nombreCompleto:string;
  loginRequest:LoginRequest;

  constructor(private router: Router ,private clienteService: ClienteService, private authenticationService: AuthenticationService, private modalQuienesSomosService: ModalQuienesSomosService) { }

  ngOnInit(): void {
    
    this.nombreCompleto='';
    this.loginRequest=JSON.parse(localStorage.getItem('loginRequest'));
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
      const itemCopy  = {...res};
      //itemCopy.fechaNacimiento=res.fechaNacimiento;
      this.nombreCompleto=itemCopy.nombre+' '+itemCopy.apellido;
          
      
      
    });
  }
  
 
  cuentaEnDolares()
  {
    this.modalQuienesSomosService.Alert('Disculpe las molestias', 'En desarrollo', 'i')
  }
  
  cuentaEnPesos()
  {
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
      const itemCopy  = {...res};
      //itemCopy.fechaNacimiento=res.fechaNacimiento;
      if(itemCopy.domicilio==null || itemCopy.domicilio==undefined)
      {
        this.modalQuienesSomosService.Alert('Primero complete sus datos en mi perfil','Error, datos incompletos', 'w')
      }
      else
      {
        this.router.navigate(['/cuenta-pesos']);
      }  
      
      
    });
  }

  movimientos()
  {
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
      const itemCopy  = {...res};
      //itemCopy.fechaNacimiento=res.fechaNacimiento;
      if(itemCopy.domicilio==null || itemCopy.domicilio==undefined)
      {
        this.modalQuienesSomosService.Alert('Primero complete sus datos en mi perfil','Error, datos incompletos', 'w');
      }
      else
      {
        this.router.navigate(['/movimientos']);
      }
    });
  }

  Cerrar()
  {
    this.authenticationService.logout();
  }
  openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

  llamarModal() {
    this.modalQuienesSomosService.Alert('MoneyClip es una billetera virtual. Accede a tu dinero rápido, fácil y en cualquier parte. Desarrollado por: Jimena Bustos Paulich, Melani Crespo, Martin Diaz, Maximiliano Iglesias del Castillo, Matias LLorens, Joel Ocampo, Melania Peralta Flores, Tomas Pozzo, Nelio Bena * Programa Clip 2020 - Grupo 1D', 'Conoce a nuestro Equipo!', 'i');
  }

}