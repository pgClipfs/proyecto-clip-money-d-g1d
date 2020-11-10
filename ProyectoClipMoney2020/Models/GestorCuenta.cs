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
                List<Cuenta> lista = new List<Cuenta>();
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
                        long cvu = dr.GetInt64(0);
                        string alias = dr.GetString(1).Trim();
                        decimal saldo = dr.GetDecimal(2);
                        string observacion = dr.GetString(3).Trim();
                        long idCliente = dr.GetInt64(4);
                        string tipoCuenta = dr.GetString(5).Trim();
                        string estadoCuenta = dr.GetString(6).Trim();

                        Cuenta c = new Cuenta(cvu,alias,saldo,observacion,idCliente,tipoCuenta,estadoCuenta);
                        lista.Add(c);
                    }

                    dr.Close();
                }

                return lista;
            }


        public Cuenta ObtenerCuentaPorCvu(long cvu)
        {
            Cuenta c = null;
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
                    string alias = dr.GetString(1).Trim();
                    decimal saldo = dr.GetDecimal(2);
                    string observacion = dr.GetString(3).Trim();
                    long idCliente = dr.GetInt64(4);
                    string tipoCuenta = dr.GetString(5).Trim();
                    string estadoCuenta = dr.GetString(6).Trim();

                    c = new Cuenta(cvu, alias, saldo, observacion, idCliente, tipoCuenta, estadoCuenta);
                }

                dr.Close();
            }

            return c;

        }



    }
}