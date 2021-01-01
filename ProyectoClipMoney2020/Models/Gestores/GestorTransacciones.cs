using ProyectoClipMoney2020.Models.Soporte;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


namespace ProyectoClipMoney2020.Models.Gestores
{
    public class GestorTransacciones
    {

        public void realizarExtraccion(Operacion operacion)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "extraccion";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                comm.Parameters.Add(new SqlParameter("@monto", operacion.monto));
                comm.Parameters.Add(new SqlParameter("@cvuDesde", operacion.cvuDesde));

                comm.ExecuteScalar();
            }

        }


        public void realizarDeposito(Operacion operacion)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "deposito";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                comm.Parameters.Add(new SqlParameter("@monto", operacion.monto));
                comm.Parameters.Add(new SqlParameter("@cvuDesde", operacion.cvuDesde));

                comm.ExecuteScalar();
            }

        }

    }
}