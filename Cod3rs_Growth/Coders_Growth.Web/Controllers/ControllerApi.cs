using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Modelo_de_Dados;
using Coders_Growth.Infra;
using Coders_Gowth.Dominio;

namespace Coders_Growth.Web.Controllers
{
    [Route("/api/celular")]
    [ApiController]
    public class ControllerApi : ControllerBase
    {
        private readonly Validacao _validarCampos = new();
        private readonly IRepositorio _repositorio;

        public ControllerApi(IRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public IActionResult BuscarTodosOsCelulares([FromQuery] string? marca)
        {
            try
            {
                var celulares = new BindingList<Celular>();
                celulares = _repositorio.ObterTodos();
                return Ok(celulares);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult BuscarCelularPorId(int id)
        {
            try
            {
                var celulares = _repositorio.ObterPorId(id);
                if (celulares == null)
                {
                    throw new Exception("Este id não existe");
                }
                return Ok(celulares);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult AdicionarCelular([FromBody, Required()] Celular celular)
        {
            try
            {
                if (celular == null)
                {
                    throw new Exception("É preciso preencher todos os campos");
                }
                _validarCampos.ValidarCampos(celular, _repositorio);
                _repositorio.Adicionar(celular);
                return Created($"celular", celular);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarCelular([FromBody, Required()] Celular celular)
        {
            try
            {
                if (celular == null)
                {
                    throw new Exception("Este celular não existe");
                }
                _validarCampos.ValidarCampos(celular, _repositorio);
                _repositorio.Atualizar(celular.Id, celular);
                return Ok(celular);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleterCelular(int id)
        {
            try
            {
                var _celular = _repositorio.ObterPorId(id);
                if (_celular == null)
                {
                    throw new Exception("Este id não existe");
                }
                _repositorio.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
