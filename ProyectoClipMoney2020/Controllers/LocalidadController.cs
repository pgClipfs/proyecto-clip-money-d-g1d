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
    [RoutePrefix("api/localidad")]
    public class LocalidadController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get(int id)
        {
            GestorDomicilio gestorCliente = new GestorDomicilio();
            List<Localidad> localidades = gestorCliente.ObtenerLocalidades(id);


            if (localidades == null)
            {
                return NotFound();  // status 404
            }
            return Ok(localidades);   // en cliente vemos response.data


        }
    }
}