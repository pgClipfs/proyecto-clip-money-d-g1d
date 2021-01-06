import { Component, OnInit } from '@angular/core';
import { LoginRequest } from 'src/app/Modelos/LoginRequest';
import { ClienteService } from 'src/app/Servicios/cliente.service';
import { CuentaService } from 'src/app/Servicios/cuenta.service';
import { UltimosMovimientosService } from '../../Servicios/ultimos-movimientos.service';
import {TransaccionesService} from '../../Servicios/transacciones.service';
import { Operacion } from 'src/app/Modelos/Operacion';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  
  loginRequest: LoginRequest;
  operaciones: Operacion[];
  

  constructor(public ultimosMovimientos: UltimosMovimientosService,
    private clienteService: ClienteService, 
    private cuentaService: CuentaService,
    private transaccionesService: TransaccionesService) { }

  ngOnInit(){

    this.loginRequest=JSON.parse(localStorage.getItem('loginRequest'));
    this.clienteService.postLogin(this.loginRequest).subscribe((res: any) => {
    const itemCopy  = {...res};
      
 /*    itemCopy.idCliente; */

    this.cuentaService.getById(itemCopy.idCliente).subscribe((res: any) => {
      const itemcopy2 = {...res};

      itemcopy2.cvu;
      /* console.log("cvu: "+ itemcopy2.cvu); */

      itemcopy2.cvuDesde= itemcopy2.cvu;

      this.transaccionesService.post(itemcopy2).subscribe((res2: any) => {
        const itemcopy3 = {...res2};
        console.log("datos de operaciones: "+ JSON.stringify(itemcopy3));
        console.log(res2);

        
        this.operaciones = res2;
    });          
    
    
    
  });

  
  });

}
}
