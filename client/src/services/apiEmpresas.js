// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2105',
});

// Funções para Empresas

// Obter todas as empresas
export const getEmpresas = async () => {
    try {
        const response = await api.get('/empresas');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar empresas:', error.response || error.message);
        throw error;
    }
};

// Obter uma empresa específica
export const getEmpresa = async (id) => {
    try {
        const response = await api.get(`/empresas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar empresa:', error.response || error.message);
        throw error;
    }
};

// Criar uma nova empresa
export const createEmpresa = async (dadosEmpresa) => {
    try {
        const response = await api.post('/empresas', dadosEmpresa);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar empresa:', error.response || error.message);
        throw error;
    }
};

// Atualizar uma empresa existente
export const updateEmpresa = async (id, dadosAtualizados) => {
    try {
        const response = await api.put(`/empresas/${id}`, dadosAtualizados);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar empresa:', error.response || error.message);
        throw error;
    }
};

// Deletar uma empresa
export const deleteEmpresa = async (id) => {
    try {
        const response = await api.delete(`/empresas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar empresa:', error.response || error.message);
        throw error;
    }
};
