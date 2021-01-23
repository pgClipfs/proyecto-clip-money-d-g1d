import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../Servicios/cliente.service';
import { CuentaService } from '../../Servicios/cuenta.service';
import { Cliente } from '../../Modelos/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import { LoginRequest } from 'src/app/Modelos/LoginRequest';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/Servicios/authentication.service';
import { TipoDocumento } from 'src/app/Modelos/TipoDocumento';
import { TipoDocumentoService } from 'src/app/Servicios/tipo-documento.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { CommonModule } from '@angular/common';
import { Domicilio } from 'src/app/Modelos/Domicilio';
import { Cuenta } from 'src/app/Modelos/Cuenta';



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
  bandera: number;
  
 
  stringDomicilio:string;
  fotoFrenteDoc: string;
  fotoDorsoDoc: string;

  constructor(public formBuilder: FormBuilder, 
    private clienteService: ClienteService, 
    private cuentaService: CuentaService,
    private router: Router, 
    private comp: LoginComponent, 
    private modalQuienesSomosService: ModalQuienesSomosService,
    private loginRequest: LoginRequest,
    public datepipe: DatePipe,
    
    private tipoDocumentoService: TipoDocumentoService
    ){
      this.bandera=0;
       
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
        domicilio: ['',[Validators.required]],
        nacionalidad: [''],
   /*      PassEncriptada: [''], */
        usuario: ['']
        /*     SituacionCrediticia: [''],
            Cuentas: [''], */
      });      
      this.CargarUsuario();
      this.GetTiposDocumentos();
      
      

  }
  CargarDomicilioLocal() {
    if(localStorage.getItem('domicilio')==null)
    {
      return;
    }
    else
    {
      var domicilioLocal=JSON.parse(localStorage.getItem('domicilio'));
     
        this.stringDomicilio=domicilioLocal.calle+' '+domicilioLocal.numero+' '+domicilioLocal.localidad.provincia.nombreProvincia+' '+domicilioLocal.localidad.provincia.pais.nombrePais;
        console.log(this.stringDomicilio);
        this.FormMiPerfil.patchValue({
          domicilio: this.stringDomicilio,
        });   
        
    }
   
  }

  cargarImagenesDoc(){
    if(localStorage.getItem('fotoFrenteDocumento') === null || localStorage.getItem('fotoDorsoDocumento') === null)
    {
      return;
    }
  }
 
  CargarUsuario(){
  this.loginRequest= this.comp.getLogin();
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
      const itemCopy  = {...res};
      //itemCopy.fechaNacimiento=res.fechaNacimiento;
      
      
      itemCopy.fechaNacimiento = this.datepipe.transform(res.fechaNacimiento , 'dd/MM/yyyy');    
      console.log(itemCopy);
     
      
      //this.stringDomicilio=itemCopy.domicilio.calle+' '+itemCopy.domicilio.numero+' '+itemCopy.domicilio.localidad.provincia.nombreProvincia+' '+itemCopy.domicilio.localidad.provincia.pais.nombrePais;
      if(localStorage.getItem('domicilio')==null && itemCopy.domicilio!==null) 
      {   
          
          this.stringDomicilio=itemCopy.domicilio.calle+' '+itemCopy.domicilio.numero+' '+itemCopy.domicilio.localidad.provincia.nombreProvincia+' '+itemCopy.domicilio.localidad.provincia.pais.nombrePais;
          localStorage.setItem('domicilio', JSON.stringify(itemCopy.domicilio));
          console.log(JSON.parse(localStorage.getItem('domicilio')));
          itemCopy.domicilio=this.stringDomicilio;             
      
      }
      

        this.FormMiPerfil.patchValue(itemCopy)
        this.nombreTipoDocumento=itemCopy.tipoDocumento.nombreTipoDocumento;
        this.CargarDomicilioLocal();   

      // Código foto frente documento y foto dorso documento

      if((localStorage.getItem("fotoFrenteDocumento") == null && itemCopy.fotoFrenteDocumento !== null)
        && (localStorage.getItem("fotoDorsoDocumento") == null && itemCopy.fotoDorsoDocumento !== null))
        {
          localStorage.setItem('fotoFrenteDocumento', JSON.stringify(itemCopy.fotoFrenteDocumento));
          
          localStorage.setItem('fotoDorsoDocumento', JSON.stringify(itemCopy.fotoDorsoDocumento));
          
          (<HTMLInputElement>document.getElementById("btn-fotoDocumento")).style.display = 'none';
        }
       

          this.cargarImagenesDoc();

        if(itemCopy.fotoFrenteDocumento !== null && itemCopy.fotoDorsoDocumento !== null)
        {
          (<HTMLInputElement>document.getElementById("btn-fotoDocumento")).style.display = 'none';
          console.log(itemCopy.fotoFrenteDocumento);
          console.log(itemCopy.fotoDorsoDocumento);
          localStorage.removeItem("fotoFrenteDocumento");
          localStorage.removeItem("fotoDorsoDocumento");
          
        }        
        
      
        
        console.log(JSON.parse(localStorage.getItem('fotoFrenteDocumento')));
        console.log(JSON.parse(localStorage.getItem('fotoDorsoDocumento')));    

      });  
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
  
  formDomicilio(){
    this.bandera=1;

    this.router.navigate(['/form-domicilio'])
  }
  
  
  Grabar(){
    this.submitted= true;
    if(this.FormMiPerfil.invalid){      
      return;
    }   
    
    this.loginRequest= this.comp.getLogin();
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
      const itemCopy  = {...res};
      //itemCopy.fechaNacimiento=res.fechaNacimiento;
      //const itemCopy  = {...this.FormMiPerfil.value};
      if((itemCopy.domicilio == null || itemCopy.domicilio == undefined) &&
         (itemCopy.fotoFrenteDocumento == null || itemCopy.fotoFrenteDocumento == undefined) &&
         (itemCopy.fotoDorsoDocumento == null || itemCopy.fotoDorsoDocumento == undefined))
      {
        //const itemCopy2  = {...res};
          var cuenta:Cuenta;
          cuenta = {idCliente:0,Cvu:'',Alias:'',Saldo:'',Observacion:'', TipoCuenta:null,EstadoCuenta:null,Operaciones:null }
          cuenta.idCliente=itemCopy.idCliente;
          console.log(cuenta);
        
        this.cuentaService.post(cuenta).subscribe( (res: any) =>{
        },
        error => {
          this.modalQuienesSomosService.Alert('Error en el registro', 'Error inesperado', 'w');
        }       
        );
      }

      
      itemCopy.domicilio=JSON.parse(localStorage.getItem('domicilio'));
      localStorage.removeItem('domicilio');

      if((itemCopy.fotoFrenteDocumento === null || itemCopy.fotoFrenteDocumento === undefined) 
      && (itemCopy.fotoDorsoDocumento === null || itemCopy.fotoDorsoDocumento === undefined))
      {
        itemCopy.fotoFrenteDocumento = JSON.parse(localStorage.getItem('fotoFrenteDocumento'));
        //localStorage.removeItem('fotoFrenteDocumento');
        console.log(itemCopy.fotoFrenteDocumento);
        itemCopy.fotoDorsoDocumento = JSON.parse(localStorage.getItem('fotoDorsoDocumento'));
        //localStorage.removeItem('fotoDorsoDocumento');
        console.log(itemCopy.fotoFrenteDocumento);
      }
      

      itemCopy.email=this.FormMiPerfil.value.email;;
      
      itemCopy.telefono=this.FormMiPerfil.value.telefono;;

      if((itemCopy.fotoFrenteDocumento === null || itemCopy.fotoFrenteDocumento === undefined) 
    && (itemCopy.fotoDorsoDocumento === null || itemCopy.fotoDorsoDocumento === undefined)) {
      this.modalQuienesSomosService.Alert('Error en la modificación. Debe cargar las imágenes', 'Error inesperado', 'w');
    }
    else
    {
      this.clienteService.put(itemCopy.idCliente, itemCopy).subscribe( data => {
        this.cancelar();
        this.modalQuienesSomosService.Alert('Se modificó exitosamente', '', 's');
        }
    );      

    }
    
  },
  /*error => {          
    this.modalQuienesSomosService.Alert('Error en la modificación. Debe cargar las imágenes.', '¡Alerta!', 'w');
    } */
  );     
}

  


  cancelar(){
    localStorage.removeItem('domicilio');
    localStorage.removeItem('fotoFrenteDocumento');
    localStorage.removeItem('fotoDorsoDocumento');
    this.router.navigate(['/menu-principal'])

  }
  

}