import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Domicilio } from 'src/app/Modelos/Domicilio';
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
        pais: ['',[Validators.required]],
        provincia: ['',[Validators.required]],
        localidad: ['',[Validators.required]],
        calle: ['',[Validators.required]],
        numero: ['', [Validators.required, Validators.pattern('[0-9]{1,7}')]],
        barrio: ['',[Validators.required]],
        codigoPostal: ['', [Validators.required, Validators.pattern('[0-9]{1,10}')]]
      });

      this.cargarPaises();

      if(localStorage.getItem('domicilio')==null)
      {
        return;
      }
      else
      {
        const itemCopy =JSON.parse(localStorage.getItem('domicilio'));
     
        
        
        
        console.log(itemCopy);
        itemCopy.pais=itemCopy.localidad.provincia.pais.idPais;
        itemCopy.provincia=itemCopy.localidad.provincia.idProvincia;
        itemCopy.localidad=itemCopy.localidad.idLocalidad;
        this.FormDomicilio.patchValue(itemCopy);
        this.cargarProvincias();
        this.cargarLocalidades();
        
      }

  }
  cargarPaises() {
    this.paisService.get().subscribe((res: Pais[]) => {
      this.Paises = res;
             });
   
  }

  cargarProvincias(){
   
   this.Localidades=null;
    this.provinciaService.getProvinciasPorId( this.FormDomicilio.value.pais).subscribe((res: Provincia[]) => {
 
      this.Provincias = res;
             });
 
  }
  cargarLocalidades(){
    
   
    this.localidadService.getLocalidadesPorId( this.FormDomicilio.value.provincia).subscribe((res: Localidad[]) => {
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
    var Localidad = this.Localidades.filter(
      x => x.idLocalidad === itemCopy.localidad
    )[0];    
    itemCopy.localidad=Localidad;    
    if(localStorage.getItem('domicilio')==null)
    {
      itemCopy.idDomicilio=0;
      localStorage.setItem('domicilio', JSON.stringify(itemCopy));
      console.log(itemCopy);
      this.cancelar();
    }
    else
    {
      const midom =JSON.parse(localStorage.getItem('domicilio'));
      itemCopy.idDomicilio=midom.idDomicilio;
      localStorage.removeItem('domicilio');
      localStorage.setItem('domicilio', JSON.stringify(itemCopy));
      
      console.log(itemCopy);
      this.cancelar();
    }



  }

}