import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getMeetingById } from '../api/meeting';
import './styles/MeetingDetailPage.css';

const mockMeeting = {
  id: 0,
  topicName: '',
  scheduledDate: '',
  meetingLink: '',
  branchName: '',
  status: ''
};

const MeetingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getMeetingById(id);
        setMeeting(data);
      } catch (e) {
        console.error(e);
        setMeeting(mockMeeting);
      }
    };
    loadData();
  }, [id]);

  if (!meeting) return <div className="meeting-detail-page" />;

  return (
    <div className="meeting-detail-page">
      <div className="page-header">
        <button onClick={() => navigate('/meeting')} className="back-button">
          <FaArrowLeft size={16} />
        </button>
        <h1 className="page-title">{meeting.topicName || meeting.meetingName}</h1>
      </div>

      <div className="detail-card">
        <div className="detail-row">
          <span className="label">Scheduled Date:</span>
          <span className="value">{meeting.scheduledDate}</span>
        </div>
        {meeting.branchName && (
          <div className="detail-row">
            <span className="label">Branch:</span>
            <span className="value">{meeting.branchName}</span>
          </div>
        )}
        {meeting.meetingLink && (
          <div className="detail-row">
            <span className="label">Meeting Link:</span>
            <a
              href={meeting.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="value link"
            >
              {meeting.meetingLink}
            </a>
          </div>
        )}
        {meeting.status !== undefined && (
          <div className="detail-row">
            <span className="label">Status:</span>
            <span className="value">{meeting.status || (meeting.isEnabled ? 'Enabled' : 'Disabled')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingDetailPage;
