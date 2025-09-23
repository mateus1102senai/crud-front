"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function GetPage() {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [error,setError] = useState(false);

    const router = useRouter();

    const buscarComments = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
            setComments(response.data);
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar comentarios:", error)
        } finally {
            setLoading(false);
        }
    };

    const navegarParaComentario =(commentId) => {
        router.push(`/get/${commentId}`)
    };

    useEffect (() => {
        buscarComments();
    }, []);

    return (
        <div>
            <h1>Lista de Comentários</h1>

            <h2>Comentários ({comments.lenght})</h2>
            {loading ? (
                <p>Carregando comentários...</p>
            ) : (
                <ul>
                    {comments.map((comment) => (
                        <li
                            key={comment.id}
                        onClick={() => navegarParaComentario(comment.id)}>
                            <hr />
                            <p>ID: {comment.id} </p>
                            <p>Nome: {comment.name} </p>
                            <p>Email: {comment.email}</p>
                            <p>Comentário: {comment.body}</p>
                        </li>
                        
                    ))}
                </ul>
            )}
            {error &&  <p> Ocorreu um erro ao buscar os comentários.</p>}
        </div>
    )
}