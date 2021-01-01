import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  resourceUrl: string;

  constructor(private httpClient: HttpClient)
  {
    this.resourceUrl='https://localhost:44368/api/provincia/';
  }
  getProvinciasPorId(idPais: number)
  {
    return this.httpClient.get(this.resourceUrl+idPais);
  }
}