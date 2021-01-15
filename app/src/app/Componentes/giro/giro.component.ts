import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../Servicios/cliente.service';
import { LoginRequest } from '../../Modelos/LoginRequest';
import { CuentaService } from '../../Servicios/cuenta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransaccionesService } from '../../Servicios/transacciones.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';


@Component({
  selector: 'app-giro',
  templateUrl: './giro.component.html',
  styleUrls: ['./giro.component.css']
})
export class GiroComponent implements OnInit {
  
  submitted = false;
  formGiro: FormGroup;
  loginRequest: LoginRequest;
  validarMontoMin = false;
  validarMontoMax = false;
  saldoActual: number;

  constructor(public formBuilder: FormBuilder, private clienteService: ClienteService, private cuentaService: CuentaService, private transaccionesService: TransaccionesService
    , private modalQuienesSomosService: ModalQuienesSomosService, private router: Router) { }

  ngOnInit(): void {
    this.formGiro = this.formBuilder.group({
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

  confirmarGiro(){
    if(this.formGiro.invalid){
      return;
    }
    this.loginRequest = JSON.parse(localStorage.getItem('loginRequest'));
    this.clienteService.postLogin(this.loginRequest).subscribe((resp: any) => {
      const itemCopy = {...resp};
      this.cuentaService.getById(itemCopy.idCliente).subscribe((resp2: any) => {
        const itemCopy2 = {...resp2};
        itemCopy2.cvuDesde = itemCopy2.cvu;
        if (itemCopy2.saldo > this.formGiro.controls.montoRetiroPesos.value) {
          this.validarMontoMin = true;
          return;
        }
        else {
          
          var montoMax = itemCopy2.saldo * 1.1;
          if (this.formGiro.controls.montoRetiroPesos.value > montoMax) {
            this.validarMontoMax = true;
            return;
          }

          itemCopy2.monto = this.formGiro.controls.montoRetiroPesos.value;
          this.transaccionesService.postGiro(itemCopy2).subscribe( data => {
            this.modalQuienesSomosService.Alert('La operación se realizo con éxito', 'Extracción', 's');
             this.router.navigate(['/menu-principal']);
          },
          error => {this.modalQuienesSomosService.Alert('Cuenta inexistente','Error','w')});
        }
        

        
      });
      
    });
  }

  condicionesGiro(){

    this.modalQuienesSomosService.Alert('Condiciones', 'Bases y condiciones', 'i');

  }


}
