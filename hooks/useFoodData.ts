import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { FoodData } from '../interface/FoodData';

// URL da API para recuperar dados de alimentos
const API_URL = 'http://localhost:8080';

// Função assíncrona para buscar dados de alimentos da API
const fetchData = async (): AxiosPromise<FoodData[]> => {
    // Faz uma requisição GET para a API e retorna a resposta
    const response = axios.get(API_URL + '/food');
    return response;
}

// Hook useFoodData para encapsular a lógica de consulta de dados de alimentos
export function useFoodData(){
    // Utiliza o hook useQuery para realizar a consulta de dados
    const query = useQuery({
        queryFn: fetchData,   // Função que realiza a consulta
        queryKey: ['food-data'],  // Chave única para identificar a consulta
        retry: 2  // Número de tentativas em caso de falha
    })

    // Retorna um objeto contendo os resultados da consulta, incluindo dados (se disponíveis)
    return {
        ...query,
        data: query.data?.data  // Extrai os dados da resposta, se existirem
    }
}
