import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaPhone } from 'react-icons/fa';
import { getMeetingById } from '../api/meeting';
import { meetingMockData } from '../mock/MeetingMockData';
import './styles/MeetingDetailPage.css';

const MeetingDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meeting, setMeeting] = useState(null);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        const local = meetingMockData.find((m) => m.id === Number(id));
        setMeeting(local);
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
                <h1 className="page-title">{meeting.meetingName}</h1>
            </div>

            <div className="content-grid">
                <div className="profile-card">
                    {host ? renderUserInfo(host) : (
                        <div className="profile-header">
                            <img src="/placeholder.svg" alt="No Host" className="profile-avatar" />
                            <h2 className="profile-name">No Host</h2>
                        </div>
                    )}
                </div>

                <div className="main-content">
                    <div className="tabs-header">
                        <button
                            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            Meeting General
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
                                    <span className="label">Meeting Name:</span>
                                    <span className="value">{meeting.meetingName}</span>
                                </div>
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
                                    <span className="label">Topic Title:</span>
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
                                <div className="detail-row">
                                    <span className="label">Branch:</span>
                                    <span className="value">{meeting.companyBranch.name}</span>
                                </div>
                            </>
                        )}
                        {activeTab === 'suggest' && suggestBy && renderUserInfo(suggestBy)}
                        {activeTab === 'evaluate' && evaluteBy && renderUserInfo(evaluteBy)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingDetailPage;
