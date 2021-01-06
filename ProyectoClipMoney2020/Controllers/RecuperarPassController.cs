using ProyectoClipMoney2020.Models;
using ProyectoClipMoney2020.Models.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;


namespace ProyectoClipMoney2020.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/recuperarPass")]
    public class RecuperarPassController : ApiController
    {
        // GET: api/RecuperarPass
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get()
        {
           return NotFound();  // status 404
        }

        // GET: api/RecuperarPass/5
        /*[EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get()
        {
           
        }*/

        // POST: api/RecuperarPass
        [HttpPost]
        // [Route("email")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PostRecuperarPass(RecuperarPass recuperarPass)
        {
            if (recuperarPass.email == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            GestorRecuperarPass gestorRecuperarPass = new GestorRecuperarPass();

            if (!gestorRecuperarPass.ObtenerEmail(recuperarPass))
            {
                return NotFound();  // status 404   
            }
            else
            {
                return Ok(recuperarPass);
            }

        }


        // PUT: api/RecuperarPass/5
        [HttpPut]
        [Route("newPass")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Put(RecuperarPass actualizarPass)
        {
            if (actualizarPass.cod == null || actualizarPass.password == null || actualizarPass.email == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            GestorRecuperarPass gestorRecuperarPass = new GestorRecuperarPass();

            if (!gestorRecuperarPass.NewPassword(actualizarPass))
            {
                return NotFound();  // status 404
            }
            else
            {
                return Ok(actualizarPass);
            }
        }

        // DELETE: api/RecuperarPass/5
        public void Delete(int id)
        {
        }
    }
}
