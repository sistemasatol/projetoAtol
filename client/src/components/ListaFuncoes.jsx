import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteFuncao, getFuncoes } from '../services/apiFuncoes';
import CadastroFuncao from './CadastroFuncao.jsx';
import EditarFuncao from './EditarFuncao';

const ListaFuncoes = () => {
    const [funcoes, setFuncoes] = useState([]);
    const [openCadastroModal, setOpenCadastroModal] = useState(false);
    const [openEdicaoModal, setOpenEdicaoModal] = useState(false);
    const [funcaoEdicao, setFuncaoEdicao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFuncoes = async () => {
            setLoading(true);
            setError(null);
            try {
                const funcoesData = await getFuncoes();
                setFuncoes(funcoesData);
            } catch (err) {
                setError("Erro ao carregar as funções");
                console.error("Erro ao carregar dados", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFuncoes();
    }, []);

    const handleEdit = (funcao) => {
        setFuncaoEdicao(funcao);
        setOpenEdicaoModal(true);
    };

    const handleDelete = async (id) => {
        try {
            setFuncoes(funcoes.filter(funcao => funcao.id !== id));
            await deleteFuncao(id);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao excluir função:", error);
        }
    };

    const handleAddFuncao = () => {
        setOpenCadastroModal(true);
    };

    const handleCloseCadastroModal = () => {
        setOpenCadastroModal(false);
    };

    const handleCloseEdicaoModal = () => {
        setOpenEdicaoModal(false);
        setFuncaoEdicao(null);
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ width: '35%', margin: 'auto', mt: 5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Lista de Funções</Typography>
                <Button variant="contained" color="primary" onClick={handleAddFuncao}>Cadastrar Função</Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {funcoes.map((funcao) => (
                            <TableRow key={funcao.id}>
                                <TableCell>{funcao.nome}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(funcao)} sx={{ mr: 1 }}>Editar</Button>
                                    <Button variant="outlined" color="secondary" size="small" onClick={() => handleDelete(funcao.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CadastroFuncao open={openCadastroModal} onClose={handleCloseCadastroModal} onCadastroSuccess={handleCloseCadastroModal} />
            {funcaoEdicao && (
                <EditarFuncao open={openEdicaoModal} funcao={funcaoEdicao} onClose={handleCloseEdicaoModal} onEdicaoSuccess={handleCloseEdicaoModal} />
            )}
        </Box>
    );
};

export default ListaFuncoes;
