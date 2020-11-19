using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models
{
    public class Cliente
    {
        public int idCliente { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public TipoDocumento tipoDocumento { get; set; }
        public int nroDocumento { get; set; }
        public byte[] fotoFrenteDocumento { get; set; }
        public byte[] fotoDorsoDocumento { get; set; }
        public string email { get; set; }
        public int telefono { get; set; }
        public Domicilio domicilio { get; set; }
        public Nacionalidad nacionalidad { get; set; }
        public string passEncriptada { get; set; }
        public string usuario { get; set; }
        public SituacionCrediticia situacionCrediticia { get; set; }
        public IList<Cuenta> cuentas { get; set; }

        public string ObtenerFecha()
        {
            return fechaNacimiento.ToString("yyyy-MM-ddTHH:mm:ss.fff");
        }
    }
}