using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models
{
    public class GestorCuenta
    {
        public List<Cuenta> ObtenerCuentas()
        {
            var cuentas = new List<Cuenta>();
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();
                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "obtener_cuentas";
                comm.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader dr = comm.ExecuteReader();
                
                while (dr.Read())
                {
                    var cuenta = new Cuenta();
                    var tipoCuenta = new TipoCuenta()
                    {
                        idTipoCuenta = dr.GetInt64(4),
                        nombreTipoCuenta = dr.GetString(5)
                    };
                    var estadoCuenta = new EstadoCuenta()
                    {
                        idEstadoCuenta = dr.GetInt32(6),
                        nombreEstadoCuenta = dr.GetString(7)
                    };
                    cuenta.cvu = dr.GetString(0);
                    cuenta.alias = dr.GetString(1);
                    cuenta.saldo = dr.GetDecimal(2);
                    cuenta.observacion = dr.GetString(3);
                    cuenta.tipoCuenta = tipoCuenta;
                    cuenta.estadoCuenta = estadoCuenta;
                    cuentas.Add(cuenta);                
                }
                dr.Close();
            }
            return cuentas;
        }


        public Cuenta ObtenerCuentaPorCvu(string cvu)
        {
            var cuenta = new Cuenta();
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("obtener_cuenta", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@cvu", cvu));

                SqlDataReader dr = comm.ExecuteReader();
                if (dr.Read())
                {
                    cuenta.cvu = dr.GetString(0);
                    cuenta.alias = dr.GetString(1).Trim();
                    cuenta.saldo = dr.GetDecimal(2);
                    if (!dr.IsDBNull(3))
                        cuenta.observacion = dr.GetString(3)?.Trim();
                    var tipoCuenta = new TipoCuenta()
                    {
                        idTipoCuenta = dr.GetByte(4),
                        nombreTipoCuenta = dr.GetString(5)
                    };
                    var estadoCuenta = new EstadoCuenta()
                    {
                        idEstadoCuenta = dr.GetByte(6),
                        nombreEstadoCuenta = dr.GetString(7)
                    };
                    cuenta.tipoCuenta = tipoCuenta;
                    cuenta.estadoCuenta = estadoCuenta;
                    
                }

                dr.Close();
            }

            return cuenta;

        }

        public List<Cuenta> ObtenerCuentas(long idCliente)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            var cuentas = new List<Cuenta>();
            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("obtener_cuentas_cliente", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@idCliente", idCliente));

                SqlDataReader dr = comm.ExecuteReader();

                while (dr.Read())
                {
                    var cuenta = new Cuenta();
                    var tipoCuenta = new TipoCuenta()
                    {
                        idTipoCuenta = dr.GetInt64(4),
                        nombreTipoCuenta = dr.GetString(5)
                    };
                    var estadoCuenta = new EstadoCuenta()
                    {
                        idEstadoCuenta = dr.GetInt32(6),
                        nombreEstadoCuenta = dr.GetString(7)
                    };
                    cuenta.cvu = dr.GetString(0);
                    cuenta.alias = dr.GetString(1);
                    cuenta.saldo = dr.GetDecimal(2);
                    cuenta.observacion = dr.GetString(3);
                    cuenta.tipoCuenta = tipoCuenta;
                    cuenta.estadoCuenta = estadoCuenta;
                    cuentas.Add(cuenta);
                }
                return cuentas;
            }

                
        }
    }
}

