import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  loginCuenta(){
  alert("accediendo - aqui va la funcionalidad de hacer login")
  }

  forgotPassword(){
    alert("redirigir a recuperar contraseña")
  }
}
