// Define a interface FoodData para representar os dados relacionados a alimentos
export interface FoodData {
    id?: number;        // Opcional: ID único do alimento
    title: string;      // Nome ou título do alimento
    image: string;      // URL ou caminho para a imagem do alimento
    price: number;      // Preço do alimento
}
