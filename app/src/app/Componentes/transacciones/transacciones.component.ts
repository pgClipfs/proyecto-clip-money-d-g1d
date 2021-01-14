import { Component, OnInit } from '@angular/core';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {

  constructor(private modalQuienesSomosService: ModalQuienesSomosService, private router: Router) {

   }

  ngOnInit(): void {
  }

  ingresarPesos(){
    this.modalQuienesSomosService.Alert('ingresar pesos');
    
  }
  
  ingresarDolares(){
    this.modalQuienesSomosService.Alert('En construccion');
  }

  retirarPesos(){
    //this.modalQuienesSomosService.Alert('retirar pesos');
    this.router.navigate(['/retirar-pesos']);
  }



  retirarDolares(){
    this.modalQuienesSomosService.Alert('En construccion');
  }

  transferir(){
    this.modalQuienesSomosService.Alert('En construccion');
  }

}
