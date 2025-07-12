import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/opentalk-topic';

export const getMeetings = () =>
  axios.get(API_BASE).then(res => res.data);
