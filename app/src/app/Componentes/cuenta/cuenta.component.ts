import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../Servicios/cuenta.service';
import { Cuenta } from '../../Modelos/Cuenta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/Modelos/LoginRequest';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { CommonModule } from '@angular/common';
import { ClienteService } from 'src/app/Servicios/cliente.service';



@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  
  submitted=false;
  FormCuenta: FormGroup;
  FormAlias:FormGroup;
  Accion = 'C';

  constructor(public formBuilder: FormBuilder, 
    private cuentaService: CuentaService, 
    private router: Router,    
    private modalQuienesSomosService: ModalQuienesSomosService,
    private loginRequest: LoginRequest,
    private clienteService: ClienteService, 
    ) { }

  ngOnInit(): void {
    
    this.FormCuenta = this.formBuilder.group(
      {
        cvu: [''],
        alias: [''],
        saldo: [''],
        observacion: [''],
        tipoCuenta: [''],
        estadoCuenta: [''],        
      });
      this.FormAlias=this.formBuilder.group(
        {
          alias:['',[Validators.required, Validators.maxLength(50)]]
        }

      );
      
      this.CargarCuentaPesos();
  }

  CargarCuentaPesos()
  { 
    
    this.loginRequest=JSON.parse(localStorage.getItem('loginRequest'));    
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
      const itemCopy  = {...res};
      
      this.cuentaService.getById(itemCopy.idCliente).subscribe((res: any) => {
        const itemCopy2  = {...res};
        itemCopy2.tipoCuenta=itemCopy2.tipoCuenta.nombreTipoCuenta;
        itemCopy2.estadoCuenta=itemCopy2.estadoCuenta.nombreEstadoCuenta;
        itemCopy2.saldo='$'+itemCopy2.saldo;
        this.FormCuenta.patchValue(itemCopy2);


      });

    
    });
  }


  
  
  Volver(){
    this.router.navigate(['/menu-principal']);
  }
  formAlias()
  {
      this.Accion='A';
  }
  Cancelar()
  {
    this.FormAlias.reset();
    this.Accion='C';
    this.ngOnInit();
  }
  grabarAlias()
  {
    
    if(this.FormAlias.invalid) {     
      return;
    }
    
    const itemCopy  = {...this.FormAlias.value};

    this.loginRequest=JSON.parse(localStorage.getItem('loginRequest'));
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
      const itemCopy2  = {...res};
      
      this.cuentaService.put(itemCopy2.idCliente, itemCopy).subscribe( data => {      
        this.CargarCuentaPesos();  
        this.modalQuienesSomosService.Alert('Se actualizo exitosamente', '', 's');
        },
        error => {          
        this.modalQuienesSomosService.Alert('Error inesperado.', '¡Ingreso incorrecto!', 'w');
        });       

    });
    
    this.Accion='C';
  
  
   
  }

}