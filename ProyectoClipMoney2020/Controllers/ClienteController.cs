using ProyectoClipMoney2020.Models;
using ProyectoClipMoney2020.Models.Gestores;
using System.Web.Http;
using EnableCorsAttribute = System.Web.Http.Cors.EnableCorsAttribute;

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
            
          
            int id=0; 
            
            GestorLogin gestorLogin = new GestorLogin();            
            if(gestorLogin.ValidarLoginExistente(cliente.usuario))
            {
                GestorCliente gestorCliente = new GestorCliente();
                id = gestorCliente.registrarCliente(cliente);
                cliente.idCliente = id;
            }
            

            if(id==0)
            {
                return NotFound();
            }
            else
           
            return Ok(cliente);

        }

        //POST que admite objetos: consulta datos de cliente
        [HttpPost]
        [Route("ObtenerCliente")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult ObtenerCliente(LoginRequest loginRequest)
        {
            GestorCliente gestorCliente = new GestorCliente();

            Cliente cliente = gestorCliente.ObtenerDatosClientePorLogin(loginRequest);

            if (cliente == null)
            {
                return NotFound();  // status 404
            }
            return Ok(cliente);   // en cliente vemos response.data
        }

        // PUT: api/Cliente/5
        [HttpPut]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Put(int id, Cliente cliente)
        {
            GestorCliente gestorCliente = new GestorCliente();
            int boo = gestorCliente.actualizarCliente(cliente);
            if (boo == 0)
            {
                return NotFound();
            }
            else
                return Ok(cliente);
        }
            // DELETE: api/Cliente/5
            public void Delete(int id)
        {
        }


    }
}
