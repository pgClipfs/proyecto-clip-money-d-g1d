using ProyectoClipMoney2020.Models;
using ProyectoClipMoney2020.Models.Gestores;
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
    [RoutePrefix("api/pais")]
    public class PaisController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get()
        {
            GestorDomicilio gestorCliente = new GestorDomicilio();
            List<Pais> paises = gestorCliente.ObtenerPaises();


            if (paises == null)
            {
                return NotFound();  // status 404
            }
            return Ok(paises);   // en cliente vemos response.data


        }
    }
}