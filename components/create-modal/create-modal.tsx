import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { FoodData } from '../../interface/FoodData';
import "./modal.css";

// Define a interface para as propriedades de cada input no modal
interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

// Define a interface para as propriedades do componente Modal
interface ModalProps {
    closeModal(): void
}

// Componente funcional Input para renderizar campos de input no modal
const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            {/* Rótulo do input */}
            <label>{label}</label>

            {/* Input controlado pelo estado e atualizado pela função updateValue */}
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

// Componente funcional CreateModal que exibe um modal para criar novos itens no cardápio
export function CreateModal({ closeModal }: ModalProps){
    // Estados locais para armazenar dados do novo item do cardápio
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    
    // Hook useFoodDataMutate para realizar operações de mutação dos dados do cardápio
    const { mutate, isSuccess, isLoading } = useFoodDataMutate();

    // Função chamada ao clicar no botão "postar" para submeter os dados
    const submit = () => {
        // Cria um objeto FoodData com os dados do novo item
        const foodData: FoodData = {
            title, 
            price,
            image
        }

        // Chama a função mutate para enviar os dados ao servidor
        mutate(foodData);
    }

    // Efeito que fecha o modal quando a mutação é bem-sucedida
    useEffect(() => {
        if (!isSuccess) return; // Sai se a mutação não for bem-sucedida
        closeModal(); // Chama a função para fechar o modal
    }, [isSuccess]);

    // Renderiza o componente CreateModal
    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>

                {/* Formulário contendo os campos de input */}
                <form className="input-container">
                    <Input label="Adicione um nome ao produto" value={title} updateValue={setTitle}/>
                    <Input label="Adicione um preço ao produto" value={price} updateValue={setPrice}/>
                    <Input label="Adicione um link para a imagem" value={image} updateValue={setImage}/>
                </form>

                {/* Botão de "postar" que chama a função submit */}
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'postando...' : 'postar'}
                </button>

                {/* Botão para fechar o modal */}
                <button className="btn-secondary" onClick={closeModal}>Sair</button>
            </div>
        </div>
    )
}
