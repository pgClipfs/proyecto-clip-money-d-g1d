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
    public class TipoDocumentoController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<TipoDocumento> Get()
        {
            GestorTipoDocumento gestorTipoDocumento = new GestorTipoDocumento();
            return gestorTipoDocumento.ObtenerTiposDocumento();            

        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get(int id)
        {
            GestorTipoDocumento gestorTipoDocumento = new GestorTipoDocumento();
            TipoDocumento tipoDocumento = gestorTipoDocumento.ObtenerTipoDocumento(id);

            if (tipoDocumento == null)
            {
                return NotFound();  // status 404
            }
            return Ok(tipoDocumento);   // en cliente vemos response.data


        }
    }
}
