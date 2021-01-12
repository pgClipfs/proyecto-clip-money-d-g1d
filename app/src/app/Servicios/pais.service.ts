import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PaisService {
  resourceUrl: string;


  constructor(private httpClient: HttpClient)
  {
    this.resourceUrl='https://localhost:44368/api/pais';
  }

  get()
  {
    return this.httpClient.get(this.resourceUrl);
  }
}
