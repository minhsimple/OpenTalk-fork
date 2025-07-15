import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaPhone } from 'react-icons/fa';
import FeedBackCard from '../components/feedBackCard/FeedBackCard';
import { feedbackMockData } from '../api/__mocks__/data/feedback';
import { getMeetingById } from '../api/meeting';
import meetingMockData from '../api/__mocks__/data/meetingMockData';
import './styles/MeetingDetailPage.css';

const MeetingDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meeting, setMeeting] = useState(null);
    const [activeTab, setActiveTab] = useState('general');
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const local = meetingMockData.find((m) => m.id === Number(id));
        setMeeting(local);
        setFeedbacks(feedbackMockData[id] || []);
        const load = async () => {
            try {
                const data = await getMeetingById(id);
                setMeeting(data);
            } catch (e) {
                console.error(e);
            }
        };
        load();
    }, [id]);

    if (!meeting) return <div className="meeting-detail-page" />;

    const host = meeting.topic.host;
    const suggestBy = meeting.topic.suggestBy;
    const evaluteBy = meeting.topic.evaluteBy;

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
                <button onClick={() => navigate('/meeting')} className="back-button">
                    <FaArrowLeft size={16} />
                </button>
                <h1 className="page-title">Meeting Detail</h1>
                <button className="download-button">Download material</button>
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
                            <a href={meeting.meetingLink} className="value link" target="_blank" rel="noreferrer">
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
                        {host ? renderUserInfo(host) : (
                            <div className="profile-header">
                                <img src="/placeholder.svg" alt="No Host" className="profile-avatar" />
                                <h2 className="profile-name">No Host</h2>
                            </div>
                        )}
                    </div>
                </div>

                <div className="topic-content">
                    <div className="tabs-header">
                        <button
                            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            Topic General
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'suggest' ? 'active' : ''}`}
                            onClick={() => setActiveTab('suggest')}
                        >
                            Suggested By
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'evaluate' ? 'active' : ''}`}
                            onClick={() => setActiveTab('evaluate')}
                        >
                            Evaluated By
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'general' && (
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
                        {activeTab === 'suggest' && suggestBy && renderUserInfo(suggestBy)}
                    {activeTab === 'evaluate' && evaluteBy && renderUserInfo(evaluteBy)}
                    </div>
                </div>

                <div className="feedback-section">
                    <h2 className="section-title">FeedBack</h2>
                    <div className="feedback-list">
                        {feedbacks.map((fb) => (
                            <FeedBackCard key={fb.id} feedback={fb} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingDetailPage;
