import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import './App.css'
import { Card } from './components/card/card';
import { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';

// Função principal do componente App
function App() {
  // Usa o hook useFoodData para obter dados do cardápio
  const { data } = useFoodData(); // Use refetch para atualizar os dados após a exclusão
  
  // Estado local para controlar a abertura/fechamento do modal de criação
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtém uma instância do query client para gerenciar o cache e as consultas
  const queryClient = useQueryClient();

  // Função para abrir/fechar o modal de criação
  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Função para lidar com a exclusão de um item do cardápio
  const handleDelete = async (id: number) => {
    try {
      // Chama o endpoint de exclusão
      await axios.delete(`http://localhost:8080/food/${id}`);
      // Invalida a query para buscar os dados atualizados
      queryClient.invalidateQueries(['food-data']);
    } catch (error) {
      console.error('Erro ao excluir o produto', error);
    }
  };

  // Renderiza o componente App
  return (
    <div className="container">
      <h1>Cardápio</h1>
      
      {/* Renderiza os cards com base nos dados do cardápio */}
      <div className="card-grid">
        {data?.map((foodData) => (
          <Card
            key={foodData.id}
            id={foodData.id} // Passe o id como propriedade
            price={foodData.price}
            title={foodData.title}
            image={foodData.image}
            onDelete={handleDelete} // Passe a função de exclusão
          />
        ))}
      </div>
      
      {/* Renderiza o modal de criação se isModalOpen for verdadeiro */}
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      
      {/* Botão para abrir o modal de criação */}
      <button onClick={handleOpenModal} className="btn__new">
        Novo
      </button>
    </div>
  );
}

// Exporta o componente App como o componente padrão do módulo
export default App;
