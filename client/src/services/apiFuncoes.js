import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2105',
});

export const getFuncoes = async () => {
    try {
        const response = await api.get('/funcoes');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar funções:', error.response || error.message);
        throw error;
    }
};

// Obter uma função específica
export const getFuncao = async (id) => {
    try {
        const response = await api.get(`/funcoes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar função:', error.response || error.message);
        throw error;
    }
};

// Criar uma nova função
export const createFuncao = async (dadosFuncao) => {
    try {
        const response = await api.post('/funcoes', dadosFuncao);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar função:', error.response || error.message);
        throw error;
    }
};

// Atualizar uma função existente
export const updateFuncao = async (id, dadosAtualizados) => {
    try {
        const response = await api.put(`/funcoes/${id}`, dadosAtualizados);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar função:', error.response || error.message);
        throw error;
    }
};

// Deletar uma função
export const deleteFuncao = async (id) => {
    try {
        const response = await api.delete(`/funcoes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar função:', error.response || error.message);
        throw error;
    }
};
