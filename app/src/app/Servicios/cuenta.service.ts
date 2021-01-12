import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuenta } from '../Modelos/Cuenta';
import { LoginRequest } from '../Modelos/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  resourceUrl: string;
  constructor(private httpClient: HttpClient)
  {
    this.resourceUrl='https://localhost:44368/api/cuenta/';
  }


  post(obj: Cuenta)
  {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(cvu: string, obj: Cuenta)
  {
    return this.httpClient.put(this.resourceUrl+cvu, obj);
  }

  getById(id: number)
  {
    return this.httpClient.get(this.resourceUrl+id);
  } 
}
