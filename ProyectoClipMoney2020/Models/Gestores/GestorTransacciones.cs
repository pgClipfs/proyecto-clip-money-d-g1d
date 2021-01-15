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

        public List<Operacion> ultimosDiezMovimientos(Operacion op)
        {
            var operaciones = new List<Operacion>();
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
<<<<<<< HEAD
=======

>>>>>>> 4c17bbbd8f623a445caceed58f6ac389d928d1b3
            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "SEL_Ultimos10Movimientos";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@cvuDesde", op.cvuDesde));

                SqlDataReader dr = comm.ExecuteReader();
                while (dr.Read())
                {
                    var operacion = new Operacion();
                    var tipoOperacion = new TipoOperacion()
                    {
                        idTipoOperacion = dr.GetByte(3),
                        nombreOperacion = dr.GetString(4)

                    };
                    var estadoOperacion = new EstadoOperacion()
                    {
                        idEstadoOeracion = dr.GetByte(5),
                        nombreEstadoOperacion = dr.GetString(6)
                    };

                    operacion.idOperacion = dr.GetInt64(0);
                    operacion.fechaOperacion = dr.GetDateTime(1);
                    operacion.monto = dr.GetDecimal(2);
                    operacion.tipoOperacion = tipoOperacion;
                    operacion.cvuDesde = dr.GetString(7);

                    if (!dr.IsDBNull(8))
                        operacion.cvuHasta = dr.GetString(8)?.Trim();

                    operacion.estadoOperacion = estadoOperacion;
                    operaciones.Add(operacion);
                }
                dr.Close();
            }
            return operaciones;
        }

        public void realizarTransferencia(Operacion operacion)
        {

            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "transferencia";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                comm.Parameters.Add(new SqlParameter("@monto", operacion.monto));
                comm.Parameters.Add(new SqlParameter("@cvuDesde", operacion.cvuDesde));
                comm.Parameters.Add(new SqlParameter("@cvuHasta", operacion.cvuHasta));
                comm.ExecuteScalar();
            }
        }

        public void realizarGiro(Operacion operacion)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "giro";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                comm.Parameters.Add(new SqlParameter("@monto", operacion.monto));
                comm.Parameters.Add(new SqlParameter("@cvuDesde", operacion.cvuDesde));

                comm.ExecuteScalar();
            }

        }
    }
}