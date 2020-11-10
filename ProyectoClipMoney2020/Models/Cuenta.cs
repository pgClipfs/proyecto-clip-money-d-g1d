using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models
{
    public class Cuenta
    {
        private long cvu;
        private string alias;
        private decimal saldo;
        private string observacion;
        private long idCliente;

        
        public Cuenta()
        {

        }

        public Cuenta(long cvu, string alias, decimal saldo, string observacion, long idCliente)
        {
            this.cvu = cvu;
            this.alias = alias;
            this.saldo = saldo;
            this.observacion = observacion;
            this.idCliente = idCliente;
        }

        private string tipoCuenta;
        private string estadoCuenta;
        public Cuenta(long cvu, string alias, decimal saldo, string observacion, long idCliente, string tipoCuenta, string estadoCuenta)
        {
            this.cvu = cvu;
            this.alias = alias;
            this.saldo = saldo;
            this.observacion = observacion;
            this.idCliente = idCliente;
            this.tipoCuenta = tipoCuenta;
            this.estadoCuenta = estadoCuenta;
        }

        public long Cvu { get => cvu; set => cvu = value; }
        public string Alias { get => alias; set => alias = value; }
        public decimal Saldo { get => saldo; set => saldo = value; }
        public string Observacion { get => observacion; set => observacion = value; }
        public long IdCliente { get => idCliente; set => idCliente = value; }
        public string TipoCuenta { get => tipoCuenta; set => tipoCuenta = value; }
        public string EstadoCuenta { get => estadoCuenta; set => estadoCuenta = value; }

      
    }
}