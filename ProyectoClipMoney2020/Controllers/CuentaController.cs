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
        //FALTA CORS Y MAS
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get(long id)
        {
            GestorCuenta gestorCuenta = new GestorCuenta();
            Cuenta cuenta = gestorCuenta.ObtenerCuentaPesosPorIdCliente(id);

            if (cuenta == null)
            {
                return NotFound();  // status 404
            }
            return Ok(cuenta);   // en cliente vemos response.data


        }
        
        // POST: api/Cuenta
        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PostCuenta(Cuenta cuenta)
        {
            int id = 0;
            GestorCuenta gestorCuenta = new GestorCuenta();
        
            if (gestorCuenta.ValidarCuentaExistente(cuenta.idCliente))
            {
                GestorCliente gestorCliente = new GestorCliente();
                id = gestorCuenta.CrearCuenta(cuenta.idCliente);               
            }


            if (id == 0)
            {
                return NotFound();
            }
            else

                return Ok(cuenta.idCliente);

        }

        // PUT: api/Cuenta/5  
        [HttpPut]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PutAlias(int id, Cuenta cuenta)
        {
            GestorCuenta gestorCuenta = new GestorCuenta();
            int boo = gestorCuenta.ActualizarCuenta(id, cuenta);
            if (boo == 0)
            {
                return NotFound();
            }
            else
                return Ok(cuenta);
        }
      
        // DELETE: api/Cuenta/5
        public void Delete(int id)
        {
        }
    }
}