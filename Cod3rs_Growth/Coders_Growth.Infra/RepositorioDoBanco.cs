﻿using Modelo_de_Dados;
using System.ComponentModel;
using System.Configuration;
using Microsoft.Data.SqlClient;
using System;
using System.Linq;
using Coders_Gowth.Dominio;

namespace Coders_Growth.Infra
{
    public class RepositorioDoBanco : IRepositorio
    {
        static string CadastroCelular = ConfigurationManager.ConnectionStrings["CodersGrowth"].ConnectionString;
        public BindingList<Celular> _listaCelulares = Singleton.Instancia();

        public void Adicionar(Celular novoCelular)
        {
            string sql = "INSERT INTO Celulares (Marca,Modelo,Cor,Memoria,AnoFabricado)" +
                "Values" +
                "(@Marca,@Modelo,@Cor,@Memoria,@AnoFabricado)";

            using (SqlConnection connection = new SqlConnection(CadastroCelular))
            {
                connection.Open();

                using (SqlCommand command = new(sql, connection))
                {
                    command.Parameters.AddWithValue("@Marca", novoCelular.Marca);
                    command.Parameters.AddWithValue("@Modelo", novoCelular.Modelo);
                    command.Parameters.AddWithValue("@Cor", novoCelular.Cor);
                    command.Parameters.AddWithValue("@Memoria", novoCelular.Memoria);
                    command.Parameters.AddWithValue("@AnoFabricado", novoCelular.AnoFabricacao);
                    command.ExecuteNonQuery();
                }
            }
        }

        public void Atualizar(int id, Celular novoCelular)
        {
            string sql = $"Update Celulares Set Marca='{novoCelular.Marca}', Modelo='{novoCelular.Modelo}', Cor='{novoCelular.Cor}', Memoria='{novoCelular.Memoria}', AnoFabricado='{novoCelular.AnoFabricacao}' Where Id='{novoCelular.Id}'";

            using (SqlConnection connection = new SqlConnection(CadastroCelular))
            {
                connection.Open();
                SqlCommand command = new(sql, connection);
                command.ExecuteNonQuery();
            }
        }

        public void Deletar(int id)
        {
            string sql = $"delete from Celulares where Id = {id}";
            using (SqlConnection connection = new SqlConnection(CadastroCelular))
            {
                connection.Open();
                SqlCommand command = new SqlCommand(sql, connection);
                command.ExecuteNonQuery();
            }
        }

        public Celular? ObterPorId(int id)
        {
            Celular celular = new();

            string sql = $"Select * from Celulares where id{id}";

            using (SqlConnection connection = new SqlConnection(CadastroCelular))
            {
                connection.Open();
                SqlCommand command = new(sql, connection);
                SqlDataReader read = command.ExecuteReader();
                _listaCelulares.Clear();

                while (read.Read())
                {
                    Celular celularId = new()
                    {
                        Id = (int)read.GetInt64(0),
                        Marca = read.GetString(1),
                        Modelo = read.GetString(2),
                        Cor = read.GetString(3),
                        Memoria = read.GetInt32(4),
                        AnoFabricacao = read.GetDateTime(5),
                    };
                    celular = celularId;
                }
            }
            return celular;
        }

        public BindingList<Celular> ObterTodos()
        {
            Celular celular = new();

            string sql = "Select * from Celulares";

            using (SqlConnection connection = new SqlConnection(CadastroCelular))
            {
                connection.Open();
                SqlCommand command = new(sql, connection);
                SqlDataReader read = command.ExecuteReader();
                _listaCelulares.Clear();
                while (read.Read())
                {
                    celular = new()
                    {
                        Id = (int)read.GetInt64(0),
                        Marca = read.GetString(1),
                        Modelo = read.GetString(2),
                        Cor = read.GetString(3),
                        Memoria = read.GetInt32(4),
                        AnoFabricacao = read.GetDateTime(5),
                    };
                    _listaCelulares.Add(celular);
                }
            }
            return _listaCelulares;
        }
    }
}
