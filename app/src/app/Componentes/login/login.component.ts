import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDocumento } from 'src/app/Modelos/TipoDocumento';
import { TipoDocumentoService } from '../../Servicios/tipo-documento.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  TituloAccionABMC = {
    R: 'Registrarse',
    C: 'Iniciar sesión',

  };
  Documentos: TipoDocumento[] = [];
  AccionABMC = 'C';
  FormLogin: FormGroup;
  FormRegistro: FormGroup;
  Mensajes = {
    RD: 'Revisar los datos ingresados...'
  };

  constructor(public formBuilder: FormBuilder, private tipoDocumentoService: TipoDocumentoService, private modalQuienesSomosService: ModalQuienesSomosService) { }

  ngOnInit() {
    this.FormLogin = this.formBuilder.group({
      Usuario: ['', Validators.required],
      Password: ['', Validators.required]
    });
    this.FormRegistro = this.formBuilder.group({
      Usuario: ['', Validators.required],
      PassEncriptada: ['', Validators.required],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      TipoDocumento: ['', Validators.required],
      NroDocumento: ['', Validators.required],
      Email: ['', Validators.required],
      Telefono: ['', Validators.required],
      Nacionalidad: ['', Validators.required],
      FechaNacimiento: ['', Validators.required]
    });

    // this.GetTokerLogin();
  }

  GetTiposDocumentos() {
    this.tipoDocumentoService.get().subscribe((res: TipoDocumento[]) => {
      this.Documentos = res;
      console.log(this.Documentos);
    });
  }


  loginCuenta() {
    this.FormLogin.markAllAsTouched();
  }

  forgotPassword() {
    alert('redirigir a recuperar contraseña');
  }

  crearCliente() {
    this.AccionABMC = 'R';
    this.GetTiposDocumentos();
  }

  cancelar() {
    this.AccionABMC = 'C';
    this.FormLogin.reset();
    this.FormRegistro.reset();
  }

  Grabar() {
    this.FormRegistro.markAllAsTouched();
  }

  subirFoto() {
    alert("En construccion - botones subir foto");

  }


  llamarModal() {
    this.modalQuienesSomosService.Alert('Nicolas Alvarez, Jimena Bustos Paulich, Melani Crespo, Martin Diaz, Maximiliano Iglesias del Castillo, Matias LLorens, Joel Ocampo, Melania Peralta Flores, Tomas Pozzo - Programa Clip 2020 - Grupo 1D -', 'Conoce a nuestro Equipo!', 'i');
  }
}
