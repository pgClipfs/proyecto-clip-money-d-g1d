using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models
{
    public class Provincia
    {
        public int idProvincia { get; set; }
        public string nombreProvincia { get; set; }
        public Pais pais { get; set; }

    }
}