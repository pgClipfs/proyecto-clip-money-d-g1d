using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models.Gestores
{
    public class GestorDomicilio
    {
        public List<Pais> ObtenerPaises()
        {
            var paises = new List<Pais>();
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();
                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "obtenerPaises";
                comm.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader dr = comm.ExecuteReader();

                while (dr.Read())
                {
                    var pais = new Pais();
                   
                    pais.idPais = dr.GetInt32(0);
                    pais.nombrePais = dr.GetString(1);

                    paises.Add(pais);
                }
                dr.Close();
            }
            return paises;
        }


        public List<Provincia> ObtenerProvincias(int idPais)
        {
            var provincias = new List<Provincia>();
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();
                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "obtenerProvincias";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@idPais", idPais));

                SqlDataReader dr = comm.ExecuteReader();

                while (dr.Read())
                {
                    var provincia = new Provincia();

                    provincia.idProvincia = dr.GetInt32(0);
                    provincia.nombreProvincia = dr.GetString(1);
                    var pais = new Pais()
                    {
                        idPais = dr.GetInt32(2),
                        nombrePais = dr.GetString(3)
                    };
                    provincia.pais = pais;

                    provincias.Add(provincia);
                }
                dr.Close();
            }
            return provincias;
        }


        public List<Localidad> ObtenerLocalidades(int idProvincia)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            var localidades = new List<Localidad>();
            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("obtenerLocalidades", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@idProvincia", idProvincia));
                
                

                SqlDataReader dr = comm.ExecuteReader();

                while (dr.Read())
                {
                    var localidad = new Localidad();
                    localidad.idLocalidad=dr.GetInt64(0);
                    localidad.nombreLocalidad= dr.GetString(1);
                    localidad.codigoPostal= dr.GetString(2);
                    var pais = new Pais()
                    {
                        idPais = dr.GetInt32(3),
                        nombrePais = dr.GetString(4)
                    };
                    var provincia = new Provincia()
                    {
                        idProvincia = dr.GetInt32(5),
                        nombreProvincia = dr.GetString(6),
                        pais = pais

                    };
                    localidad.provincia = provincia;

                    localidades.Add(localidad);
                }
                return localidades;
            }


        }

    }
}