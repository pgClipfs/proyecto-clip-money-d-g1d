import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../Servicios/cuenta.service';
import { Cuenta } from '../../Modelos/Cuenta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/Modelos/LoginRequest';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { CommonModule } from '@angular/common';



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
          alias:['',[Validators.required]]
        }

      );
      
      this.CargarCuenta();
  }

  CargarCuenta()
  {

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

}
