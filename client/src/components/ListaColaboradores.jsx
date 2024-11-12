import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getColaboradores } from '../services/apiColaboradores';
import { getEmpresas } from '../services/apiEmpresas';
import { getFuncoes } from '../services/apiFuncoes';
import { getObras } from '../services/apiObras';
import CadastroColaborador from './CadastroColaborador';
import EditarColaborador from './EditarColaborador';

const ListaColaboradores = () => {
    const [colaboradores, setColaboradores] = useState([]);
    const [openCadastroModal, setOpenCadastroModal] = useState(false);
    const [openEdicaoModal, setOpenEdicaoModal] = useState(false);
    const [colaboradorEdicao, setColaboradorEdicao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInformacoes = async () => {
            setLoading(true); // Começa o loading
            setError(null); // Limpa qualquer erro anterior
            try {
                const colaboradoresData = await getColaboradores();
                const empresasData = await getEmpresas();
                const funcoesData = await getFuncoes();
                const obrasData = await getObras();

                const colaboradoresComInfos = colaboradoresData.map((colaborador) => {
                    const obra = obrasData.find((obra) => obra.id === colaborador.obraId);
                    const empresa = empresasData.find((empresa) => empresa.id === colaborador.empresaId);
                    const funcao = funcoesData.find((funcao) => funcao.id === colaborador.funcaoId);

                    return {
                        ...colaborador,
                        obraNome: obra ? obra.nome : 'Obra não encontrada',
                        empresaNome: empresa ? empresa.nome : 'Empresa não encontrada',
                        funcaoNome: funcao ? funcao.nome : 'Função não encontrada',
                    };
                });

                setColaboradores(colaboradoresComInfos);
            } catch (err) {
                setError("Erro ao carregar os dados");
                console.error("Erro ao carregar dados", err);
            } finally {
                setLoading(false); // Finaliza o loading
            }
        };

        fetchInformacoes();
    }, []);

    const handleEdit = (colaborador) => {
        setColaboradorEdicao(colaborador); // Define o colaborador para editar
        setOpenEdicaoModal(true); // Abre o modal de edição
    };

    const handleDelete = async (id) => {
        // Exemplo de lógica para deletar um colaborador
        try {
            // Exemplo de requisição para excluir colaborador
            // await deleteColaborador(id);
            setColaboradores(colaboradores.filter(colaborador => colaborador.id !== id)); // Atualiza o estado
            console.log(`Colaborador com ID ${id} excluído.`);
        } catch (error) {
            console.error("Erro ao excluir colaborador:", error);
        }
    };

    const handleAddColaborador = () => {
        setOpenCadastroModal(true); // Abre o modal de cadastro
    };

    const handleCloseCadastroModal = () => {
        setOpenCadastroModal(false);
    };

    const handleCloseEdicaoModal = () => {
        setOpenEdicaoModal(false); // Fecha o modal de edição
        setColaboradorEdicao(null); // Limpa as informações do colaborador editado
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ width: '35%', margin: 'auto', mt: 5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Lista de Colaboradores</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddColaborador}
                >
                    Cadastrar Colaborador
                </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Número de Documento</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Empresa</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Função</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Obra</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {colaboradores.map((colaborador) => (
                            <TableRow key={colaborador.id}>
                                <TableCell>{colaborador.nome}</TableCell>
                                <TableCell>{colaborador.num_documento}</TableCell>
                                <TableCell>{colaborador.empresaNome}</TableCell>
                                <TableCell>{colaborador.funcaoNome}</TableCell>
                                <TableCell>{colaborador.obraNome}</TableCell>
                                <TableCell>{colaborador.status}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(colaborador)} // Passa o colaborador para edição
                                        sx={{ mr: 1 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleDelete(colaborador.id)}
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
            <CadastroColaborador
                open={openCadastroModal}
                onClose={handleCloseCadastroModal}
                onCadastroSuccess={handleCloseCadastroModal}
            />

            {/* Modal de Edição */}
            {colaboradorEdicao && (
                <EditarColaborador
                    open={openEdicaoModal}
                    colaborador={colaboradorEdicao}
                    onClose={handleCloseEdicaoModal}
                    onEdicaoSuccess={handleCloseEdicaoModal}
                />
            )}
        </Box>
    );
};

export default ListaColaboradores;
