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
    [RoutePrefix("api/transacciones")]
    public class TransaccionesController : ApiController
    {

        [HttpPost]
        [Route("extraccion")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult RealizarExtraccion(Operacion operacion)
        {
            GestorTransacciones gestorTransacciones = new GestorTransacciones();
            GestorCuenta gestorCuenta = new GestorCuenta();
            Cuenta cuenta;
            cuenta = gestorCuenta.ObtenerCuentaPorCvu(operacion.cvuDesde);
            if(operacion.monto>0)
            {
                cuenta.saldo -= operacion.monto;
                if (cuenta.saldo >= 0)
                {
                    gestorTransacciones.realizarExtraccion(operacion);
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }          
            
        }

        [HttpPost]
        [Route("deposito")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult RealizarDeposito(Operacion operacion)
        {
            GestorTransacciones gestorTransacciones = new GestorTransacciones();
            
            if(operacion.monto>0)
            {
                gestorTransacciones.realizarDeposito(operacion);
                return Ok();
            }
            else
            {
                return NotFound();
            }
            
        }

    }
}