import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { updateFuncao } from '../services/apiFuncoes';

const EditarFuncao = ({ open, funcao, onClose, onEdicaoSuccess }) => {
    const [nome, setNome] = useState(funcao?.nome || '');

    useEffect(() => {
        if (funcao) setNome(funcao.nome);
    }, [funcao]);

    const handleSave = async () => {
        if (!nome) {
            alert('Preencha o campo de nome!');
            return;
        }

        try {
            await updateFuncao(funcao.id, { nome });
            onEdicaoSuccess();
            window.location.reload();
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar função:', error);
            alert('Erro ao atualizar função!');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Função</DialogTitle>
            <DialogContent>
                <TextField label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} margin="normal" required />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={handleSave} color="primary">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditarFuncao;
