import { Component, OnInit } from '@angular/core';
import { TransaccionesService} from '../../Servicios/transacciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/Modelos/LoginRequest';
import { ClienteService } from '../../Servicios/cliente.service';
import { CuentaService } from '../../Servicios/cuenta.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  submitted=false;
  formTransferencia: FormGroup;
  loginRequest: LoginRequest;
  saldoActual: number;
  cvuExistente: any;
  nombreCvuDesde: string;
  valorActualCvu:string;


  constructor(
    
    private transaccionesService: TransaccionesService,
    public formBuilder: FormBuilder,
    private clienteService: ClienteService, 
    private cuentaService: CuentaService,
    private modalQuienesSomosService : ModalQuienesSomosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formTransferencia = this.formBuilder.group({
      Destino: ['', [Validators.required, Validators.pattern("[0-9]{22}")]],
      Monto: ['', [Validators.required, Validators.pattern("[0-9]{1,7}")]]
       });
       this.cargarSaldoActual();    
      }
      
      cargarSaldoActual() {
        this.loginRequest = JSON.parse(localStorage.getItem('loginRequest'));
        this.clienteService.postLogin(this.loginRequest).subscribe((resp: any) => {
          const itemCopy = {...resp};
          this.cuentaService.getById(itemCopy.idCliente).subscribe((resp2: any) => {
            const itemCopy2 = {...resp2};
            this.saldoActual = itemCopy2.saldo;
          });
          
        });
      }
aceptar(){
  this.submitted = true;
  if(this.formTransferencia.invalid || this.cvuExistente==false)
  {
    return;
  }
  this.loginRequest=JSON.parse(localStorage.getItem('loginRequest'));
  this.clienteService.postLogin(this.loginRequest).subscribe((res: any) =>{
    const itemCopy = {...res};
    this.cuentaService.getById(itemCopy.idCliente).subscribe((res2: any) => {
      const itemCopy2 = {...res2};
      itemCopy2.cvuDesde=itemCopy2.cvu;
      itemCopy2.monto=this.formTransferencia.controls.Monto.value;
      itemCopy2.cvuHasta=this.formTransferencia.controls.Destino.value;
      this.transaccionesService.postTransferencia(itemCopy2).subscribe(data =>{
        this.modalQuienesSomosService.Alert('La operación se realizo con éxito', 'Transferencia', 's');
        this.router.navigate(['/menu-principal']);
      },
      error =>  {this.modalQuienesSomosService.Alert('Saldo insuficiente','Error','w')});

    });
  });

}
/*if(itemCopy.cvu!==null)
      {

      }
      else
      {
        this.cvuExistente=false;
      }*/
buscarCvu(){

  this.cvuExistente;
  this.transaccionesService.getById(this.formTransferencia.controls.Destino.value).subscribe((res:any) => {
      this.cvuExistente=true;
      const itemCopy= {...res};
      if(itemCopy.cvu==null)
      {
        this.valorActualCvu=this.formTransferencia.controls.Destino.value;
        this.cvuExistente=false;      
        return;
      }
      this.clienteService.getById(itemCopy.idCliente).subscribe((resCli:any) =>{
        const itemCopy2= {...resCli};
        this.valorActualCvu=this.formTransferencia.controls.Destino.value;
        this.nombreCvuDesde=itemCopy2.nombre+' '+itemCopy2.apellido;
      });   
      
  }, error => {
    this.cvuExistente=false;
  }
  );

}

}

