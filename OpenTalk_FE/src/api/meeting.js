import axiosClient from './axiosClient';

const API_BASE = '/opentalk-meeting';

export const getMeetings = () =>
  axiosClient.get(API_BASE).then(res => res.data);

export const getMeetingById = (id) =>
  axiosClient.get(`${API_BASE}/${id}`).then(res => res.data);
