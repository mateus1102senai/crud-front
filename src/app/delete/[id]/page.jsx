"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";

export default function DeleteCommentPage() {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState(null);
    const [error, setError] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const router = useRouter();
    const params = useParams();
    const commentId = params.id;

    const buscarComment = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setComment(response.data);
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    const deletarComentario = async () => {
        setDeleting(true);
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setDeleted(true);
            console.log(`Comentário ${commentId} deletado com sucesso!`);
            
            // Redireciona após 3 segundos
            setTimeout(() => {
                router.push('/delete');
            }, 3000);
        } catch (error) {
            setError(true);
            console.error("Erro ao deletar comentário:", error);
        } finally {
            setDeleting(false);
        }
    };

    const voltarParaLista = () => {
        router.push('/delete');
    };

    const voltarParaMenu = () => {
        router.push('/');
    };

    useEffect(() => {
        if (commentId) {
            buscarComment();
        }
    }, [commentId]);

    if (loading) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '60px', 
                fontFamily: 'Arial, sans-serif' 
            }}>
                <h1 style={{ color: '#495057' }}>🔄 Carregando comentário...</h1>
                <p style={{ color: '#6c757d', fontSize: '16px' }}>Aguarde enquanto buscamos os detalhes...</p>
            </div>
        );
    }

    if (deleted) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '60px', 
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#d4edda',
                margin: '20px',
                borderRadius: '12px',
                border: '2px solid #c3e6cb'
            }}>
                <h1 style={{ color: '#155724', marginBottom: '20px' }}>✅ Comentário Deletado!</h1>
                <p style={{ fontSize: '18px', color: '#155724', marginBottom: '10px' }}>
                    O comentário foi removido com sucesso do sistema.
                </p>
                <p style={{ color: '#6c757d', fontSize: '16px' }}>
                    Redirecionando para a lista em alguns segundos...
                </p>
                <div style={{ marginTop: '30px' }}>
                    <button
                        onClick={() => router.push('/delete')}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginRight: '10px'
                        }}
                    >
                        📋 Ver Lista
                    </button>
                    <button
                        onClick={voltarParaMenu}
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
                        🏠 Menu Principal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            padding: '30px', 
            fontFamily: 'Arial, sans-serif',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1 style={{ 
                color: '#dc3545', 
                marginBottom: '30px',
                textAlign: 'center',
                fontSize: '32px'
            }}>
                🗑️ Confirmar Exclusão
            </h1>

            {error && (
                <div style={{
                    backgroundColor: '#f8d7da',
                    padding: '20px',
                    margin: '20px 0',
                    borderRadius: '8px',
                    border: '1px solid #f5c6cb',
                    color: '#721c24'
                }}>
                    <h3>❌ Erro encontrado</h3>
                    <p>Ocorreu um problema ao processar a solicitação. Tente novamente.</p>
                </div>
            )}

            {comment ? (
                <div>
                    <div style={{ 
                        backgroundColor: '#fff3cd', 
                        padding: '25px', 
                        margin: '20px 0', 
                        borderRadius: '10px', 
                        border: '2px solid #ffeaa7',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ color: '#856404', marginBottom: '15px' }}>
                            ⚠️ Atenção: Esta ação não pode ser desfeita!
                        </h2>
                        <p style={{ fontSize: '16px', color: '#856404' }}>
                            Tem certeza que deseja deletar permanentemente este comentário?
                        </p>
                    </div>

                    <div style={{ 
                        border: '2px solid #dee2e6', 
                        padding: '25px', 
                        margin: '20px 0', 
                        borderRadius: '10px',
                        backgroundColor: '#f8f9fa'
                    }}>
                        <h3 style={{ 
                            color: '#495057', 
                            marginBottom: '20px',
                            borderBottom: '2px solid #dee2e6',
                            paddingBottom: '10px'
                        }}>
                            📄 Detalhes do Comentário:
                        </h3>
                        
                        <div style={{ lineHeight: '1.8' }}>
                            <p style={{ margin: '10px 0', fontSize: '16px' }}>
                                <strong>🆔 ID:</strong> <span style={{ color: '#007bff' }}>{comment.id}</span>
                            </p>
                            <p style={{ margin: '10px 0', fontSize: '16px' }}>
                                <strong>📝 Post ID:</strong> <span style={{ color: '#007bff' }}>{comment.postId}</span>
                            </p>
                            <p style={{ margin: '10px 0', fontSize: '16px' }}>
                                <strong>👤 Nome:</strong> <span style={{ color: '#28a745' }}>{comment.name}</span>
                            </p>
                            <p style={{ margin: '10px 0', fontSize: '16px' }}>
                                <strong>📧 Email:</strong> <span style={{ color: '#17a2b8' }}>{comment.email}</span>
                            </p>
                            <p style={{ margin: '15px 0', fontSize: '16px' }}>
                                <strong>💬 Comentário:</strong>
                            </p>
                            <div style={{
                                backgroundColor: '#ffffff',
                                padding: '15px',
                                borderRadius: '6px',
                                border: '1px solid #dee2e6',
                                fontStyle: 'italic',
                                color: '#495057'
                            }}>
                                "{comment.body}"
                            </div>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        gap: '15px', 
                        marginTop: '30px',
                        flexWrap: 'wrap'
                    }}>
                        <button 
                            onClick={deletarComentario}
                            disabled={deleting}
                            style={{ 
                                backgroundColor: deleting ? '#6c757d' : '#dc3545', 
                                color: 'white', 
                                padding: '15px 30px', 
                                border: 'none', 
                                borderRadius: '8px',
                                cursor: deleting ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                minWidth: '180px',
                                transition: 'all 0.3s'
                            }}
                        >
                            {deleting ? '🔄 Deletando...' : '🗑️ Confirmar Exclusão'}
                        </button>
                        
                        <button 
                            onClick={voltarParaLista}
                            disabled={deleting}
                            style={{ 
                                backgroundColor: '#6c757d', 
                                color: 'white', 
                                padding: '15px 30px', 
                                border: 'none', 
                                borderRadius: '8px',
                                cursor: deleting ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                minWidth: '180px'
                            }}
                        >
                            ↩️ Cancelar
                        </button>

                        <button 
                            onClick={voltarParaMenu}
                            disabled={deleting}
                            style={{ 
                                backgroundColor: '#17a2b8', 
                                color: 'white', 
                                padding: '15px 30px', 
                                border: 'none', 
                                borderRadius: '8px',
                                cursor: deleting ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                minWidth: '180px'
                            }}
                        >
                            🏠 Menu Principal
                        </button>
                    </div>
                </div>
            ) : (
                !error && (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px',
                        backgroundColor: '#f8d7da',
                        borderRadius: '10px',
                        border: '1px solid #f5c6cb'
                    }}>
                        <h2 style={{ color: '#721c24' }}>❌ Comentário não encontrado</h2>
                        <p style={{ color: '#721c24', fontSize: '16px' }}>
                            O comentário que você está tentando deletar não existe ou já foi removido.
                        </p>
                        <button
                            onClick={voltarParaLista}
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                marginTop: '20px'
                            }}
                        >
                            📋 Voltar à Lista
                        </button>
                    </div>
                )
            )}
        </div>
    );
}