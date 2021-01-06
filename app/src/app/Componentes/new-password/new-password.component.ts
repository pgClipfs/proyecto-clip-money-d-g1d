import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { strict } from 'assert';
import { from } from 'rxjs';
import { RecuperarPasswordService } from 'src/app/Servicios/recuperar-password.service';
import { ModalLoginIncorrectoService } from '../../Servicios/modal-login-incorrecto.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { RecuperarPass } from 'src/app/Modelos/RecuperarPass';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})


export class NewPasswordComponent implements OnInit {


  public passwords: RecuperarPass[];
  selectedPasswords: RecuperarPass = new RecuperarPass();

  constructor(
              public formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private modalLoginIncorrectoService: ModalLoginIncorrectoService,
              private modalQuienesSomosService: ModalQuienesSomosService,
              private RecuperarPasswordService: RecuperarPasswordService
             )  { }

  FormNewPassword: FormGroup;
  submitted = false;
  Mensajes = {
    RD: 'Revisar los datos ingresados...'
  };
  returnUrl: string;
  returnLogin: string;
       
  ngOnInit(): void {

    this.FormNewPassword = this.formBuilder.group({
      Codigo: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]],
      Password2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]]
    });

    this.returnLogin = '/login';
  }

  validarCodigo(cod: string){
    let codigo = (<HTMLInputElement>document.getElementById("Codigo")).value;
     

    if(codigo.length == 0 || codigo === "" || codigo === null || codigo.length != 7){
         //let botonEnviar = (<HTMLInputElement>document.getElementById("newPassword")).disabled = true;
      (<HTMLInputElement>document.getElementById("verificarPass")).disabled = true;
      (<HTMLInputElement>document.getElementById("divPassword")).hidden = true;
      (<HTMLInputElement>document.getElementById("divPassword2")).hidden = true;
    }

    else if(codigo.length == 7){
      //let botonEnviar = (<HTMLInputElement>document.getElementById("newPassword")).disabled = false;
      (<HTMLInputElement>document.getElementById("verificarPass")).disabled = false;
      (<HTMLInputElement>document.getElementById("divPassword")).hidden = false;
      (<HTMLInputElement>document.getElementById("divPassword2")).hidden = false;
    }
  }

  verificarPasswords() {

    // Obtenemos los valores de los campos de contraseñas 
    let pass1 = (<HTMLInputElement>document.getElementById("Password")).value;
    let pass2 = (<HTMLInputElement>document.getElementById("Password2")).value;


    if(pass1 === "" || pass1 === null || pass2 === "" || pass2 === null)
    {
        (<HTMLInputElement>document.getElementById("matchPassword")).innerHTML = "Por favor, ingrese las contraseñas.";
        (<HTMLInputElement>document.getElementById("matchPassword")).classList.add("colorErr");
        (<HTMLInputElement>document.getElementById("matchPassword")).classList.add("mostrar");

        (<HTMLInputElement>document.getElementById("newPassword")).disabled = true;
        
        // Si las contraseñas son nulas o vacias mostramos el mensaje
        

        return false;
    }

    // Verificamos si las contraseñas no coinciden 
    else if (pass1 !== pass2) {

      (<HTMLInputElement>document.getElementById("matchPassword")).innerHTML = "Las contraseñas no coinciden, intenta nuevamente.";
      (<HTMLInputElement>document.getElementById("matchPassword")).classList.add("colorErr");
      (<HTMLInputElement>document.getElementById("matchPassword")).classList.add("mostrar");

      (<HTMLInputElement>document.getElementById("newPassword")).disabled = true;

        return false;
    }
    
    else if((pass1.length>=8 && pass1.length<=18) && (pass2.length>=8 && pass2.length<=18)){

      (<HTMLInputElement>document.getElementById("matchPassword")).innerHTML = "Las contraseñas coinciden.";
      (<HTMLInputElement>document.getElementById("matchPassword")).classList.remove("colorErr");
      (<HTMLInputElement>document.getElementById("matchPassword")).classList.add("colorOk");
      (<HTMLInputElement>document.getElementById("matchPassword")).classList.add("mostrar");

        // Desabilitamos el botón de verificar contraseña 
        //(<HTMLInputElement>document.getElementById("verificarPass")).disabled = true;

        // Habilitamos el botón de actualizar contraseña 
        (<HTMLInputElement>document.getElementById("newPassword")).disabled = false;

           
        return true;
    }

} 

 
  public newPassword()
  {
    this.FormNewPassword.markAllAsTouched();

      if(this.verificarPasswords()){
        var datoUsuario = JSON.parse(localStorage.getItem("datoUsuario"));
        console.log(datoUsuario);
  
        this.RecuperarPasswordService.put(this.FormNewPassword.controls.Codigo.value, this.FormNewPassword.controls.Password2.value, datoUsuario)
        .subscribe(data=>{
        this.modalQuienesSomosService.Alert('Contraseña actualizada correctamente.', '¡Éxito!', 's');
        setTimeout(() => 
        {
          this.router.navigate([this.returnLogin]);
        },
        3000);
        
        //localStorage.removeItem("datoUsuario");
      },
      error => {
        /* this.error = error; */
        this.modalLoginIncorrectoService.Alert('Verifique que el código y las contraseñas ingresados sean correctos.', '¡Atención!', 'i');
      });
      }
      else {
        (<HTMLInputElement>document.getElementById("matchPassword")).innerHTML = "Las contraseñas deben coincidir, verifiquelas.";
      (<HTMLInputElement>document.getElementById("matchPassword")).classList.add("colorErr");
      (<HTMLInputElement>document.getElementById("matchPassword")).classList.add("mostrar");
      }
  }
}