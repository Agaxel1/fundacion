// src/api.js
import axios from 'axios';

export const BASE_URLs = 'http://localhost:5000';

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

export const submitTopic = (formData) => {
    return axios.post('/topics', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
