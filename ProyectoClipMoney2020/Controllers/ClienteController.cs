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

            GestorCliente gestorCliente = new GestorCliente();
            gestorCliente.registrarCliente(cliente);                

            return CreatedAtRoute("DefaultApi", new { id = cliente.idCliente }, cliente);

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
