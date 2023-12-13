import "./card.css";

interface CardProps {
    id: number,
    price: number,
    title: string,
    image: string,
    onDelete(id: number): void;
}

export function Card({ id, price, image, title, onDelete } : CardProps){
    const handleDelete = () => {
        // Chame a função onDelete ao clicar no botão de exclusão
        onDelete(id);
      };

    return(
        <div className="card">
            <img src={image}/>
            <h2>{title}</h2>
            <p><b>Valor:</b>{price}</p>
            <button onClick={handleDelete} className="btn-delete">
                Excluir
            </button>
        </div>
    )
}