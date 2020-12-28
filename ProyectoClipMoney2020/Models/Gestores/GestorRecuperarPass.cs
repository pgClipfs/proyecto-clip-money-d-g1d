using ProyectoClipMoney2020.Models.Clases;
using ProyectoClipMoney2020.Models.Soporte;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;


namespace ProyectoClipMoney2020.Models
{
    public class GestorRecuperarPass
    {
        string codigo = RandomCode.CodigoAleatorio();
        DateTime fechaRecuperacion = DateTime.Today.AddHours(24);
        public bool ObtenerEmail(RecuperarPass recuperar)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            bool result = false;

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("SEL_email", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@email", recuperar.email));
                comm.Parameters.Add(new SqlParameter("@codigo", codigo));
                comm.Parameters.Add(new SqlParameter("@fechaRecuperacion", fechaRecuperacion));

                SqlDataReader reader = comm.ExecuteReader();

                if (reader.Read())
                {
                    recuperar.nombre = reader.GetString(1).Trim();
                    recuperar.apellido = reader.GetString(2).Trim();
                    recuperar.idCliente = reader.GetInt64(3);
                    result = true;
                    EnviarEmail(recuperar.email, recuperar.nombre, recuperar.apellido, codigo);
                }
                reader.Close();

            }
            return result;

        }


        public bool EnviarEmail(string email, string nombre, string apellido, string codigo)
        {
            bool correoEnviado = false;
            MailMessage Correo = new MailMessage("bclipmoney1d@gmail.com", email);
            Correo.Subject = ("Recuperación de contraseña - Billetera Virtual Clip Money");
            Correo.SubjectEncoding = System.Text.Encoding.UTF8;
            Correo.IsBodyHtml = false;

            // Implementar y probar
            /* https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.mailmessage.alternateviews?view=net-5.0 */

            Correo.Body = "¡Hola, " + nombre + " " + apellido + "! Usted solicitó recuperar su contraseña." + Environment.NewLine + Environment.NewLine +
             "Use el siguiente enlace para restablecer su contraseña: " + Environment.NewLine +
             "https://localhost:4200/new-password" + Environment.NewLine + Environment.NewLine +
             "Para poder realizar el cambio de su contraseña, deberá ingresar el siguiente código." + Environment.NewLine +
             "Código: " + codigo + Environment.NewLine + Environment.NewLine + 
             "En caso de no haber solicitado el cambio de su contraseña, desestime este correo y comuniquese con nuestro soporte.";
            Correo.BodyEncoding = System.Text.Encoding.UTF8;
            Correo.Priority = MailPriority.Normal;

            SmtpClient ServerEmail = new SmtpClient();
            ServerEmail.Credentials = new NetworkCredential("bclipmoney1d@gmail.com", "Mayonesa_42");
            ServerEmail.Host = "smtp.gmail.com";
            ServerEmail.Port = 587;
            ServerEmail.EnableSsl = true;
            try
            {
                ServerEmail.Send(Correo);
                Correo.Dispose();
                correoEnviado = true;
                return correoEnviado;
            }
            catch (Exception e)
            {
                Console.Write(e);
                Correo.Dispose();
                correoEnviado = false;
                return correoEnviado;
            }
        }



        public bool NewPassword(RecuperarPass actualizar)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            bool result = false;

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("UPDATE_Password", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@codigo", actualizar.cod));
                comm.Parameters.Add(new SqlParameter("@email", actualizar.email));
                comm.Parameters.Add(new SqlParameter("@password", Encriptacion.GetSHA256(actualizar.password)));

                SqlDataReader reader = comm.ExecuteReader();

                if (reader.Read())
                {
                    result = true;
                }
                reader.Close();

            }
            return result;
        }
    }

}