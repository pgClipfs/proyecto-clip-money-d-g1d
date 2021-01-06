import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../Modelos/Cliente';
import { LoginRequest } from '../Modelos/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  resourceUrl: string;
  constructor(private httpClient: HttpClient)
  {
    this.resourceUrl='https://localhost:44368/api/cliente/';
  }




  post(obj: Cliente)
  {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(IdCliente: number, obj: Cliente)
  {
    return this.httpClient.put(this.resourceUrl+IdCliente, obj);
  }

  getById(IdCliente: number)
  {
    return this.httpClient.get(this.resourceUrl+IdCliente);
  }

  postLogin(loginRequest: LoginRequest)
  {
    return this.httpClient.post('https://localhost:44368/api/cliente/ObtenerCliente', loginRequest);
  }
  
}