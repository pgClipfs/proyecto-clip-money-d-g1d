using ProyectoClipMoney2020.Models.Soporte;
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
        public Cliente ObtenerDatosClientePorLogin(LoginRequest ploginRequest)
        {
            GestorCuenta gestorCuenta = new GestorCuenta();
            var cliente = new Cliente();
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("obtenerClienteConLogin", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@username", ploginRequest.Username));
                comm.Parameters.Add(new SqlParameter("@password", Encriptacion.GetSHA256(ploginRequest.Password)));

                SqlDataReader dr = comm.ExecuteReader();
                if (dr.Read())
                {
                    cliente = new Cliente();
                    /*Nacionalidad nacionalidad = new Nacionalidad()
                    {
                        idNacionalidad = dr.GetByte(10),
                        descripcionNacionalidad = dr.GetString(11)
                    };*/
                    var tipoDocumento = new TipoDocumento()
                    {
                        idTipoDocumento = dr.GetByte(12),
                        nombreTipoDocumento = dr.GetString(13)
                    };
                    /*var situacionCrediticia = new SituacionCrediticia()
                    {
                        idNivel = dr.GetInt64(25),
                        descripcionNivel = dr.GetString(26)
                    };
                    var nacionalidad = new Nacionalidad()
                    {
                        idNacionalidad = dr.GetInt32(10),
                        descripcionNacionalidad = dr.GetString(11)
                    };*/                    
                    if (!dr.IsDBNull(14))
                    {
                        var pais = new Pais()
                        {
                            idPais = dr.GetInt32(23),
                            nombrePais = dr.GetString(24)
                        };
                        var provincia = new Provincia()
                        {
                            idProvincia = dr.GetInt32(21),
                            nombreProvincia = dr.GetString(22),
                            pais = pais

                        };
                        var localidad = new Localidad()
                        {
                            idLocalidad = dr.GetInt64(19),
                            nombreLocalidad = dr.GetString(20),
                            codigoPostal = dr.GetString(18),
                            provincia = provincia

                        };
                        var domicilio = new Domicilio()
                        {
                            idDomicilio = dr.GetInt32(14),
                            calle = dr.GetString(15),
                            numero = dr.GetString(16),
                            barrio = dr.GetString(17),
                            codigoPostal = dr.GetString(18),
                            localidad = localidad

                        };

                        cliente.domicilio = domicilio;
                    }
                    cliente.idCliente = dr.GetInt64(0);
                    cliente.usuario = dr.GetString(1).Trim();
                    cliente.passEncriptada = dr.GetString(2).Trim();
                    cliente.nombre = dr.GetString(3);
                    cliente.apellido = dr.GetString(4);
                    cliente.nroDocumento = dr.GetInt32(5);
                    cliente.email = dr.GetString(6);
                    cliente.telefono = dr.GetInt64(7);
                    cliente.fotoFrenteDocumento = null;//8;
                    cliente.fotoDorsoDocumento = null;//9;                  
                    cliente.tipoDocumento = tipoDocumento;
<<<<<<< HEAD
                    //cliente.situacionCrediticia = situacionCrediticia;
                    cliente.fechaNacimiento = dr.GetDateTime(27);
=======
                    
                    cliente.fechaNacimiento = dr.GetDateTime(27);                
>>>>>>> 1fc2e7c1e34889d804a6302942e5f8254646fa54

                    cliente.cuentas=gestorCuenta.ObtenerCuentas(cliente.idCliente);


                }

                dr.Close();
            }

            return cliente;

        }

        public Cliente ObtenerDatosClientePorid(long idCliente)
        {
            GestorCuenta gestorCuenta = new GestorCuenta();
            Cliente cliente = null;
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("obtenerClienteConId", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@idCliente", idCliente));                

                SqlDataReader dr = comm.ExecuteReader();
                if (dr.Read())
                {
                    cliente = new Cliente();
                    Nacionalidad nacionalidad = new Nacionalidad()
                    {
                        idNacionalidad = dr.GetByte(10),
                        descripcionNacionalidad = dr.GetString(11)
                    };
                    var tipoDocumento = new TipoDocumento()
                    {
                        idTipoDocumento = dr.GetByte(12),
                        nombreTipoDocumento = dr.GetString(13)
                    };
                    
                    var pais = new Pais()
                    {
                        idPais = dr.GetInt32(23),
                        nombrePais=dr.GetString(24)
                    };
                    var provincia = new Provincia()
                    {
                        idProvincia = dr.GetInt32(21),
                        nombreProvincia = dr.GetString(22),
                        pais = pais

                    };
                    var localidad = new Localidad()
                    {
                        idLocalidad = dr.GetInt64(19),
                        nombreLocalidad = dr.GetString(20),
                        codigoPostal = dr.GetString(18),
                        provincia = provincia


                    };

                    var domicilio = new Domicilio()
                    {
                        idDomicilio = dr.GetInt32(14),
                        calle = dr.GetString(15),
                        numero = dr.GetString(16),
                        barrio = dr.GetString(17),
                        codigoPostal = dr.GetString(18),
                        localidad = localidad                        
                        
                    };

                    var situacionCrediticia = new SituacionCrediticia()
                    {
                        idNivel = dr.GetInt64(25),
                        descripcionNivel = dr.GetString(26)
                    };
                    cliente.idCliente = dr.GetInt64(0);
                    cliente.usuario = dr.GetString(1).Trim();
                    cliente.passEncriptada = dr.GetString(2).Trim();
                    cliente.nombre = dr.GetString(3);
                    cliente.apellido = dr.GetString(4);
                    cliente.nroDocumento = dr.GetInt32(5);
                    cliente.email = dr.GetString(6);
                    cliente.telefono = dr.GetInt64(7);
                    cliente.fotoFrenteDocumento = null;//8;
                    cliente.fotoDorsoDocumento = null;//9;                    
                    cliente.nacionalidad = nacionalidad;
                    cliente.tipoDocumento = tipoDocumento;
                    cliente.domicilio = domicilio;
                    cliente.situacionCrediticia = situacionCrediticia;
                   
                    cliente.fechaNacimiento = dr.GetDateTime(27);

                    cliente.cuentas = gestorCuenta.ObtenerCuentas(cliente.idCliente);


                }

                dr.Close();
            }

            return cliente;
        }

        public int registrarCliente(Cliente cliente)
        {
            int id = 0;
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
          
                

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = conn.CreateCommand();
                comm.CommandText="registrarCliente";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                comm.Parameters.Add(new SqlParameter("@usuario", cliente.usuario));
                comm.Parameters.Add(new SqlParameter("@passEncriptada", Encriptacion.GetSHA256(cliente.passEncriptada)));
                comm.Parameters.Add(new SqlParameter("@nombre", cliente.nombre));
                comm.Parameters.Add(new SqlParameter("@apellido", cliente.apellido));
                comm.Parameters.Add(new SqlParameter("@nroDocumento", cliente.nroDocumento));
                comm.Parameters.Add(new SqlParameter("@email", cliente.email));
                comm.Parameters.Add(new SqlParameter("@telefono", cliente.telefono));               
                // comm.Parameters.Add(new SqlParameter("@idNacionalidad", cliente.nacionalidad.idNacionalidad));
                comm.Parameters.Add(new SqlParameter("@idTipoDocumento", cliente.tipoDocumento.idTipoDocumento));
                //comm.Parameters.Add(new SqlParameter("@idDomicilio", cliente.domicilio.idDomicilio));
                comm.Parameters.Add(new SqlParameter("@idNivel", 1));
                comm.Parameters.Add(new SqlParameter("@fechaNacimiento", cliente.ObtenerFecha()));

                id = Convert.ToInt32(comm.ExecuteScalar());
                
              

                
            }
            return id;
        }

