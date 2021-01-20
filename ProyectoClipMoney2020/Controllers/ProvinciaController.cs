using System.Web.Http.Cors;
using ProyectoClipMoney2020.Models;
using ProyectoClipMoney2020.Models.Gestores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace ProyectoClipMoney2020.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/provincia")]
    public class ProvinciaController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get(int id)
        {
            GestorDomicilio gestorCliente = new GestorDomicilio();
            List<Provincia> provincias = gestorCliente.ObtenerProvincias(id);


            if (provincias == null)
            {
                return NotFound();  // status 404
            }
            return Ok(provincias);   // en cliente vemos response.data


        }
    }
}