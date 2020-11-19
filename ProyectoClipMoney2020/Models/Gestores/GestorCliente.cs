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
            GestorCuenta gestorCuenta = new GestorCuenta();
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
                    var nacionalidad = new Nacionalidad()
                    {
                        idNacionalidad = dr.GetInt32(10),
                        descripcionNacionalidad = dr.GetString(11)
                    };
                    var tipoDocumento = new TipoDocumento()
                    {
                        idTipoDocumento = dr.GetInt32(12),
                        nombreTipoDocumento = dr.GetString(13)
                    };
                    var localidad = new Localidad()
                    {
                        idLocalidad = dr.GetInt32(15),
                        nombreLocalidad = dr.GetString(16)
                    };

                    var domicilio = new Domicilio()
                    {
                        idDomicilio = dr.GetInt32(14),
                        localidad = localidad,
                        calle = dr.GetString(17),
                        barrio = dr.GetString(18),
                        codigoPostal = dr.GetString(19),
                        numero = dr.GetString(20)
                    };

                    var situacionCrediticia = new SituacionCrediticia()
                    {
                        idNivel = dr.GetInt32(21),
                        descripcionNivel = dr.GetString(22)
                    };
                    cliente.idCliente = dr.GetInt32(0);
                    cliente.usuario = dr.GetString(1).Trim();
                    cliente.passEncriptada = dr.GetString(2).Trim();
                    cliente.nombre = dr.GetString(3);
                    cliente.apellido = dr.GetString(4);
                    cliente.nroDocumento = dr.GetInt32(5);
                    cliente.email = dr.GetString(6);
                    cliente.telefono = dr.GetInt32(7);
                    cliente.fotoFrenteDocumento=null;//8;
                    cliente.fotoDorsoDocumento=null;//9;                    
                    cliente.nacionalidad=nacionalidad;                    
                    cliente.tipoDocumento = tipoDocumento;
                    cliente.situacionCrediticia = situacionCrediticia;
                    cliente.fechaNacimiento = dr.GetDateTime(23);

                    cliente.cuentas=gestorCuenta.ObtenerCuentas(cliente.idCliente);


                }

                dr.Close();
            }

            return cliente;

        }

        public int registrarCliente(Cliente cliente)
        {
            int idCliente = 0;
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("registrarCliente", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                comm.Parameters.Add(new SqlParameter("@usuario", cliente.usuario));
                comm.Parameters.Add(new SqlParameter("@passEncriptada", cliente.passEncriptada));
                comm.Parameters.Add(new SqlParameter("@nombre", cliente.nombre));
                comm.Parameters.Add(new SqlParameter("@apellido", cliente.apellido));
                comm.Parameters.Add(new SqlParameter("@nroDocumento", cliente.nroDocumento));
                comm.Parameters.Add(new SqlParameter("@email", cliente.email));
                comm.Parameters.Add(new SqlParameter("@telefono", cliente.telefono));
                comm.Parameters.Add(new SqlParameter("@fotoFrenteDocumento", cliente.fotoFrenteDocumento));
                comm.Parameters.Add(new SqlParameter("@fotoDorsoDocumento", cliente.fotoDorsoDocumento));
                comm.Parameters.Add(new SqlParameter("@idNacionalidad", cliente.nacionalidad.idNacionalidad));
                comm.Parameters.Add(new SqlParameter("@idTipoDocumento", cliente.tipoDocumento.idTipoDocumento));
                comm.Parameters.Add(new SqlParameter("@idDomicilio", cliente.domicilio.idDomicilio));
                comm.Parameters.Add(new SqlParameter("@idNivel", cliente.situacionCrediticia.idNivel));
                comm.Parameters.Add(new SqlParameter("@fechaNacimiento", cliente.ObtenerFecha()));

                cliente.idCliente = int.Parse(comm.ExecuteScalar()?.ToString());
                idCliente = cliente.idCliente;
                if (cliente.idCliente == 0)
                    throw new ApplicationException();
                
                //idCliente = comm.ExecuteScalar();

                return idCliente;
        }

    }
}