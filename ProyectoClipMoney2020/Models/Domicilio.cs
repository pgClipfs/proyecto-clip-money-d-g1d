using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models
{
    public class Domicilio
    {
        public int idDomicilio { get; set; }
        public Localidad localidad { get; set; }
        public string calle { get; set; }
        public string numero { get; set; }
        public string barrio { get; set; }
        public string codigoPostal { get; set; }
    }
}