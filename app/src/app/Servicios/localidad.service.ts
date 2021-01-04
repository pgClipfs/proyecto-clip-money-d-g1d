import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient)
  {
    this.resourceUrl='https://localhost:44368/api/localidad/';
  }
  getLocalidadesPorId(IdLocalidad: number)
  {
    return this.httpClient.get(this.resourceUrl+IdLocalidad);
  }
}