import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';
import { getEmpresas } from "../services/apiEmpresas";
import { getFuncoes } from "../services/apiFuncoes";
import { getObras } from '../services/apiObras';
import { updateColaborador } from '../services/apiColaboradores';

const EditarColaborador = ({ open, colaborador, onClose, onEdicaoSuccess }) => {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        telefone: '',
        tipo_contrato: '',
        tipo_documento: '',
        num_documento: '',
        obs: '',
        empresaId: '',
        funcaoId: '',
        obraId: '',
        status: '',
    });

    const [empresas, setEmpresas] = useState([]);
    const [funcoes, setFuncoes] = useState([]);
    const [obras, setObras] = useState([]);

    useEffect(() => {
        // Carregar as informações das empresas, funções e obras
        const fetchData = async () => {
            const empresasData = await getEmpresas();
            const funcoesData = await getFuncoes();
            const obrasData = await getObras();
            setEmpresas(empresasData);
            setFuncoes(funcoesData);
            setObras(obrasData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (colaborador) {
            setFormData({
                nome: colaborador.nome || '',
                sobrenome: colaborador.sobrenome || '',
                telefone: colaborador.telefone || '',
                tipo_contrato: colaborador.tipo_contrato || '',
                tipo_documento: colaborador.tipo_documento || '',
                num_documento: colaborador.num_documento || '',
                obs: colaborador.obs || '',
                empresaId: colaborador.empresaId || '',
                funcaoId: colaborador.funcaoId || '',
                obraId: colaborador.obraId || '',
                status: colaborador.status || '',
            });
        }
    }, [colaborador]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!formData.nome || !formData.sobrenome || !formData.tipo_documento || !formData.num_documento) {
            // Validação simples, você pode melhorar conforme necessário
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        try {
            // Passando ID do colaborador para a atualização
            updateColaborador(colaborador.id, formData);
            window.location.reload();
            console.log('Colaborador atualizado com os seguintes dados:', formData);
            onEdicaoSuccess(); // Fecha o modal após salvar
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar colaborador:', error);
            alert('Erro ao atualizar colaborador!');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Colaborador</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nome"
                    fullWidth
                    value={formData.nome}
                    name="nome"
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Sobrenome"
                    fullWidth
                    value={formData.sobrenome}
                    name="sobrenome"
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Telefone"
                    fullWidth
                    value={formData.telefone}
                    name="telefone"
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Tipo de Contrato"
                    fullWidth
                    select
                    value={formData.tipo_contrato}
                    name="tipo_contrato"
                    onChange={handleChange}
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
                    value={formData.tipo_documento}
                    name="tipo_documento"
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    <MenuItem value="RG">RG</MenuItem>
                    <MenuItem value="CPF">CPF</MenuItem>
                </TextField>
                <TextField
                    label="Número de Documento"
                    fullWidth
                    value={formData.num_documento}
                    name="num_documento"
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    label="Observações"
                    fullWidth
                    value={formData.obs}
                    name="obs"
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Empresa"
                    fullWidth
                    select
                    value={formData.empresaId}
                    name="empresaId"
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    {empresas.map((empresa) => (
                        <MenuItem key={empresa.id} value={empresa.id}>
                            {empresa.nome}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Função"
                    fullWidth
                    select
                    value={formData.funcaoId}
                    name="funcaoId"
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    {funcoes.map((funcao) => (
                        <MenuItem key={funcao.id} value={funcao.id}>
                            {funcao.nome}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Obra"
                    fullWidth
                    select
                    value={formData.obraId}
                    name="obraId"
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    {obras.map((obra) => (
                        <MenuItem key={obra.id} value={obra.id}>
                            {obra.nome}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Status"
                    fullWidth
                    select
                    value={formData.status}
                    name="status"
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    <MenuItem value="Ativo">Ativo</MenuItem>
                    <MenuItem value="Inativo">Inativo</MenuItem>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={handleSave} color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditarColaborador;
