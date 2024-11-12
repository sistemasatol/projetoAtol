import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';
import { createEmpresa } from '../services/apiEmpresas'; // Função API para criar empresa
import * as Yup from 'yup';

const CadastroEmpresa = ({ open, onClose, onCadastroSuccess }) => {
    const [formData, setFormData] = useState({
        nome: '',
        cnpj: '',
        telefone: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Esquema de validação Yup
    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Nome é obrigatório"),
        cnpj: Yup.string().required("CNPJ é obrigatório"),
        telefone: Yup.string().required("Telefone é obrigatório")
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setLoading(true);
            await createEmpresa(formData);
            window.location.reload();
            onCadastroSuccess();
            onClose();
            limparCampos();
        } catch (error) {
            if (error.name === 'ValidationError') {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.error("Erro ao cadastrar empresa", error);
                alert("Erro ao cadastrar empresa. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    const limparCampos = () => {
        setFormData({
            nome: '',
            cnpj: '',
            telefone: ''
        });
        setErrors({});
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: { xs: '100%', sm: 400 },
                    margin: 'auto',
                    mt: '5%',
                    padding: 3,
                    backgroundColor: 'white',
                    boxShadow: 24,
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" mb={2}>Cadastrar Nova Empresa</Typography>

                {[{ label: 'Nome', name: 'nome', required: true },
                  { label: 'CNPJ', name: 'cnpj', required: true },
                  { label: 'Telefone', name: 'telefone', required: true }
                ].map(({ label, name, required }) => (
                    <TextField
                        key={name}
                        label={label}
                        fullWidth
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        margin="normal"
                        required={required}
                        error={!!errors[name]}
                        helperText={errors[name]}
                    />
                ))}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
                </Button>
            </Box>
        </Modal>
    );
};

export default CadastroEmpresa;
