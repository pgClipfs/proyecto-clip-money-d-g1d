import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-imagen-dni',
  templateUrl: './imagen-dni.component.html',
  styleUrls: ['./imagen-dni.component.css']
})
export class ImagenDniComponent implements OnInit {

  constructor( private router: Router, private modalQuienesSomosService: ModalQuienesSomosService, private location: Location) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.router.navigate(['/login']);
  }

  subir(){
    this.modalQuienesSomosService.Alert('La imagen se cargo con éxito','Exito','s');
    this.router.navigate(['/login']);
   // this.location.back();
  }
}
