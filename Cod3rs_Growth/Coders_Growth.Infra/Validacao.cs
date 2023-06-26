using Coders_Gowth.Dominio;
using Modelo_de_Dados;

namespace Coders_Growth.Infra
{
    public class Validacao
    {
        private static List<string> listaDeErros = new List<string>();
        public void ValidarCampos(Celular celular, IRepositorio repositorio)
        {
            const int valorMinimo = 0;
            listaDeErros.Clear();

            if (string.IsNullOrEmpty(celular.Marca))
            {
                listaDeErros.Add("Por favor, preencha a marca!");
            }
            if (string.IsNullOrEmpty(celular.Modelo))
            {
                listaDeErros.Add("Por favor, preencha o modelo!");
            }
            if (string.IsNullOrEmpty(celular.Cor))
            {
                listaDeErros.Add("Por favor, preencha a cor!");
            }
            if (string.IsNullOrEmpty(Convert.ToString(celular.Memoria)))
            {
                listaDeErros.Add("Por favor, preencha a memória!");
            }
            if (string.IsNullOrEmpty(Convert.ToString(celular.AnoFabricacao)))
            {
                listaDeErros.Add("Por favor, preencha o data!");
            }
            if (listaDeErros.Count > valorMinimo)
            {
                var _listaDeErros = string.Join("\n", listaDeErros);
                throw new Exception(_listaDeErros);
            }
        }
    }
}
