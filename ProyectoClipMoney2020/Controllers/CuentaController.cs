using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Routing;
using ProyectoClipMoney2020.Models;

namespace ProyectoClipMoney2020.Controllers
{
    //[Authorize]
    [RoutePrefix("api/cuenta")]
    public class CuentaController : ApiController
    {
        // GET: api/Cuenta
        public IEnumerable<Cuenta> Get()
        {
            GestorCuenta gCuenta = new GestorCuenta();
            return gCuenta.ObtenerCuentas();
        }

        // GET: api/Cuenta/5
        public Cuenta Get(long cvu)
        {
            GestorCuenta gCuenta = new GestorCuenta();
            return gCuenta.ObtenerCuentaPorCvu(cvu);
        }

        // POST: api/Cuenta
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Cuenta/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Cuenta/5
        public void Delete(int id)
        {
        }
    }
}
