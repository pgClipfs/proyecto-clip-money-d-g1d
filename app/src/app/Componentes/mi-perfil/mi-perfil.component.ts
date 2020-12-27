import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../Servicios/cliente.service';
import { Cliente } from '../../Modelos/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import { LoginRequest } from 'src/app/Modelos/LoginRequest';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/Servicios/authentication.service';
import { TipoDocumento } from 'src/app/Modelos/TipoDocumento';
import { TipoDocumentoService } from 'src/app/Servicios/tipo-documento.service';
import { CommonModule } from '@angular/common';



@Component({
  providers: [LoginComponent],
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  FormMiPerfil: FormGroup;
  submitted= false;
  Documentos: TipoDocumento[] = [];
  nombreTipoDocumento:string;

  constructor(public formBuilder: FormBuilder, 
    private clienteService: ClienteService, 
    private router: Router, 
    private comp: LoginComponent, 
    private loginRequest: LoginRequest,
    public datepipe: DatePipe,
    private tipoDocumentoService: TipoDocumentoService
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
      this.GetTiposDocumentos();

  }


  CargarUsuario(){
  this.loginRequest= this.comp.getLogin();
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
      const itemCopy  = {...res};
      //itemCopy.fechaNacimiento=res.fechaNacimiento;
      console.log(res);
      
      itemCopy.fechaNacimiento = this.datepipe.transform(res.fechaNacimiento , 'dd/MM/yyyy');    
      

      
      this.FormMiPerfil.patchValue(itemCopy)
      this.nombreTipoDocumento=itemCopy.tipoDocumento.nombreTipoDocumento;
      
    }  );
    }
    GetTiposDocumentos() {
      this.tipoDocumentoService.get().subscribe((res: TipoDocumento[]) => {
        this.Documentos = res;
               });
    }

    GetTipoDocumentoNombre(Id) {
      var Documento = this.Documentos.filter(
        x => x.idTipoDocumento === Id
      )[0];
      if (Documento) return Documento.nombreTipoDocumento;
      else return "";
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
