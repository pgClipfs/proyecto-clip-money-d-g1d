import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import axios from 'axios';

@Component({
  selector: 'app-imagen-dni',
  templateUrl: './imagen-dni.component.html',
  styleUrls: ['./imagen-dni.component.css']
})
export class ImagenDniComponent implements OnInit {

  selectedFile: File = null;
  selectedFile2: File = null;

  constructor( private router: Router, private modalQuienesSomosService: ModalQuienesSomosService, private location: Location, private http: HttpClient) { }

  ngOnInit(): void {

  }

  cancelar(){
    localStorage.removeItem('fotoFrenteDocumento');
    localStorage.removeItem('fotoDorsoDocumento');
    this.router.navigate(['/app-mi-perfil']);
  }

  

 onFileChanged(event) {
    
    let imagePreview = (<HTMLInputElement>document.getElementById("img-preview"));
    this.selectedFile = <File>event.target.files[0];
    let fotoFrente = (<HTMLInputElement>document.getElementById("fotoFrente")).value;
    let fotoDorso = (<HTMLInputElement>document.getElementById("fotoDorso")).value;
   
    
    if(fotoFrente.length != 0 && fotoDorso.length != 0){

      if((!fotoFrente.match((/\.(jpg|png|jpeg)$/i))) || (!fotoDorso.match((/\.(jpg|png|jpeg)$/i))))
      {
        imagePreview.src = " ";
        (<HTMLInputElement>document.getElementById("error")).hidden = false;
        (<HTMLInputElement>document.getElementById("error")).style.color = "red";
        (<HTMLInputElement>document.getElementById("error")).innerHTML = 'Las extensiones admitidas son: jpg, png y jpeg.';
        (<HTMLInputElement>document.getElementById("btn-subir")).disabled = true;
        
      }
      else
      {
        (<HTMLInputElement>document.getElementById("error")).hidden = true;
        (<HTMLInputElement>document.getElementById("btn-subir")).disabled = false;
      }
    }
    else if(fotoFrente.length == 0 || fotoDorso.length == 0){
        imagePreview.src = " ";
        (<HTMLInputElement>document.getElementById("error")).hidden = false;
        (<HTMLInputElement>document.getElementById("error")).style.color = "red";
        (<HTMLInputElement>document.getElementById("error")).innerHTML = 'Ambas imágenes son requeridas.';
        (<HTMLInputElement>document.getElementById("btn-subir")).disabled = true;
        
    }

  const objectURL = URL.createObjectURL(this.selectedFile);
  imagePreview.src = objectURL;

}

onFileChanged2(event) {
  
  const imagePreview2 = (<HTMLInputElement>document.getElementById("img-preview2"));
  this.selectedFile2 = <File>event.target.files[0];
  let fotoFrente = (<HTMLInputElement>document.getElementById("fotoFrente")).value;
  let fotoDorso = (<HTMLInputElement>document.getElementById("fotoDorso")).value;
  

  if(fotoFrente.length != 0 && fotoDorso.length != 0){

    if((!fotoFrente.match((/\.(jpg|png|jpeg)$/i))) || (!fotoDorso.match((/\.(jpg|png|jpeg)$/i))))
    {
      imagePreview2.src = " ";
      (<HTMLInputElement>document.getElementById("error")).hidden = false;
      (<HTMLInputElement>document.getElementById("error")).style.color = "red";
      (<HTMLInputElement>document.getElementById("error")).innerHTML = 'Las extensiones admitidas son: jpg, png y jpeg.';
      (<HTMLInputElement>document.getElementById("btn-subir")).disabled = true;
      
    }
    else
    {
      (<HTMLInputElement>document.getElementById("error")).hidden = true;
      (<HTMLInputElement>document.getElementById("btn-subir")).disabled = false;
    }
  }
  else if(fotoFrente.length == 0 || fotoDorso.length == 0){
      imagePreview2.src = " ";
      (<HTMLInputElement>document.getElementById("error")).hidden = false;
      (<HTMLInputElement>document.getElementById("error")).style.color = "red";
      (<HTMLInputElement>document.getElementById("error")).innerHTML = 'Ambas imágenes son requeridas.';
      (<HTMLInputElement>document.getElementById("btn-subir")).disabled = true;
      
  }
const objectURL = URL.createObjectURL(this.selectedFile2);
imagePreview2.src = objectURL;

}

  
   
  async onUpload() {
    const CloudinaryUrl = 'https://api.cloudinary.com/v1_1/dtjzvfzlw/image/upload';
    const name = 'jhbmna55';
   
    const fd = new FormData();
    const fd2 = new FormData();
    
    fd.append("file", this.selectedFile, this.selectedFile.name);
    fd.append('upload_preset', name);
    
    fd2.append("file", this.selectedFile2, this.selectedFile2.name);
    fd2.append('upload_preset', name);
    
    const res = await axios.post(CloudinaryUrl, fd, {
      headers: {
              'Content-Type': 'multipart/form-data' 
      }
    });

      
          
      const res2 = await axios.post(CloudinaryUrl, fd2, {
        headers: {
                'Content-Type': 'multipart/form-data' 
        }
      });

           
      if(res.status == 200 && res2.status == 200){
        let urlFotoFrenteDoc = (<HTMLInputElement>document.getElementById("urlFotoFrenteDoc")).value = res.data.secure_url;
        let urlFotoDorsoDoc = (<HTMLInputElement>document.getElementById("urlFotoDorsoDoc")).value = res2.data.secure_url;
        localStorage.setItem('fotoFrenteDocumento', JSON.stringify(urlFotoFrenteDoc));
        localStorage.setItem('fotoDorsoDocumento', JSON.stringify(urlFotoDorsoDoc));
        this.modalQuienesSomosService.Alert('Imágenes cargadas correctamente.', '¡Éxito!', 's');
        setTimeout(() => 
        {
          this.router.navigate(['/app-mi-perfil']);
          this.modalQuienesSomosService.Alert().close();
        },
        3000);
        
      }
      else{
        this.modalQuienesSomosService.Alert('La carga de las imágenes ha fallado. Por favor, vuelve a intentarlo.', '¡Atención!', 'i');
      }
      

   
  }
}
