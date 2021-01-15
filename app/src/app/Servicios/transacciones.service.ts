import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuenta } from '../Modelos/Cuenta';
import { Operacion } from '../Modelos/Operacion';


@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
  

  resourceUrl: string;

  constructor(private httpClient: HttpClient)
  {
    this.resourceUrl='https://localhost:44368/api/transacciones/';
  }


  post(obj: Cuenta)
  {   
    return this.httpClient.post(this.resourceUrl + 'ultimos-mov', obj);
  }

  postExtraccion(obj: Operacion)
  {   
    return this.httpClient.post(this.resourceUrl + 'extraccion', obj);
  }

  postGiro(obj: Operacion) {
    return this.httpClient.post(this.resourceUrl + 'giro', obj);
  }

  postTransferencia(obj: Operacion){
    return this.httpClient.post(this.resourceUrl + 'transferencia', obj);
  }
}