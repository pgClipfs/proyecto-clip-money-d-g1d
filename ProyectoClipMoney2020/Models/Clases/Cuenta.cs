using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models
{
    public class Cuenta
    {        
        
        public string cvu { get; set; }
        public string alias { get; set; }
        public decimal saldo { get; set; }
        public string observacion { get; set; }
        public TipoCuenta tipoCuenta { get; set; }
        public EstadoCuenta estadoCuenta { get; set; }
        public Operacion[] operaciones { get; set; }

        public Cuenta()
        {
            
        }

        public Cuenta(string cvu, string alias, decimal saldo, string observacion)
        {
            this.cvu = cvu;
            this.alias = alias;
            this.saldo = saldo;
            this.observacion = observacion;
            
        }

      
        public Cuenta(string cvu, string alias, decimal saldo, string observacion, long idCliente, TipoCuenta tipoCuenta, EstadoCuenta estadoCuenta)
        {
            this.cvu = cvu;
            this.alias = alias;
            this.saldo = saldo;
            this.observacion = observacion;
            this.tipoCuenta = tipoCuenta;
            this.estadoCuenta = estadoCuenta;
        }

        


       
    }
}