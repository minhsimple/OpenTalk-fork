import axiosClient from './axiosClient';

const API_BASE = '/opentalk-meeting';

export const getMeetingDetails = (meetingName, branchId) =>
  axiosClient.get(`${API_BASE}/details`, { params: { meetingName, branchId } }).then(res => res.data);
