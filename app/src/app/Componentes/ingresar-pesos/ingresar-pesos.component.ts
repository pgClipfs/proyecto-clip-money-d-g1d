import { Component, OnInit } from '@angular/core';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operacion } from '../../Modelos/Operacion';
import { ClienteService } from '../../Servicios/cliente.service';
import { LoginRequest } from '../../Modelos/LoginRequest';
import { CuentaService } from '../../Servicios/cuenta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransaccionesService } from '../../Servicios/transacciones.service';

@Component({
  selector: 'app-ingresar-pesos',
  templateUrl: './ingresar-pesos.component.html',
  styleUrls: ['./ingresar-pesos.component.css']
})
export class IngresarPesosComponent implements OnInit {

  formIngreso: FormGroup;
  submitted: false;
  operacion: Operacion;
  loginRequest: LoginRequest;

  constructor(private transaccionesService: TransaccionesService, public formBuilder: FormBuilder, private clienteService: ClienteService, private cuentaService: CuentaService, private router: Router, private modalQuienesSomosService : ModalQuienesSomosService) { }

  ngOnInit(): void {

    this.formIngreso = this.formBuilder.group({
      montoIngresoPesos: ['', [Validators.pattern('[0-9]*'), Validators.min(1)]]
    });
  }

  confirmarIngreso(){}

  cancelarIngreso(){}

}
