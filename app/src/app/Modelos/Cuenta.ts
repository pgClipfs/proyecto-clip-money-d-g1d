import {TipoCuenta} from './TipoCuenta';
import {Operacion} from './Operacion';
import {EstadoCuenta} from './EstadoCuenta';


export class Cuenta {
    Cvu: string;
    Alias: string;
    Saldo: string;
    Observacion: string;
    TipoCuenta: TipoCuenta;
    EstadoCuenta: EstadoCuenta;
    Operaciones: Operacion[];
    idCliente: number;

  }


