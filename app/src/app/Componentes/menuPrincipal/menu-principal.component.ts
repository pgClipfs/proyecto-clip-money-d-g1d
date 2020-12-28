import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  returnURl: string;


  constructor(private router: Router) { }

  ngOnInit(): void {

  this.returnURl= '/app-mi-perfil';

  }
  
  miPerfil(){

    this.router.navigate([this.returnURl]);

  }

}
