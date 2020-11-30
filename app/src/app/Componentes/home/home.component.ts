import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Servicios/authentication.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private modalQuienesSomosService: ModalQuienesSomosService) { }

  ngOnInit(): void {
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
    this.modalQuienesSomosService.Alert('MoneyClip es una billetera virtual. Accede a tu dinero rápido, fácil y en cualquier parte. Desarrollado por: Nicolas Alvarez, Jimena Bustos Paulich, Melani Crespo, Martin Diaz, Maximiliano Iglesias del Castillo, Matias LLorens, Joel Ocampo, Melania Peralta Flores, Tomas Pozzo * Programa Clip 2020 - Grupo 1D', 'Conoce a nuestro Equipo!', 'i');
  }

}
