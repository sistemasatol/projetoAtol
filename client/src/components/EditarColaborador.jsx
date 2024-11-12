import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditarColaborador = ({ open, colaborador, onClose, onEdicaoSuccess }) => {
    const [formData, setFormData] = useState({
        nome: '',
        num_documento: '',
        empresaNome: '',
        funcaoNome: '',
        obraNome: '',
        status: '',
    });

    useEffect(() => {
        if (colaborador) {
            setFormData({
                nome: colaborador.nome || '',
                num_documento: colaborador.num_documento || '',
                empresaNome: colaborador.empresaNome || '',
                funcaoNome: colaborador.funcaoNome || '',
                obraNome: colaborador.obraNome || '',
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
        // Implemente a lógica de atualização no backend
        // Exemplo fictício com uma função `updateColaborador`
        try {
            // await updateColaborador(formData);
            console.log('Colaborador atualizado com os seguintes dados:', formData);
            onEdicaoSuccess(); // Fecha o modal após salvar
        } catch (error) {
            console.error('Erro ao atualizar colaborador:', error);
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
                />
                <TextField
                    label="Número de Documento"
                    fullWidth
                    value={formData.num_documento}
                    name="num_documento"
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Empresa"
                    fullWidth
                    value={formData.empresaNome}
                    name="empresaNome"
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Função"
                    fullWidth
                    value={formData.funcaoNome}
                    name="funcaoNome"
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Obra"
                    fullWidth
                    value={formData.obraNome}
                    name="obraNome"
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Status"
                    fullWidth
                    value={formData.status}
                    name="status"
                    onChange={handleChange}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={handleSave} color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditarColaborador;
