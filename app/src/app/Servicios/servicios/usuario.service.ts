/* import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Cliente} from '../../Modelos/Cliente';
import {environment as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }  
    async obtenerClientes(idCliente): Promise<Cliente>{
      const url = `${env.ApiUrl}/api/cliente/${idCliente}`
    }


} */
