import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { RecuperarPass } from '../Modelos/RecuperarPass';
import { emit } from 'process';

@Injectable({
  providedIn: 'root'
})
export class RecuperarPasswordService {
  resourceUrl: string;
  resourceUrl2: string;
  constructor(private httpClient: HttpClient)
  {
    this.resourceUrl = 'https://localhost:44368/api/recuperarPass';
    this.resourceUrl2 = 'https://localhost:44368/api/recuperarPass/newPass';
  }

  post(email: string): Observable<any> {
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<any>(this.resourceUrl,  { email } );
  }


  put(cod: string, password: string, email: string): Observable<any>{
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<any>(this.resourceUrl2, { cod, password, email });
  }
}