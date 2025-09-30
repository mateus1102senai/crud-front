"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";

export default function EditCommentPage() {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [comment, setComment] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: ""
    });

    const router = useRouter();
    const params = useParams();
    const commentId = params.id;

    const buscarComment = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            const commentData = response.data;
            setComment(commentData);
            
            // Preenche o formulário com os dados atuais
            setForm({
                name: commentData.name,
                email: commentData.email,
                body: commentData.body
            });
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const salvarAlteracoes = async (e) => {
        e.preventDefault();
        
        if (!form.name.trim() || !form.email.trim() || !form.body.trim()) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        setSaving(true);
        setError(false);
        
        try {
            const updatedData = {
                ...comment,
                name: form.name.trim(),
                email: form.email.trim(),
                body: form.body.trim()
            };

            await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, updatedData);
            
            setSuccess(true);
            console.log(`Comentário ${commentId} atualizado com sucesso!`);
            
            // Redireciona após 2 segundos
            setTimeout(() => {
                router.push('/put');
            }, 2000);
        } catch (error) {
            setError(true);
            console.error("Erro ao atualizar comentário:", error);
        } finally {
            setSaving(false);
        }
    };

    const voltarParaLista = () => {
        router.push('/put');
    };

    const voltarParaMenu = () => {
        router.push('/');
    };

    const resetarFormulario = () => {
        if (comment) {
            setForm({
                name: comment.name,
                email: comment.email,
                body: comment.body
            });
        }
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
                <p style={{ color: '#6c757d', fontSize: '16px' }}>Aguarde enquanto buscamos os dados...</p>
            </div>
        );
    }

    if (success) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '60px', 
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#d1ecf1',
                margin: '20px',
                borderRadius: '12px',
                border: '2px solid #bee5eb'
            }}>
                <h1 style={{ color: '#0c5460', marginBottom: '20px' }}>✅ Comentário Atualizado!</h1>
                <p style={{ fontSize: '18px', color: '#0c5460', marginBottom: '10px' }}>
                    As alterações foram salvas com sucesso.
                </p>
                <p style={{ color: '#6c757d', fontSize: '16px' }}>
                    Redirecionando para a lista em alguns segundos...
                </p>
                <div style={{ marginTop: '30px' }}>
                    <button
                        onClick={() => router.push('/put')}
                        style={{
                            backgroundColor: '#17a2b8',
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
                color: '#ffc107', 
                marginBottom: '30px',
                textAlign: 'center',
                fontSize: '32px'
            }}>
                ✏️ Editar Comentário
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
                    <p>Ocorreu um problema ao atualizar o comentário. Tente novamente.</p>
                </div>
            )}

            {comment ? (
                <div>
                    {/* Informações originais */}
                    <div style={{ 
                        backgroundColor: '#e2e3e5', 
                        padding: '20px', 
                        margin: '20px 0', 
                        borderRadius: '8px',
                        border: '1px solid #ced4da'
                    }}>
                        <h3 style={{ color: '#495057', marginBottom: '15px' }}>
                            📄 Dados Originais:
                        </h3>
                        <p><strong>ID:</strong> {comment.id}</p>
                        <p><strong>Post ID:</strong> {comment.postId}</p>
                        <p><strong>Nome Original:</strong> {comment.name}</p>
                        <p><strong>Email Original:</strong> {comment.email}</p>
                        <p><strong>Comentário Original:</strong> "{comment.body}"</p>
                    </div>

                    {/* Formulário de edição */}
                    <form onSubmit={salvarAlteracoes} style={{
                        backgroundColor: '#f8f9fa',
                        padding: '25px',
                        borderRadius: '10px',
                        border: '1px solid #dee2e6'
                    }}>
                        <h3 style={{ color: '#495057', marginBottom: '20px' }}>
                            ✏️ Editar Informações:
                        </h3>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px', 
                                fontWeight: 'bold',
                                color: '#495057'
                            }}>
                                👤 Nome:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={atualizarForm}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #ced4da',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    fontFamily: 'Arial, sans-serif'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#ffc107'}
                                onBlur={(e) => e.target.style.borderColor = '#ced4da'}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px', 
                                fontWeight: 'bold',
                                color: '#495057'
                            }}>
                                📧 Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={atualizarForm}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #ced4da',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    fontFamily: 'Arial, sans-serif'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#ffc107'}
                                onBlur={(e) => e.target.style.borderColor = '#ced4da'}
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '8px', 
                                fontWeight: 'bold',
                                color: '#495057'
                            }}>
                                💬 Comentário:
                            </label>
                            <textarea
                                name="body"
                                value={form.body}
                                onChange={atualizarForm}
                                required
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #ced4da',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    fontFamily: 'Arial, sans-serif',
                                    resize: 'vertical'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#ffc107'}
                                onBlur={(e) => e.target.style.borderColor = '#ced4da'}
                            />
                        </div>

                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center',
                            gap: '15px', 
                            marginTop: '30px',
                            flexWrap: 'wrap'
                        }}>
                            <button 
                                type="submit"
                                disabled={saving}
                                style={{ 
                                    backgroundColor: saving ? '#6c757d' : '#28a745', 
                                    color: 'white', 
                                    padding: '15px 30px', 
                                    border: 'none', 
                                    borderRadius: '8px',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    minWidth: '180px'
                                }}
                            >
                                {saving ? '🔄 Salvando...' : '💾 Salvar Alterações'}
                            </button>
                            
                            <button 
                                type="button"
                                onClick={resetarFormulario}
                                disabled={saving}
                                style={{ 
                                    backgroundColor: '#ffc107', 
                                    color: '#212529', 
                                    padding: '15px 30px', 
                                    border: 'none', 
                                    borderRadius: '8px',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    minWidth: '180px'
                                }}
                            >
                                🔄 Resetar
                            </button>

                            <button 
                                type="button"
                                onClick={voltarParaLista}
                                disabled={saving}
                                style={{ 
                                    backgroundColor: '#6c757d', 
                                    color: 'white', 
                                    padding: '15px 30px', 
                                    border: 'none', 
                                    borderRadius: '8px',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    minWidth: '180px'
                                }}
                            >
                                ↩️ Cancelar
                            </button>
                        </div>
                    </form>
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
                            O comentário que você está tentando editar não existe.
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