import { Component, OnInit } from '@angular/core';
import { TransaccionesService} from '../../Servicios/transacciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  submitted=false;
  formTransferencia: FormGroup;

  constructor(
    
    private transaccionesService: TransaccionesService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formTransferencia = this.formBuilder.group({
      Destino: ['', [Validators.required]],
      Monto: ['', [Validators.required]]
       });
  }

aceptar(){

};
buscarCvu(){
  
}

}

