import { Component, OnInit } from '@angular/core';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { TransaccionesService } from '../../Servicios/transacciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operacion } from '../../Modelos/Operacion';
import { ClienteService } from '../../Servicios/cliente.service';
import { LoginRequest } from '../../Modelos/LoginRequest';
import { CuentaService } from '../../Servicios/cuenta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-retirar-pesos',
  templateUrl: './retirar-pesos.component.html',
  styleUrls: ['./retirar-pesos.component.css']
})
export class RetirarPesosComponent implements OnInit {

  formExtraccion: FormGroup;
  submitted: false;
  operacion: Operacion;
  loginRequest: LoginRequest;
  saldoActual: number;

  constructor(private transaccionesService: TransaccionesService, public formBuilder: FormBuilder, private clienteService: ClienteService, private cuentaService: CuentaService, private router: Router, private modalQuienesSomosService : ModalQuienesSomosService) { }

  ngOnInit(): void {

    this.formExtraccion = this.formBuilder.group({
      montoRetiroPesos: ['', [Validators.pattern('[0-9]*'), Validators.min(1)]]
    });
    
    this.cargarSaldoActual();
    
  }
  
  cargarSaldoActual() {
    this.loginRequest = JSON.parse(localStorage.getItem('loginRequest'));
    this.clienteService.postLogin(this.loginRequest).subscribe((resp: any) => {
      const itemCopy = {...resp};
      this.cuentaService.getById(itemCopy.idCliente).subscribe((resp2: any) => {
        const itemCopy2 = {...resp2};
        this.saldoActual = itemCopy2.saldo;
      });
      
    });
  }

  confirmarExtraccion(){
    if(this.formExtraccion.invalid){
      return;
    }
    this.loginRequest = JSON.parse(localStorage.getItem('loginRequest'));
    this.clienteService.postLogin(this.loginRequest).subscribe((resp: any) => {
      const itemCopy = {...resp};
      this.cuentaService.getById(itemCopy.idCliente).subscribe((resp2: any) => {
        const itemCopy2 = {...resp2};
        itemCopy2.cvuDesde = itemCopy2.cvu;
        itemCopy2.monto = this.formExtraccion.controls.montoRetiroPesos.value;
        this.transaccionesService.postExtraccion(itemCopy2).subscribe( data => {
          this.modalQuienesSomosService.Alert('La operación se realizo con éxito', 'Extracción', 's');
           this.router.navigate(['/menu-principal']);
        },
        error => {this.modalQuienesSomosService.Alert('Saldo insuficiente','Error','w')});
      });
      
    });
    
  }

  condicionesGiroAlDecubierto(){
    this.modalQuienesSomosService.Alert('Condiciones de GIRO AL DESCUBIERTO: ');
  }

  irAlGiro(){
    this.router.navigate(['/giro-descubierto']);
  }

}
