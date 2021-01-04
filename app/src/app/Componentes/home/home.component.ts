import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Servicios/authentication.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  returnURl: string;



  constructor(private authenticationService: AuthenticationService, private modalQuienesSomosService: ModalQuienesSomosService, private router: Router) { }

  ngOnInit(): void {
    this.returnURl= '/app-mi-perfil';

  }
<<<<<<< HEAD
=======
  
 
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
>>>>>>> 1fc2e7c1e34889d804a6302942e5f8254646fa54

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
    this.modalQuienesSomosService.Alert('MoneyClip es una billetera virtual. Accede a tu dinero rápido, fácil y en cualquier parte. Desarrollado por: Nicolas Alvarez, Jimena Bustos Paulich, Melani Crespo, Martin Diaz, Maximiliano Iglesias del Castillo, Matias LLorens, Joel Ocampo, Melania Peralta Flores, Tomas Pozzo * Programa Clip 2020 - Grupo 1D', 'Conoce a nuestro Equipo!', 'i');
  }

 
  
  miPerfil(){

    this.router.navigate([this.returnURl]);

  }
}
