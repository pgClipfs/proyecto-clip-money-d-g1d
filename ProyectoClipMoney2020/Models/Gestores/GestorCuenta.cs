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
        public bool ValidarCuentaExistente(long idCliente)
        {
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            bool result = true;

            using (SqlConnection conn = new SqlConnection(strConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("buscarCuentasActivas", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@idCliente", idCliente));


                SqlDataReader reader = comm.ExecuteReader();

                if (reader.HasRows)
                {
                    result = false;
                }

            }
            return result;
        }


        public int CrearCuenta(long idCliente)
        {
            int id = 0;
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "crearCuentaPesos";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                comm.Parameters.Add(new SqlParameter("@idCliente", idCliente));               

                id = Convert.ToInt32(comm.ExecuteScalar());

            }
            return id;
        }

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

        public int ActualizarCuenta(int id,Cuenta cuenta)
        {
            int boo = 0;            
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();            
            
                using (SqlConnection conn = new SqlConnection(StrConn))
                {
                    conn.Open();

                    SqlCommand comm = conn.CreateCommand();
                    comm.CommandText = "actualizarAlias";
                    comm.CommandType = System.Data.CommandType.StoredProcedure;
                    //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                    comm.Parameters.Add(new SqlParameter("@idCliente", id));
                    comm.Parameters.Add(new SqlParameter("@alias", cuenta.alias));                  

                    boo = Convert.ToInt32(comm.ExecuteScalar());

                }
            

            return boo;
           
        }

        public Cuenta ObtenerCuentaPesosPorIdCliente(long idCliente)
        {
            var cuenta = new Cuenta();
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("obtener_cuentaXid", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@idCliente", idCliente));

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
                    if(!dr.IsDBNull(3))
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