﻿using NaPegada.Business;
using NaPegada.Web.Models;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace NaPegada.Web.Controllers
{
    [Autenticar]
    [RoutePrefix("Usuario")]
    public class UsuarioController : AsyncController
    {
        private readonly UsuarioBUS _usuarioBUS;

        public UsuarioController()
        {
            _usuarioBUS = new UsuarioBUS();
        }

        #region [ViewResult]
        [HttpGet]
        [AllowAnonymous]
        [OutputCache(Duration = 720000)]
        public async Task<ViewResult> Home()
        {
            return await Task.Run(() => View());
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Sair")]
        public async Task<ViewResult> Sair()
        {
            LogOut();
            return await Task.Run(() => View("Entrar"));
        }

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(Duration = 720000)]
        public async Task<ViewResult> MinhasDoacoes()
        {
            return await Task.Run(() => View());
        }

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(Duration = 720000)]
        public async Task<ViewResult> MeusInteresses()
        {
            return await Task.Run(() => View());
        }
        #endregion

        #region [JsonResult]
        [HttpPost]
        [AllowAnonymous]
        [Route("Entrar")]
        public async Task<ActionResult> Entrar(UsuarioViewModel usuarioVM)
        {
            if (await LogIn(usuarioVM))
            {
                return await Task.Run(() => RedirectToAction("Home"));
            }
            return await Task.Run(() => RedirectToAction("Site/Home"));
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Registrar")]
        public async Task<JsonResult> Registrar(UsuarioViewModel usuarioVM)
        {
            return await Task.Run(() => Json(_usuarioBUS.Registrar(usuarioVM.Usuario)));
        }
        #endregion

        #region [NonAction]
        [NonAction]
        private async Task<bool> LogIn(UsuarioViewModel usuarioVM)
        {
            return (await _usuarioBUS.EhUsuario(usuarioVM.Usuario) ? HttpContext.Session["napegada_auth"] = usuarioVM : null) != null;
        }

        [NonAction]
        private void LogOut()
        {
            HttpContext.Session["napegada_auth"] = null;
        }
        #endregion
    }
}