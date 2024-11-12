import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    CircularProgress
} from '@mui/material';
import { createColaborador } from '../services/apiColaboradores';
import { getEmpresas } from '../services/apiEmpresas';
import { getObras } from '../services/apiObras';
import { getFuncoes } from '../services/apiFuncoes';
import * as Yup from 'yup';

const CadastroColaborador = ({ open, onClose, onCadastroSuccess }) => {
    // Estado dos campos de entrada
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        telefone: '',
        tipoContrato: '',
        tipoDocumento: '',
        num_documento: '',
        obs: '',
        empresaId: '',
        funcaoId: '',
        obraId: '',
        status: ''
    });
    const [empresas, setEmpresas] = useState([]);
    const [obras, setObras] = useState([]);
    const [funcoes, setFuncoes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Esquema de validação Yup
    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Nome é obrigatório"),
        sobrenome: Yup.string().required("Sobrenome é obrigatório"),
        num_documento: Yup.string().required("Número de documento é obrigatório"),
        empresaId: Yup.string().required("Selecione uma empresa"),
        funcaoId: Yup.string().required("Selecione uma função"),
        obraId: Yup.string().required("Selecione uma obra"),
        status: Yup.string().required("Selecione um status")
    });

    useEffect(() => {
        const fetchInformacoes = async () => {
            try {
                setLoading(true);
                const [empresasData, funcoesData, obrasData] = await Promise.all([
                    getEmpresas(),
                    getFuncoes(),
                    getObras()
                ]);
                setEmpresas(empresasData);
                setFuncoes(funcoesData);
                setObras(obrasData);
            } catch (err) {
                console.error("Erro ao carregar dados", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInformacoes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            // Validação dos dados
            await validationSchema.validate(formData, { abortEarly: false });
            setLoading(true);
            await createColaborador(formData);
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
                console.error("Erro ao cadastrar colaborador", error);
                alert("Erro ao cadastrar colaborador. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    const limparCampos = () => {
        setFormData({
            nome: '',
            sobrenome: '',
            telefone: '',
            tipoContrato: '',
            tipoDocumento: '',
            num_documento: '',
            obs: '',
            empresaId: '',
            funcaoId: '',
            obraId: '',
            status: ''
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
                <Typography variant="h6" mb={2}>Cadastrar Novo Colaborador</Typography>

                {[
                    { label: 'Nome', name: 'nome', required: true },
                    { label: 'Sobrenome', name: 'sobrenome', required: true },
                    { label: 'Telefone', name: 'telefone' }
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

                <TextField
                    label="Tipo de Contrato"
                    fullWidth
                    select
                    name="tipoContrato"
                    value={formData.tipoContrato}
                    onChange={handleInputChange}
                    margin="normal"
                >
                    <MenuItem value="CLT">CLT</MenuItem>
                    <MenuItem value="PJ">PJ</MenuItem>
                    <MenuItem value="Outros">Outros</MenuItem>
                </TextField>

                <TextField
                    label="Tipo de Documento"
                    fullWidth
                    select
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleInputChange}
                    margin="normal"
                >
                    <MenuItem value="RG">RG</MenuItem>
                    <MenuItem value="CPF">CPF</MenuItem>
                </TextField>

                {[
                    { label: 'Número de Documento', name: 'num_documento', required: true },
                    { label: 'Observações', name: 'obs' }
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

                {[{
                    label: 'Empresa', name: 'empresaId', options: empresas, required: true
                }, {
                    label: 'Função', name: 'funcaoId', options: funcoes, required: true
                }, {
                    label: 'Obra', name: 'obraId', options: obras, required: true
                }, {
                    label: 'Status', name: 'status', options: [{ id: 'Ativo', nome: 'Ativo' }, { id: 'Inativo', nome: 'Inativo' }], required: true
                }].map(({ label, name, options, required }) => (
                    <TextField
                        key={name}
                        label={label}
                        fullWidth
                        select
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        margin="normal"
                        required={required}
                        error={!!errors[name]}
                        helperText={errors[name]}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>
                        ))}
                    </TextField>
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

export default CadastroColaborador;