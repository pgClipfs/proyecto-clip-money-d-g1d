using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models
{
    public class Operacion
    {
        public long idOperacion { get; set; }
        public DateTime fechaOperacion { get; set; }
        public decimal monto { get; set; }
        public TipoOperacion tipoOperacion { get; set; }
        public EstadoOperacion estadoOperacion { get; set; }
        public string cvuHasta { get; set; }
        public string cvuDesde { get; set; }
    }
}