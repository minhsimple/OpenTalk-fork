import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import FeedBackCard from "../components/feedBackCard/FeedBackCard";
import FeedBackCardInput from "../components/feedBackCard/FeedBackCardInput";
import { feedbackMockData } from "../api/__mocks__/data/feedback";
import "./styles/MeetingDetailPage.css";
import { getAllFeedbacksByMeetingId } from "../api/feedback";
import axiosClient from '../api/axiosClient';

const MeetingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const location = useLocation();
  const [meetings] = useState(location.state?.meetingList || []);

    const handleDownloadMaterial = async () => {
    try {
        const response = await axiosClient.get(`/files/download-all/${id}`, {
        responseType: 'blob',
        validateStatus: (status) => status < 500,
        });

        const contentType = response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
        const text = await response.data.text();
        const json = JSON.parse(text);
        alert(json.message || 'No attachment found');
        return;
        }

        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `meeting_${id}_materials.zip`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error);
        alert('Something went wrong while downloading the file.');
    }
    };

  useEffect(() => {
    const fetchData = async () => {
      const local = meetings.find((m) => m.id === Number(id));

      try {
        const feedBackDatas = await getAllFeedbacksByMeetingId(local.id);
        console.log("Fetched feedbacks:", feedBackDatas);
        setFeedbacks(Array.isArray(feedBackDatas) ? feedBackDatas : []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setFeedbacks(feedbackMockData);
      }
      setMeeting(local);
      setCurrentPage(1);
    };

    fetchData();
  }, [id]);

  if (!meeting) return <div className="meeting-detail-page" />;

  const host = meeting.host;
  const suggestBy = meeting.topic.suggestBy;
  const evaluteBy = meeting.topic.evaluteBy;
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedbacks = feedbacks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const renderUserInfo = (user) => (
    <>
      <div className="profile-header">
        <img
          src="/placeholder.svg"
          alt={user.fullName}
          className="profile-avatar"
        />
        <h2 className="profile-name">{user.fullName}</h2>
        <p className="profile-title">{user.username}</p>
      </div>
      <div className="contact-info">
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <span>{user.email}</span>
        </div>
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <span>000-000-0000</span>
        </div>
        <div className="contact-item">
          <span>Branch: {user.companyBranch.name}</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="meeting-detail-page">
      <div className="page-header">
        <button onClick={() => navigate("/meeting")} className="back-button">
          <FaArrowLeft size={16} />
        </button>
        <h1 className="page-title">Meeting Detail</h1>
        <button className="download-button" onClick={handleDownloadMaterial}>Download material</button>
      </div>

      <div className="content-grid">
        <div className="profile-card">
          <div className="meeting-highlight">
            <h2 className="meeting-name">{meeting.meetingName}</h2>
            <div className="detail-row">
              <span className="label">Scheduled Date:</span>
              <span className="value">{meeting.scheduledDate}</span>
            </div>
            <div className="detail-row">
              <span className="label">Meeting Link:</span>
              <a
                href={meeting.meetingLink}
                className="value link"
                target="_blank"
                rel="noreferrer"
              >
                {meeting.meetingLink}
              </a>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className="value">{meeting.status}</span>
            </div>
            <div className="detail-row">
              <span className="label">Branch:</span>
              <span className="value">{meeting.companyBranch.name}</span>
            </div>
          </div>
          <div className="host-section">
            <h3 className="section-title">Host</h3>
            {host ? (
              renderUserInfo(host)
            ) : (
              <div className="profile-header">
                <img
                  src="/placeholder.svg"
                  alt="No Host"
                  className="profile-avatar"
                />
                <h2 className="profile-name">No Host</h2>
              </div>
            )}
          </div>
        </div>

        <div className="topic-content">
          <div className="tabs-header">
            <button
              className={`tab-button ${
                activeTab === "general" ? "active" : ""
              }`}
              onClick={() => setActiveTab("general")}
            >
              Topic General
            </button>
            <button
              className={`tab-button ${
                activeTab === "suggest" ? "active" : ""
              }`}
              onClick={() => setActiveTab("suggest")}
            >
              Suggested By
            </button>
            <button
              className={`tab-button ${
                activeTab === "evaluate" ? "active" : ""
              }`}
              onClick={() => setActiveTab("evaluate")}
            >
              Evaluated By
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "general" && (
              <>
                <div className="detail-row">
                  <span className="label">Title:</span>
                  <span className="value">{meeting.topic.title}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Description:</span>
                  <span className="value">{meeting.topic.description}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Remark:</span>
                  <span className="value">{meeting.topic.remark}</span>
                </div>
              </>
            )}
            {activeTab === "suggest" && suggestBy && renderUserInfo(suggestBy)}
            {activeTab === "evaluate" && evaluteBy && renderUserInfo(evaluteBy)}
          </div>
        </div>

        <div className="feedback-section">
          <h2 className="section-title">FeedBack</h2>
          <div className="feedback-content">
            <FeedBackCardInput />
            <div className="feedback-list">
              {paginatedFeedbacks.map((fb) => (
                <FeedBackCard key={fb.id} feedback={fb} />
              ))}
            </div>
          </div>
          <div className="pagination">
            <div className="pagination-info">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, feedbacks.length)} of{" "}
              {feedbacks.length} results
            </div>
            <div className="pagination-buttons">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <FaChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`pagination-number ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailPage;
