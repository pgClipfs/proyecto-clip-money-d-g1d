import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

<<<<<<< HEAD
=======
  ingresarPesos(){
    this.modalQuienesSomosService.Alert('ingresar pesos');
  }
  
  ingresarDolares(){
    this.modalQuienesSomosService.Alert('En construccion');
  }

  retirarPesos(){
    this.modalQuienesSomosService.Alert('retirar pesos');
  }



  retirarDolares(){
    this.modalQuienesSomosService.Alert('En construccion');
  }

  transferir(){
    this.modalQuienesSomosService.Alert('En construccion');
  }

>>>>>>> f5f479443c35d3cb24ef40f0a03c3162da3ef534
}
