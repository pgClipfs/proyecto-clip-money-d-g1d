import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../Servicios/cliente.service';
import { Cliente } from '../../Modelos/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  FormMiPerfil: FormGroup;
  Submited: false;


  constructor(public formBuilder: FormBuilder, private clienteService: ClienteService) 
  {

  }

  ngOnInit()
  {
    this.FormMiPerfil = this.formBuilder.group(
      {
        IdCliente: [0],
        Nombre: [''],
        Apellido: [''],
        FechaNacimiento: [''],
        TipoDocumento: [''],
        NroDocumento: [''],
        /*     FotoFrenteDocumento: [''],
            FotoDorsoDocumento: [''], */
        Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')]],
        Telefono: ['', [Validators.required, Validators.pattern('[0-9]{20}')]],
        Domicilio: ['',[Validators.required, Validators.maxLength(120)]],
        Nacionalidad: [''],
   /*      PassEncriptada: [''], */
        Usuario: ['']
        /*     SituacionCrediticia: [''],
            Cuentas: [''], */
      });

      this.CargarUsuario();

  }

  CargarUsuario(){

   /*  this.clienteService.getById() */
  }
  

}
