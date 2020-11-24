import { EstadoOperacion } from './EstadoOperacion';
import {TipoOperacion} from './TipoOperacion';


export class Operacion {
    IdOperacion: number;
    FechaOperacion: string;
    Monto: number;
    TipoOperacion: TipoOperacion;
    EstadoOperacion: EstadoOperacion;
    CvuHasta: string;
  }

