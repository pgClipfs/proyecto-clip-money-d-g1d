﻿using ProyectoClipMoney2020.Models.Soporte;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ProyectoClipMoney2020.Models
{
    public class GestorLogin
    {
        public bool ValidarLogin(LoginRequest ploginRequest)
        {
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            bool result = false;

            using (SqlConnection conn = new SqlConnection(strConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("SEL_Login", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@username", ploginRequest.Username));
                comm.Parameters.Add(new SqlParameter("@password", Encriptacion.GetSHA256(ploginRequest.Password)));

                SqlDataReader reader = comm.ExecuteReader();

                if (reader.HasRows)
                {
                    result = true;
                }
                else
                {
                    result = false;
                }

            }
            return result; 

        }

        public bool ValidarLoginExistente(string username)
        {
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            bool result = true;

            using (SqlConnection conn = new SqlConnection(strConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("BuscarLoginExistente", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@username", username));
                

                SqlDataReader reader = comm.ExecuteReader();

                if (reader.HasRows)
                {
                    result = false;
                }

            }
            return result;

        }
    }
}