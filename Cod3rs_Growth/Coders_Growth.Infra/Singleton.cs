﻿using Modelo_de_Dados;
using System.ComponentModel;


namespace Coders_Growth.Infra
{
    public sealed class Singleton
    {

        private static BindingList<Celular> celulars;
        private static int id = 0;

        public static BindingList<Celular> Instancia()
        {
            if (celulars == null)
            {
                celulars = new BindingList<Celular>();
            }
            return celulars;
        }

        public static int IdIncremento()
        {
            id++;
            return id;
        }
    }
}
