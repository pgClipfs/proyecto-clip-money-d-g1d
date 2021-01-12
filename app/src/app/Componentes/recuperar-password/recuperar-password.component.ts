import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecuperarPasswordService } from 'src/app/Servicios/recuperar-password.service';
import { ModalLoginIncorrectoService } from '../../Servicios/modal-login-incorrecto.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {


  FormRecuperarPassword: FormGroup;
  submitted = false;
  Mensajes = {
    RD: 'Revisar los datos ingresados...'
  };
  returnUrl: string;
  returnNewPassword: string;
  constructor
  (
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalLoginIncorrectoService: ModalLoginIncorrectoService,
    private modalQuienesSomosService: ModalQuienesSomosService,
    private RecuperarPasswordService: RecuperarPasswordService
  ) { }

  ngOnInit(): void {

    this.FormRecuperarPassword = this.formBuilder.group({
      Email: ['', [Validators.required]]
    });

    this.returnNewPassword = '/new-password';
  }

  validarEmail(){
    let correoElect = (<HTMLInputElement>document.getElementById("Email")).value;

    let email = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    let matchPatternEmail = email.test(correoElect) ? true : false;
     
    if(correoElect === '' || null || matchPatternEmail === false){
      let botonEnviar = (<HTMLInputElement>document.getElementById("activarBoton")).disabled = true;
      (<HTMLInputElement>document.getElementById("noMatchEmail")).innerHTML = "Ingrese un formato de email.";
    }
    else{
      let botonEnviar = (<HTMLInputElement>document.getElementById("activarBoton")).disabled = false;
      (<HTMLInputElement>document.getElementById("noMatchEmail")).innerHTML = "";
    }
  }

  enviarEmail()
  {
    this.FormRecuperarPassword.markAllAsTouched();

    
    this.RecuperarPasswordService.post(this.FormRecuperarPassword.controls.Email.value)
    .subscribe(
      data => {
        this.modalQuienesSomosService.Alert('Se envió exitosamente el correo para recuperar su contraseña. Recuerde revisar la carpeta de spam', '', 's');
        localStorage.setItem("datoUsuario", JSON.stringify((<HTMLInputElement>document.getElementById("Email")).value));
        setTimeout(() => 
        {
          //this.modalQuienesSomosService.Alert().close;
          this.router.navigate([this.returnNewPassword]);
        },
        5000);
      },
      error => {
        /* this.error = error; */
        this.modalLoginIncorrectoService.Alert('Verifique que el email ingresado sea correcto. En caso de no contar con una cuenta registrese por favor.', '', 'i');
        localStorage.setItem("datoUsuario", JSON.stringify((<HTMLInputElement>document.getElementById("Email")).value));
      }
    );
   
   
  }

}