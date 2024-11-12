import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { createFuncao } from '../services/apiFuncoes';
import * as Yup from 'yup';

const CadastroFuncao = ({ open, onClose, onCadastroSuccess }) => {
    const [nome, setNome] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validationSchema = Yup.string().required("Nome é obrigatório");

    const handleSubmit = async () => {
        try {
            await validationSchema.validate(nome);
            setLoading(true);
            await createFuncao({ nome });
            window.location.reload();
            onCadastroSuccess();
            onClose();
            setNome('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: { xs: '100%', sm: 400 }, margin: 'auto', mt: '5%', padding: 3, backgroundColor: 'white', boxShadow: 24, borderRadius: 2 }}>
                <Typography variant="h6" mb={2}>Cadastrar Nova Função</Typography>
                <TextField label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} margin="normal" required error={!!error} helperText={error} />
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }} disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
                </Button>
            </Box>
        </Modal>
    );
};

export default CadastroFuncao;
