import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuenta } from '../Modelos/Cuenta';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  resourceUrl: string;

  constructor(private httpClient: HttpClient)
  {
    this.resourceUrl='https://localhost:44368/api/transacciones/ultimos-mov';
  }


  post(obj: Cuenta)
  {   
    return this.httpClient.post(this.resourceUrl, obj);
  }
}