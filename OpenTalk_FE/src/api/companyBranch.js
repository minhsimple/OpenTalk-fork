import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/company-branch';

export const getCompanyBranches = (page = 0, size = 10) =>
  axios.get(`${API_BASE}?page=${page}&size=${size}`).then(res => res.data);

export const createCompanyBranch = (payload) =>
  axios.post(API_BASE, payload).then(res => res.data);

export const updateCompanyBranch = (id, payload) =>
  axios.put(`${API_BASE}/${id}`, payload).then(res => res.data);
