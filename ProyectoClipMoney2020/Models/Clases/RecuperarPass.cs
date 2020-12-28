using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models.Clases
{
    public class RecuperarPass
    {
        public string email { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public long idCliente { get; set; }

        public string password { get; set; }
        public string usuario { get; set; }
        public string cod { get; set; }
        public DateTime fechaRecup { get; set; }
    }
}