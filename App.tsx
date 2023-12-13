import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import './App.css'
import { Card } from './components/card/card';
import { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const { data } = useFoodData(); // Use refetch para atualizar os dados após a exclusão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    try {
      // Chame o endpoint de exclusão
      await axios.delete(`http://localhost:8080/food/${id}`);
      // Invalidate a query para buscar os dados atualizados
      queryClient.invalidateQueries(['food-data']);
    } catch (error) {
      console.error('Erro ao excluir o produto', error);
    }
  };

  return (
    <div className="container">
      <h1>Cardápio</h1>
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
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button onClick={handleOpenModal} className="btn__new">
        Novo
      </button>
    </div>
  );
}


export default App
