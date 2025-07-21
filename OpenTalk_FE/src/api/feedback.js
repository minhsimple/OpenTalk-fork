import axiosClient from "./axiosClient";

const API_BASE = '/feedbacks';

export const getAllFeedbacksByMeetingId = async (meetingId) => axiosClient.get(`${API_BASE}/${meetingId}`)
    .then(res => res.data);