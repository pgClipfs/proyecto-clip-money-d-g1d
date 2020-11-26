using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models.Gestores
{
    public class GestorTipoDocumento
    {
        public List<TipoDocumento> ObtenerTiposDocumento()
        {
            var tiposDocumento = new List<TipoDocumento>();                        
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();
                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "obtenerTiposDocumento";
                comm.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader dr = comm.ExecuteReader();

                while (dr.Read())
                {
                    var tipoDocumento = new TipoDocumento();
                    tipoDocumento.idTipoDocumento = Convert.ToInt32(dr.GetValue(0));
                    tipoDocumento.nombreTipoDocumento = dr.GetString(1);
                    
                   

                    tiposDocumento.Add(tipoDocumento);
                }
                dr.Close();
            }
            return tiposDocumento;


        }

        public TipoDocumento ObtenerTipoDocumento(int idTipoDocumento)
        {
            TipoDocumento tipoDocumento = null;
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("ObtenerTipoDocumento", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@idTipoDocumento", idTipoDocumento));

                SqlDataReader dr = comm.ExecuteReader();
                if (dr.Read())
                {
                    tipoDocumento = new TipoDocumento();
                    tipoDocumento.idTipoDocumento = idTipoDocumento;
                    tipoDocumento.nombreTipoDocumento = dr.GetString(0);

                }

                dr.Close();
            }
            return tipoDocumento;       
            
        }
    }
}