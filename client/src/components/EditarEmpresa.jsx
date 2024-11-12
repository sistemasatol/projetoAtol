import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { updateEmpresa } from '../services/apiEmpresas';

const EditarEmpresa = ({ open, empresa, onClose, onEdicaoSuccess }) => {
    const [formData, setFormData] = useState({
        nome: '',
        cnpj: '',
        telefone: '',
    });

    useEffect(() => {
        if (empresa) {
            setFormData({
                nome: empresa.nome || '',
                cnpj: empresa.cnpj || '',
                telefone: empresa.telefone || '',
            });
        }
    }, [empresa]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!formData.nome || !formData.cnpj || !formData.telefone) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        try {
            await updateEmpresa(empresa.id, formData);
            window.location.reload();
            onEdicaoSuccess();
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
            alert('Erro ao atualizar empresa!');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Empresa</DialogTitle>
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
                    label="CNPJ"
                    fullWidth
                    value={formData.cnpj}
                    name="cnpj"
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={handleSave} color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditarEmpresa;
