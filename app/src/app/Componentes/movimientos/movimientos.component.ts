import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

<<<<<<< HEAD
=======
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
>>>>>>> f5f479443c35d3cb24ef40f0a03c3162da3ef534
}
