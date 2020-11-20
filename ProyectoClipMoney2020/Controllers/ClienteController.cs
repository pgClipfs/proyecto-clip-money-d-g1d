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
    //[Authorize]
    [RoutePrefix("api/Cliente")]
    public class ClienteController : ApiController
    {

        // GET: api/Cliente
        public IHttpActionResult Get()
        {
            
                return Ok("get Falso");  // status 404
            
        }

        // GET: api/Cliente/5
        [HttpGet]
        public IHttpActionResult Get(long idCliente)
        {
            GestorCliente gestorCliente = new GestorCliente();
            Cliente cliente = gestorCliente.ObtenerDatosClientePorid(idCliente);
            
            if (cliente == null)
            {
                return NotFound();  // status 404
            }
            return Ok(cliente);   // en cliente vemos response.data
                    
           
        }

        // POST: api/Cliente
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
