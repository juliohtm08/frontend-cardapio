import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { FoodData } from '../interface/FoodData';

// URL da API para enviar dados de alimentos
const API_URL = 'http://localhost:8080';

// Função assíncrona para enviar dados de alimentos para a API
const postData = async (data: FoodData): AxiosPromise<any> => {
    // Faz uma requisição POST para a API e retorna a resposta
    const response = axios.post(API_URL + '/food', data);
    return response;
}

// Hook useFoodDataMutate para encapsular a lógica de mutação de dados de alimentos
export function useFoodDataMutate(){
    // Obtém uma instância do query client para gerenciar o cache e as consultas
    const queryClient = useQueryClient();

    // Utiliza o hook useMutation para realizar a mutação (envio) de dados
    const mutate = useMutation({
        mutationFn: postData,  // Função que realiza a mutação
        retry: 2,  // Número de tentativas em caso de falha
        onSuccess: () => {
            // Invalida a consulta no cache para garantir que os dados sejam atualizados
            queryClient.invalidateQueries(['food-data']);
        }
    })

    // Retorna a função mutate para ser utilizada em componentes que desejam realizar a mutação
    return mutate;
}
