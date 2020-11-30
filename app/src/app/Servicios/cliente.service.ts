import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../Modelos/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  resourceUrl: string;
  constructor(private httpClient: HttpClient)
  {
    this.resourceUrl='https://localhost:44368/api/cliente';
  }




  post(obj: Cliente)
  {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}