<<<<<<< HEAD
=======

        public int crearModificarDomicilio(Cliente cliente)
        {
            int boo = 0;
            if (cliente.domicilio.idDomicilio==0)
            { 
            

                string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

                using (SqlConnection conn = new SqlConnection(StrConn))
                {
                    conn.Open();

                    SqlCommand comm = conn.CreateCommand();
                
                    comm.CommandText = "crearDomicilio";
                    comm.CommandType = System.Data.CommandType.StoredProcedure;
                    //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                    comm.Parameters.Add(new SqlParameter("@idLocalidad", cliente.domicilio.localidad.idLocalidad));
                    comm.Parameters.Add(new SqlParameter("@calle", cliente.domicilio.calle));
                    comm.Parameters.Add(new SqlParameter("@barrio", cliente.domicilio.barrio));
                    comm.Parameters.Add(new SqlParameter("@codigoPostal", cliente.domicilio.codigoPostal));
                    comm.Parameters.Add(new SqlParameter("@numero", cliente.domicilio.numero));

                    boo = Convert.ToInt32(comm.ExecuteScalar());

                }            
            }
            else
            {
                boo = cliente.domicilio.idDomicilio;
                string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

                using (SqlConnection conn = new SqlConnection(StrConn))
                {
                    conn.Open();

                    SqlCommand comm = conn.CreateCommand();

                    comm.CommandText = "actualizarDomicilio";
                    comm.CommandType = System.Data.CommandType.StoredProcedure;
                    //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                    comm.Parameters.Add(new SqlParameter("@idDomicilio", cliente.domicilio.idDomicilio));
                    comm.Parameters.Add(new SqlParameter("@idLocalidad", cliente.domicilio.localidad.idLocalidad));
                    comm.Parameters.Add(new SqlParameter("@calle", cliente.domicilio.calle));
                    comm.Parameters.Add(new SqlParameter("@barrio", cliente.domicilio.barrio));
                    comm.Parameters.Add(new SqlParameter("@codigoPostal", cliente.domicilio.codigoPostal));
                    comm.Parameters.Add(new SqlParameter("@numero", cliente.domicilio.numero));
                    comm.ExecuteScalar();

                }

            }
            return boo;
        }
        public int actualizarCliente(Cliente cliente)
        {
            int boo = 0;

            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            int boo2=this.crearModificarDomicilio(cliente);
            if(boo2!=0)
            { 
            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "actualizarCliente";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                //comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                comm.Parameters.Add(new SqlParameter("@idCliente", cliente.idCliente));
                comm.Parameters.Add(new SqlParameter("@email", cliente.email));
                comm.Parameters.Add(new SqlParameter("@telefono", cliente.telefono));
                comm.Parameters.Add(new SqlParameter("@idDomicilio", boo2));

                boo = Convert.ToInt32(comm.ExecuteScalar());




            }
            }
            return boo;
        }


>>>>>>> 1fc2e7c1e34889d804a6302942e5f8254646fa54
    }
}