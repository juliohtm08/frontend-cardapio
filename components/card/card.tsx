import "./card.css";

// Define a interface CardProps para especificar a estrutura esperada das propriedades do componente
interface CardProps {
    id: number,
    price: number,
    title: string,
    image: string,
    // Função que será chamada ao clicar no botão de exclusão, recebe o id como parâmetro
    onDelete(id: number): void;
}

// Componente funcional Card que recebe as propriedades especificadas pela interface CardProps
export function Card({ id, price, image, title, onDelete }: CardProps) {
    // Função chamada ao clicar no botão de exclusão
    const handleDelete = () => {
        // Chama a função onDelete passando o id como parâmetro
        onDelete(id);
    };

    // Renderiza o componente Card com as informações fornecidas
    return (
        <div className="card">
            {/* Exibe a imagem associada ao card */}
            <img src={image} alt={title} />

            {/* Exibe o título do card */}
            <h2>{title}</h2>

            {/* Exibe o preço do card */}
            <p><b>Valor:</b>{price}</p>

            {/* Botão de exclusão que chama a função handleDelete ao ser clicado */}
            <button onClick={handleDelete} className="btn-delete">
                Excluir
            </button>
        </div>
    );
}
