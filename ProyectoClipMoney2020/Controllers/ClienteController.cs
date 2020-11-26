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
    [RoutePrefix("api/cliente")]
    public class ClienteController : ApiController
    {
        //[Authorize]
        // GET: api/Cliente
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get()
        {
            
                return NotFound();  // status 404
            
        }
      
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get(long id)
        {
            GestorCliente gestorCliente = new GestorCliente();
            Cliente cliente = gestorCliente.ObtenerDatosClientePorid(id);
            
            if (cliente == null)
            {
                return NotFound();  // status 404
            }
            return Ok(cliente);   // en cliente vemos response.data
                    

        }

        // POST: api/Cliente
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PostCliente(Cliente cliente)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            int id;
            GestorCliente gestorCliente = new GestorCliente();
            id=gestorCliente.registrarCliente(cliente);
            cliente.idCliente = id;

            if(id==0)
            {
                return NotFound();
            }
            else
            return Ok(cliente);

        }
        

        // PUT: api/Cliente/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Cliente/5
        public void Delete(int id)
        {
        }
    }
}
