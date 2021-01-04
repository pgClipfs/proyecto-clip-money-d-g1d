import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/Modelos/LoginRequest';
import { ClienteService } from 'src/app/Servicios/cliente.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  returnURl: string;
  nombreCompleto:string;
  loginRequest:LoginRequest;
  active: number;


  constructor(private router: Router, private clienteService: ClienteService) { }

  ngOnInit(): void {

  this.active=3;
  this.returnURl= '/app-mi-perfil';
  this.nombreCompleto='';
  this.loginRequest=JSON.parse(localStorage.getItem('loginRequest'));
  this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
    const itemCopy  = {...res};
    //itemCopy.fechaNacimiento=res.fechaNacimiento;
    this.nombreCompleto=itemCopy.nombre+' '+itemCopy.apellido;
    if(itemCopy.domicilio==null)
    {
      this.active=0;
    }
    else
    {
      this.active=1;
    }
        
    
    
  });

  }
  
  miPerfil(){

    this.router.navigate([this.returnURl]);

  }

}
