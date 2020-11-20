using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models
{
    public class Localidad
    {
        public long idLocalidad { get; set; }
        public string nombreLocalidad { get; set; }
        public string codigoPostal { get; set; }
        public Provincia provincia { get; set; }

    }
}