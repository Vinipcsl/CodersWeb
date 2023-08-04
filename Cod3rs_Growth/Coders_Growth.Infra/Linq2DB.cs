using Coders_Gowth.Dominio;
using LinqToDB;
using LinqToDB.Data;
using LinqToDB.DataProvider.SqlServer;
using Modelo_de_Dados;
using System.ComponentModel;
using System.Configuration;

namespace Coders_Growth.Infra
{
    public class Linq2DB : IRepositorio
    {
        private List<Celular> _listacelular = new List<Celular>();
        private BindingList<Celular> _listacelula = Singleton.Instancia();

        public void Adicionar(Celular novoCelular)
        {
            using var conexao2db = Conexao();
            novoCelular.Id = conexao2db.InsertWithInt32Identity(novoCelular);
        }

        public void Atualizar(int id, Celular novoCelular)
        {
            using var conexao2db = Conexao();
            try
            {
                novoCelular.Id = id;
                conexao2db.Update(novoCelular);
            }
            catch
            {
                throw new Exception("Erro ao atualizar");
            }
        }

        public void Deletar(int id)
        {
            using var conexao2db = Conexao();
            conexao2db.GetTable<Celular>().Delete(Celular => Celular.Id.Equals(id));
        }

        public Celular? ObterPorId(int id)
        {
            using var conexao2db = Conexao();
            return conexao2db.GetTable<Celular>().FirstOrDefault(Celular => Celular.Id.Equals(id));
        }

        public BindingList<Celular> ObterTodos()
        {
            using var conexao2db = Conexao();
            _listacelular = conexao2db.GetTable<Celular>().ToList();
            var bindlist = new BindingList<Celular>(_listacelular);
            return bindlist;
        }

        public DataConnection Conexao()
        {
            var DataConnection = ConfigurationManager.ConnectionStrings["CodersGrowth"].ConnectionString;

            return SqlServerTools.CreateDataConnection(DataConnection);
        }
    }
}
