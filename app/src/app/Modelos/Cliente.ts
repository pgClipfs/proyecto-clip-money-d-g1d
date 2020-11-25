import {TipoDocumento} from './TipoDocumento';
import {Domicilio} from './Domicilio';
import {Nacionalidad} from './Nacionalidad';
import {SituacionCrediticia} from './SituacionCrediticia';
import {Cuenta} from './Cuenta';


export class Cliente {
    idCliente: number;
    Nombre: string;
    Apellido: string;
    FechaNacimiento: string;
    TipoDocumento: TipoDocumento;
    NroDocumento: number;
    FotoFrenteDocumento: string;
    FotoDorsoDocumento: string;
    Email: string;
    Telefono: number;
    Domicilio: Domicilio;
    Nacionalidad: Nacionalidad;
    PassEncriptada: string;
    Usuario: string;
    SituacionCrediticia: SituacionCrediticia;
    Cuentas: Cuenta[];
  }

