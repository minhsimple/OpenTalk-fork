import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/opentalk-meeting';

export const getMeetings = () =>
  axios.get(API_BASE).then(res => res.data);

export const getMeetingById = (id) =>
  axios.get(`${API_BASE}/${id}`).then(res => res.data);
