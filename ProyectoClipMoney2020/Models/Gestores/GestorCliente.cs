using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models.Gestores
{
    public class GestorCliente
    {
        public Cliente ObtenerDatosCliente(LoginRequest ploginRequest)
        {
            var cliente = new Cliente();
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("obtenerCliente", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@username", ploginRequest.Username));
                comm.Parameters.Add(new SqlParameter("@password", ploginRequest.Password));

                SqlDataReader dr = comm.ExecuteReader();
                if (dr.Read())
                {
                    cliente.idCliente = dr.GetInt32(0);
                    cliente.alias = dr.GetString(1).Trim();
                    cliente.saldo = dr.GetDecimal(2);
                    cliente.observacion = dr.GetString(3).Trim();
                    var tipoCuenta = new TipoCuenta()
                    {
                        idTipoCuenta = dr.GetInt32(4),
                        nombreTipoCuenta = dr.GetString(5)
                    };
                    var estadoCuenta = new EstadoCuenta()
                    {
                        idEstadoCuenta = dr.GetInt32(6),
                        nombreEstadoCuenta = dr.GetString(7)
                    };
                    cliente.tipoCuenta = tipoCuenta;
                    cliente.estadoCuenta = estadoCuenta;

                }

                dr.Close();
            }

            return cliente;

        }

    }
}