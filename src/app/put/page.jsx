"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Edit() {
    const [commentID, setCommentID] = useState("");
    const [form, setForm] = useState({})
    const [loading, setloading] = useState(false);
    const[error, setError] = useState(false);
    const {success, setSuccess} = useState(false);

    const buscarComentario = async () => {
        setloading(true);
        try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentID}`);
            setForm({name: data.name, email: data.email, body: data.body });
        } catch (error) {
            setError(true); 
        } finally {
            setloading(false)
        }
    }

    const editarComentario = async () => {
        setloading(true);
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentID}`, form);
            setSuccess(true);
        } catch (error) {
            setError(true);
        } finally {
            setloading(false)
        }
    };

    return (
        <div>
            <h1>Editar Comentário</h1>

            <div>
            <input
                type="number"
                value={commentID}
                onChange={(e) => setCommentID(e.target.value)}
                placeholder="ID de Comentário"
                />
                <button onClick={buscarComentario} disabled={loading}>
                    {loading ? "Buscando ..." : "buscar Comentário"}
                </button>
        </div>

        {form.name && (
            <div>
                <h2>Editar Detalhes do Comentário</h2>
                <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value})}
                placeholder="Escreva o seu nome aqui"
                />
                <br />
                <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value})}
                placeholder="Escreva o seu email aqui"
                />
                <br />
                <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value})}
                placeholder="Escreva o seu comentário aqui"
                rows="3"
                />
                <br />
                <button onClick={editarComentario} disabled={loading || !form.name?.trim()}>
                    {loading ? "Salvando ... " : "Salvar Alterações"}
                </button>

                </div>
        )}

        {error && <p>Erro na operação</p>}
        success && <p>Comentário editado com sucesso</p>
        </div>
    );
}