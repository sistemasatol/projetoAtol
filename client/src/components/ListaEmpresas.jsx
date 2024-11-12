import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteEmpresa, getEmpresas } from '../services/apiEmpresas';
import CadastroEmpresa from './CadastroEmpresa.jsx';
import EditarEmpresa from './EditarEmpresa';

const ListaEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [openCadastroModal, setOpenCadastroModal] = useState(false);
    const [openEdicaoModal, setOpenEdicaoModal] = useState(false);
    const [empresaEdicao, setEmpresaEdicao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmpresas = async () => {
            setLoading(true);
            setError(null);
            try {
                const empresasData = await getEmpresas();
                setEmpresas(empresasData);
            } catch (err) {
                setError("Erro ao carregar os dados das empresas");
                console.error("Erro ao carregar dados", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmpresas();
    }, []);

    const handleEdit = (empresa) => {
        setEmpresaEdicao(empresa);
        setOpenEdicaoModal(true);
    };

    const handleDelete = async (id) => {
        try {
            
            setEmpresas(empresas.filter(empresa => empresa.id !== id));
            await deleteEmpresa(id);
            console.log(`Empresa excluída.`);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao excluir empresa:", error);
        }
    };

    const handleAddEmpresa = () => {
        setOpenCadastroModal(true);
    };

    const handleCloseCadastroModal = () => {
        setOpenCadastroModal(false);
    };

    const handleCloseEdicaoModal = () => {
        setOpenEdicaoModal(false);
        setEmpresaEdicao(null);
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ width: '35%', margin: 'auto', mt: 5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Lista de Empresas</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddEmpresa}
                >
                    Cadastrar Empresa
                </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CNPJ</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Telefone</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {empresas.map((empresa) => (
                            <TableRow key={empresa.id}>
                                <TableCell>{empresa.nome}</TableCell>
                                <TableCell>{empresa.cnpj}</TableCell>
                                <TableCell>{empresa.telefone}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(empresa)}
                                        sx={{ mr: 1 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleDelete(empresa.id)}
                                    >
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal de Cadastro */}
            <CadastroEmpresa
                open={openCadastroModal}
                onClose={handleCloseCadastroModal}
                onCadastroSuccess={handleCloseCadastroModal}
            />

            {/* Modal de Edição */}
            {empresaEdicao && (
                <EditarEmpresa
                    open={openEdicaoModal}
                    empresa={empresaEdicao}
                    onClose={handleCloseEdicaoModal}
                    onEdicaoSuccess={handleCloseEdicaoModal}
                />
            )}
        </Box>
    );
};

export default ListaEmpresas;
