"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PutPage() {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);
    const [updatedComments, setUpdatedComments] = useState([]);

    const router = useRouter();

    const buscarComments = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
            setComments(response.data);
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar comentários:", error)
        } finally {
            setLoading(false);
        }
    };

    const navegarParaEditar = (commentId) => {
        router.push(`/put/${commentId}`)
    };

    const atualizarComentarioRapido = async (commentId) => {
        try {
            const comment = comments.find(c => c.id === commentId);
            const updatedData = {
                ...comment,
                body: comment.body + " [ATUALIZADO]",
                name: comment.name + " (Editado)"
            };

            await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, updatedData);
            
            // Atualiza o comentário na lista local
            setComments(comments.map(c => 
                c.id === commentId ? updatedData : c
            ));
            
            // Adiciona à lista de atualizados para mostrar feedback
            setUpdatedComments([...updatedComments, commentId]);
            
            console.log(`Comentário ${commentId} atualizado com sucesso!`);
        } catch (error) {
            setError(true);
            console.error("Erro ao atualizar comentário:", error);
        }
    };

    useEffect(() => {
        buscarComments();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#ffc107', marginBottom: '20px' }}>✏️ Atualizar Comentários</h1>

            {updatedComments.length > 0 && (
                <div style={{ 
                    backgroundColor: '#d1ecf1', 
                    padding: '15px', 
                    margin: '15px 0', 
                    borderRadius: '8px',
                    border: '1px solid #bee5eb',
                    color: '#0c5460'
                }}>
                    <p><strong>✅ Comentários atualizados com sucesso:</strong> {updatedComments.join(', ')}</p>
                </div>
            )}

            <h2 style={{ color: '#495057' }}>Lista de Comentários ({comments.length})</h2>
            
            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ fontSize: '18px' }}>🔄 Carregando comentários...</p>
                </div>
            ) : (
                <div>
                    {comments.map((comment) => (
                        <div key={comment.id} style={{ 
                            border: '1px solid #dee2e6', 
                            margin: '15px 0', 
                            padding: '20px',
                            borderRadius: '8px',
                            backgroundColor: updatedComments.includes(comment.id) ? '#e7f3ff' : '#ffffff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{ marginBottom: '15px' }}>
                                <p style={{ margin: '5px 0' }}><strong>ID:</strong> {comment.id}</p>
                                <p style={{ margin: '5px 0' }}><strong>Post ID:</strong> {comment.postId}</p>
                                <p style={{ margin: '5px 0' }}><strong>Nome:</strong> {comment.name}</p>
                                <p style={{ margin: '5px 0' }}><strong>Email:</strong> {comment.email}</p>
                                <p style={{ margin: '5px 0' }}><strong>Comentário:</strong> {comment.body}</p>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
                                <button 
                                    onClick={() => navegarParaEditar(comment.id)}
                                    style={{ 
                                        backgroundColor: '#ffc107', 
                                        color: '#212529', 
                                        padding: '10px 16px', 
                                        border: 'none', 
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        transition: 'background-color 0.3s'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
                                >
                                    ✏️ Editar Completo
                                </button>
                                
                                <button 
                                    onClick={() => atualizarComentarioRapido(comment.id)}
                                    style={{ 
                                        backgroundColor: '#17a2b8', 
                                        color: 'white', 
                                        padding: '10px 16px', 
                                        border: 'none', 
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        transition: 'background-color 0.3s'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#138496'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#17a2b8'}
                                >
                                    ⚡ Atualização Rápida
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {error && (
                <div style={{
                    backgroundColor: '#f8d7da',
                    padding: '15px',
                    margin: '15px 0',
                    borderRadius: '8px',
                    border: '1px solid #f5c6cb',
                    color: '#721c24'
                }}>
                    <p><strong>❌ Erro:</strong> Ocorreu um problema ao buscar os comentários.</p>
                </div>
            )}

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button
                    onClick={() => router.push('/')}
                    style={{
                        backgroundColor: '#6c757d',
                        color: 'white',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    🏠 Voltar ao Menu Principal
                </button>
            </div>
        </div>
    )
}