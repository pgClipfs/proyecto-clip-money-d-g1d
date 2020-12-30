import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Localidad } from 'src/app/Modelos/Localidad';
import { Pais } from 'src/app/Modelos/Pais';
import { Provincia } from 'src/app/Modelos/Provincia';
import { LocalidadService } from 'src/app/Servicios/localidad.service';
import { PaisService } from 'src/app/Servicios/pais.service';
import { ProvinciaService } from 'src/app/Servicios/provincia.service';


@Component({
  selector: 'app-form-domicilio',
  templateUrl: './form-domicilio.component.html',
  styleUrls: ['./form-domicilio.component.css']
})
export class FormDomicilioComponent implements OnInit {
  FormDomicilio: FormGroup;
  Paises: Pais[]=[];
  Provincias: Provincia[]=[];
  Localidades: Localidad[]=[];
  Calle: string;
  Numero: string;
  Barrio: string;
  CP: string;
  submitted= false;
 
  
  constructor(
    public formBuilder: FormBuilder, 
    private router: Router, 
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private localidadService: LocalidadService,
    
    ) { }

  ngOnInit(){

    this.FormDomicilio=this.formBuilder.group(
      {
        Pais: ['',[Validators.required]],
        Provincia: ['',[Validators.required]],
        Localidad: ['',[Validators.required]],
        Calle: ['',[Validators.required]],
        Numero: ['', [Validators.required, Validators.pattern('[0-9]{1,7}')]],
        Barrio: ['',[Validators.required]],
        CodigoPostal: ['', [Validators.required, Validators.pattern('[0-9]{1,7}')]]
      });

      this.cargarPaises();

  }
  cargarPaises() {
    this.paisService.get().subscribe((res: Pais[]) => {
      this.Paises = res;
             });
  }

  cargarProvincias(){
   
   this.Localidades=null;
    this.provinciaService.getProvinciasPorId( this.FormDomicilio.value.Pais).subscribe((res: Provincia[]) => {
 
      this.Provincias = res;
             });
 
  }
  cargarLocalidades(){
    
   
    this.localidadService.getLocalidadesPorId( this.FormDomicilio.value.Provincia).subscribe((res: Localidad[]) => {
      this.Localidades = res;
             });
 
  }

  cancelar(){
    
    this.FormDomicilio.reset();
    
    this.router.navigate(['/app-mi-perfil']);
 

  }
  Grabar(){

    this.submitted= true;
    if(this.FormDomicilio.invalid){

      console.log(this.FormDomicilio)
      return;

    }
    const itemCopy  = {...this.FormDomicilio.value};
    if(localStorage.getItem('domicilio')==null)
    {
      localStorage.setItem('domicilio', JSON.stringify(itemCopy));
      console.log(itemCopy);
      this.cancelar();
    }
    else
    {
      localStorage.removeItem('domicilio');
      localStorage.setItem('domicilio', JSON.stringify(itemCopy));
      console.log(itemCopy);
      this.cancelar();
    }



  }

}
