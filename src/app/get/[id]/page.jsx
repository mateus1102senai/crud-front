"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function GetByIdPage() {
    const [loading, setLoading] = useState(false);
    const [comments, setComment] = useState([]);
    const [error,setError] = useState(false);

    const params = useParams();
    const commentId = params.id;

    const buscarComentario = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setComments(response.data);
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao buscar comentários:", error)
        } finally {
            setLoading(false);
        }
    };

    useEffect (() => {
        buscarComentario();
    }, [commentId]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>❌ Erro ao buscar comentário</div>;
    if (!comment) return <div>Nenhum comentário encontrado.</div>;

    return (
        <div>
        <h1>Comentário #{comment.id}</h1>
        <hr />
        <p>Nome: {comment.name}</p>
        <p>Email: {comment.email}</p>
        <p>Comentário: {comment.body}</p>
        </div>
    )
}