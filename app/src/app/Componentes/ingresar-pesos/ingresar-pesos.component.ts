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
  submitted= false;
  operacion: Operacion;
  loginRequest: LoginRequest;
  saldoActual: number;

  constructor(private transaccionesService: TransaccionesService, public formBuilder: FormBuilder, private clienteService: ClienteService, private cuentaService: CuentaService, private router: Router, private modalQuienesSomosService : ModalQuienesSomosService) { }

  ngOnInit(): void {

    this.formIngreso = this.formBuilder.group({
      montoIngresoPesos: ['', [Validators.required,Validators.pattern('[0-9]*'), Validators.min(1)]]
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


  confirmarIngreso(){
    this.submitted = true;

    if(this.formIngreso.invalid){
      return;
    }
    this.loginRequest = JSON.parse(localStorage.getItem('loginRequest'));
    this.clienteService.postLogin(this.loginRequest).subscribe((resp: any) => {
      const itemCopy = {...resp};
      this.cuentaService.getById(itemCopy.idCliente).subscribe((resp2: any) => {
        const itemCopy2 = {...resp2};
        itemCopy2.cvuDesde = itemCopy2.cvu;
        itemCopy2.monto = this.formIngreso.controls.montoIngresoPesos.value;
        this.transaccionesService.postDeposito(itemCopy2).subscribe( data => {
          this.modalQuienesSomosService.Alert('La operación se realizo con éxito', 'Deposito', 's');
           this.router.navigate(['/menu-principal']);
        },
        error => {this.modalQuienesSomosService.Alert('Error en el deposito','Error,verifique datos','w')});
      });
      
    });
  }

  //cancelarIngreso(){}

}