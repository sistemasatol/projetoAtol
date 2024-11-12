
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:2105',
});


// Obter todas as obras
export const getObras = async () => {
    try {
        const response = await api.get('/obras');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar obras:', error.response || error.message);
        throw error;
    }
};

// Obter uma obra específica
export const getObra = async (id) => {
    try {
        const response = await api.get(`/obras/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar obra:', error.response || error.message);
        throw error;
    }
};

// Criar uma nova obra
export const createObra = async (dadosObra) => {
    try {
        const response = await api.post('/obras', dadosObra);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar obra:', error.response || error.message);
        throw error;
    }
};

// Atualizar uma obra existente
export const updateObra = async (id, dadosAtualizados) => {
    try {
        const response = await api.put(`/obras/${id}`, dadosAtualizados);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar obra:', error.response || error.message);
        throw error;
    }
};

// Deletar uma obra
export const deleteObra = async (id) => {
    try {
        const response = await api.delete(`/obras/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar obra:', error.response || error.message);
        throw error;
    }
};
