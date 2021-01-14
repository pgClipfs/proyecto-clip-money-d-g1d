import { Component, OnInit } from '@angular/core';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';

@Component({
  selector: 'app-retirar-pesos',
  templateUrl: './retirar-pesos.component.html',
  styleUrls: ['./retirar-pesos.component.css']
})
export class RetirarPesosComponent implements OnInit {
  modalQuienesSomosService: any;

  constructor() { }

  ngOnInit(): void {

    
  }

  confirmarExtraccion(){
    this.modalQuienesSomosService.Alert('extraccion PESOS');
  }

  condicionesGiroAlDecubierto(){
    this.modalQuienesSomosService.Alert('Condiciones de GIRO AL DESCUBIERTO: ');
  }

}
