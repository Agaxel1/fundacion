// src/api.js
import axios from 'axios';

export const BASE_URLs = 'http://localhost:8000';
//export const BASE_URLs = 'https://yoyoapi.vida-roleplay.es';

export const adminLogin = async (username, password) => {
    const res = await axios.post(`${BASE_URLs}/admin-login`, { username, password });
    return res.data; // { token }
};

export const checkAdminSession = async () => {
    const token = localStorage.getItem('adminToken');
    const res = await axios.get(`${BASE_URLs}/api/admin/check-session`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data; // { isLoggedIn: true/false }
};

export const getLinks = async () => {
    const res = await axios.get(`${BASE_URLs}/links`);
    return res.data;
};

export const getTopics = async () => {
    const res = await axios.get(`${BASE_URLs}/topics`);
    return res.data;
};

export const deleteTopic = async (id) => {
    await axios.delete(`${BASE_URLs}/topics/${id}`);
};

export const updateTopic = async (id, data) => {
    await axios.put(`${BASE_URLs}/topics/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const updateLink = async (id, data) => {
  await axios.put(`${BASE_URLs}/links/${id}`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const submitTopic = (formData) => {
    return axios.post(`${BASE_URLs}/topics`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const submitLink = (data) => {
    return axios.post(`${BASE_URLs}/links`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const submitConvocatoria = (formData) => {
    return axios.post(`${BASE_URLs}/convocatorias`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deleteConvocatoria = async (id) => {
    await axios.delete(`${BASE_URLs}/topics/${id}`);
};


export const getConvocatorias = async () => {
    try {
        const response = await axios.get(`${BASE_URLs}/convocatorias`);
        return response.data;
    } catch (err) {
        console.error('Error al obtener convocatorias:', err);
    }
};


export const updateConvocatoria = async (id, data) => {
    await axios.put(`${BASE_URLs}/convocatorias/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
