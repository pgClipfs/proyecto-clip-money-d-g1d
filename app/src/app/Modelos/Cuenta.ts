import {TipoCuenta} from './TipoDocumento';
import {Operacion} from './Operacion';
import {EstadoCuenta} from './EstadoCuenta';


export class Cuenta {
    Cvu: number;
    Alias: string;
    Saldo: string;
    Observacion: string;
    TipoCuenta: TipoCuenta;
    EstadoCuenta: EstadoCuenta;
    Operaciones: Operacion[];
  
    
  };

