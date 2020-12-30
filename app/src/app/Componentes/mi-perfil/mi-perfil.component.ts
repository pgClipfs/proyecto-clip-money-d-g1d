import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../Servicios/cliente.service';
import { Cliente } from '../../Modelos/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import { LoginRequest } from 'src/app/Modelos/LoginRequest';



@Component({
  providers: [LoginComponent],
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  FormMiPerfil: FormGroup;
  submitted= false;
  

  constructor(public formBuilder: FormBuilder, 
    private clienteService: ClienteService, 
    private router: Router, 
    private comp: LoginComponent, 
    private loginRequest: LoginRequest
    ){
  
  }

  ngOnInit()
  {
    this.FormMiPerfil = this.formBuilder.group(
      {
        idCliente: [0],
        nombre: [''],
        apellido: [''],
        fechaNacimiento: [''],
        tipoDocumento: [''],
        nroDocumento: [''],
        /*     FotoFrenteDocumento: [''],
            FotoDorsoDocumento: [''], */
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')]],
        telefono: ['', [Validators.required, Validators.pattern('[0-9]{8,20}')]],
        domicilio: ['',[Validators.required, Validators.maxLength(120)]],
        nacionalidad: [''],
   /*      PassEncriptada: [''], */
        usuario: ['']
        /*     SituacionCrediticia: [''],
            Cuentas: [''], */
      });

      this.CargarUsuario();

  }

  CargarUsuario(){
  this.loginRequest= this.comp.getLogin();
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
      this.FormMiPerfil.patchValue(res)}
  );
  }

  Grabar(){

    this.submitted= true;
    if(this.FormMiPerfil.invalid){

      console.log(this.FormMiPerfil)
      return;

    }

  }

  cancelar(){

    this.router.navigate(['/menu-principal'])

  }
  

}
