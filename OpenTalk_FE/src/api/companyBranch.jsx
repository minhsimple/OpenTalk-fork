import axiosClient from './axiosClient';
const API_BASE = '/company-branch';

export const getCompanyBranches = () =>
  axiosClient.get(API_BASE).then(res => res.data);

export const createCompanyBranch = (payload) =>
  axiosClient.post(API_BASE, payload).then(res => res.data);

export const updateCompanyBranch = (id, payload) =>
  axiosClient.put(`${API_BASE}/${id}`, payload).then(res => res.data);

export const deleteCompanyBranch = (id) =>
  axiosClient.delete(`${API_BASE}/${id}`).then(res => res.data);

export const getCompanyBranch = (id) =>
  axiosClient.get(`${API_BASE}/${id}`).then(res => res.data);