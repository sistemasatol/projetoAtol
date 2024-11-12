import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    MenuItem
} from '@mui/material';
import { createColaborador } from '../services/apiColaboradores'; // Importe a função de API para cadastro

const CadastroColaborador = ({ open, onClose, onCadastroSuccess }) => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipoContrato, setTipoContrato] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numDocumento, setNumDocumento] = useState('');
    const [obs, setObs] = useState('');
    const [empresaId, setEmpresaId] = useState('');
    const [funcaoId, setFuncaoId] = useState('');
    const [obraId, setObraId] = useState('');
    const [status, setStatus] = useState('');

    const [empresas, setEmpresas] = useState([]);
    const [obras, setObras] = useState([]);
    const [funcoes, setFuncoes] = useState([]);

    useEffect(() => {
        const fetchInformacoes = async () => {
            try {
                const empresasData = await getEmpresas();
                const funcoesData = await getFuncoes();
                const obrasData = await getObras();

                setEmpresas(empresasData);
                setObras(obrasData);
                setFuncoes(funcoesData);

            } catch (err) {
                console.error("Erro ao carregar dados", err);
            }
        };

        fetchInformacoes();
    }, []);

    const handleSubmit = async () => {
        try {
            const novoColaborador = {
                nome,
                sobrenome,
                telefone,
                tipo_contrato: tipoContrato,
                tipo_documento: tipoDocumento,
                numDocumento,
                obs,
                empresaId,
                funcaoId,
                obraId,
                status
            };

            await createColaborador(novoColaborador);
            onCadastroSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao cadastrar colaborador", error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: { xs: '100%', sm: 400 },
                    margin: 'auto',
                    mt: '10%',
                    padding: 3,
                    backgroundColor: 'white',
                    boxShadow: 24,
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" mb={2}>Cadastrar Novo Colaborador</Typography>

                <TextField
                    label="Nome"
                    fullWidth
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    margin="normal"
                    required
                />

                <TextField
                    label="Sobrenome"
                    fullWidth
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    margin="normal"
                    required
                />

                <TextField
                    label="Telefone"
                    fullWidth
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    margin="normal"
                    required
                />

                <TextField
                    label="Tipo de Contrato"
                    fullWidth
                    select
                    value={tipoContrato}
                    onChange={(e) => setTipoContrato(e.target.value)}
                    margin="normal"
                    required
                >
                    <MenuItem value="CLT">CLT</MenuItem>
                    <MenuItem value="PJ">PJ</MenuItem>
                    <MenuItem value="Outros">Outros</MenuItem>
                </TextField>

                <TextField
                    label="Tipo de Documento"
                    fullWidth
                    select
                    value={tipoDocumento}
                    onChange={(e) => setTipoDocumento(e.target.value)}
                    margin="normal"
                    required
                >
                    <MenuItem value="RG">RG</MenuItem>
                    <MenuItem value="CPF">CPF</MenuItem>
                </TextField>

                <TextField
                    label="Número de Documento"
                    fullWidth
                    value={numDocumento}
                    onChange={(e) => setNumDocumento(e.target.value)}
                    margin="normal"
                    required
                />

                <TextField
                    label="Observações"
                    fullWidth
                    value={obs}
                    onChange={(e) => setObs(e.target.value)}
                    margin="normal"
                />

                <TextField
                    label="Empresa"
                    fullWidth
                    select
                    value={empresaId}
                    onChange={(e) => setEmpresaId(e.target.value)}
                    margin="normal"
                    required
                >
                    {empresas.map((empresa) => {
                        return <MenuItem key={empresa.id} value={empresa.id}>{empresa.nome}</MenuItem>;
                    })}
                </TextField>

                <TextField
                    label="Função"
                    fullWidth
                    select
                    value={funcaoId}
                    onChange={(e) => setFuncaoId(e.target.value)}
                    margin="normal"
                    required
                >
                    {funcoes.map((funcao) => {
                        return <MenuItem key={funcao.id} value={funcao.id}>{funcao.nome}</MenuItem>;
                    })}
                </TextField>

                <TextField
                    label="Obra"
                    fullWidth
                    select
                    value={obraId}
                    onChange={(e) => setObraId(e.target.value)}
                    margin="normal"
                    required
                >
                    {obras.map((obra) => {
                        return <MenuItem key={obra.id} value={obra.id}>{obra.nome}</MenuItem>;
                    })}
                </TextField>

                <TextField
                    label="Status"
                    fullWidth
                    select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    margin="normal"
                    required
                >
                    <MenuItem value="Ativo">Ativo</MenuItem>
                    <MenuItem value="Inativo">Inativo</MenuItem>
                </TextField>

                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                    Salvar
                </Button>
            </Box>
        </Modal>
    );
};

export default CadastroColaborador;
