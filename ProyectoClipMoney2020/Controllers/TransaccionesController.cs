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

        
        //[Route("verificarCvuHasta")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get(long id)
        {

            GestorCuenta gestorCuenta = new GestorCuenta();
            Cuenta cuenta;
            //Cuenta cuentaHasta;
            
            var str = new String('0', 22 - id.ToString().Length);
            str += id;
            cuenta = gestorCuenta.ObtenerCuentaPorCvu(str);
            if (cuenta == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(cuenta);
            }
            //cuentaHasta = gestorCuenta.ObtenerCuentaPorCvu(operacion.cvuHasta);

        }
       

        [HttpPost]
        [Route("extraccion")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult RealizarExtraccion(Operacion operacion)
        {
            GestorTransacciones gestorTransacciones = new GestorTransacciones();
            GestorCuenta gestorCuenta = new GestorCuenta();
            Cuenta cuenta;
            cuenta = gestorCuenta.ObtenerCuentaPorCvu(operacion.cvuDesde);
            if (operacion.monto > 0)
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

            if (operacion.monto > 0)
            {
                gestorTransacciones.realizarDeposito(operacion);
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }


        [HttpPost]
        [Route("ultimos-mov")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult PostOperaciones(Operacion op)
        {
            if (op.cvuDesde == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest); //error 400
            GestorTransacciones gOperacion = new GestorTransacciones();
            if (gOperacion.ultimosDiezMovimientos(op) == null)
            {
                return NotFound(); //error 400
            }
            else
            {
                return Ok(gOperacion.ultimosDiezMovimientos(op));
            }
        }

        [HttpPost]
        [Route("giro")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult RealizarGiro(Operacion operacion)
        {
            GestorTransacciones gestorTransacciones = new GestorTransacciones();
            GestorCuenta gestorCuenta = new GestorCuenta();
            Cuenta cuenta;
            cuenta = gestorCuenta.ObtenerCuentaPorCvu(operacion.cvuDesde);
            if (operacion.monto > 0)
            {
                var limite = Decimal.Multiply(1.1m, cuenta.saldo);
                if (operacion.monto > limite)
                {
                    return NotFound();
                }
                else
                {
                    gestorTransacciones.realizarGiro(operacion);
                    return Ok(operacion);
                }
            }
            else
            {
                return NotFound();
            }
               

        }
       

    }
}

