import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:2105'
});


export const createColaborador = async (formData) => {
    try {
        const response = await api.post('/colaboradores', formData);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erro ao criar colaborador:', error.response.status, error.response.data);
        } else {
            console.error('Erro desconhecido:', error.message);
        }
        console.error('Erro ao criar colaborador:', error.response || error.message);
        throw error;
    }
};
// Função para obter todos os colaboradores
export const getColaboradores = async () => {
    try {
        const response = await api.get('/colaboradores');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar colaboradores:', error.response || error.message);
        throw error;
    }
};

// Função para obter um colaborador específico
export const getColaborador = async (id) => {
    try {
        const response = await api.get(`/colaboradores/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar colaborador:', error.response || error.message);
        throw error;
    }
};

// Função para atualizar um colaborador
export const updateColaborador = async (id, dadosAtualizados) => {
    try {
        const response = await api.put(`/colaboradores/${id}`, dadosAtualizados);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar colaborador:', error.response || error.message);
        throw error;
    }
};

// Função para deletar um colaborador
export const deleteColaborador = async (id) => {
    try {
        const response = await api.delete(`/colaboradores/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar colaborador:', error.response || error.message);
        throw error;
    }
};
