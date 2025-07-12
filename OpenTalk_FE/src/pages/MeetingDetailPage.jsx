import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getMeetingById } from '../api/meeting';
import './styles/MeetingDetailPage.css';

const mockMeetings = [
  { id: 1, topicName: 'Weekly Sync', scheduledDate: '2025-07-14 10:00', meetingLink: 'https://meeting.com/1', branchName: 'Unpixel HQ' },
  { id: 2, topicName: 'Project Kickoff', scheduledDate: '2025-07-15 09:00', meetingLink: 'https://meeting.com/2', branchName: 'North Branch' },
  { id: 3, topicName: 'Design Review', scheduledDate: '2025-07-16 13:00', meetingLink: 'https://meeting.com/3', branchName: 'South Branch' },
  { id: 4, topicName: 'Sprint Planning', scheduledDate: '2025-07-17 11:00', meetingLink: 'https://meeting.com/4', branchName: 'East Branch' },
  { id: 5, topicName: 'Retrospective', scheduledDate: '2025-07-18 16:00', meetingLink: 'https://meeting.com/5', branchName: 'Unpixel HQ' },
  { id: 6, topicName: 'Client Demo', scheduledDate: '2025-07-19 15:00', meetingLink: 'https://meeting.com/6', branchName: 'North Branch' },
  { id: 7, topicName: 'Team Building', scheduledDate: '2025-07-20 10:30', meetingLink: 'https://meeting.com/7', branchName: 'South Branch' },
  { id: 8, topicName: 'Marketing Update', scheduledDate: '2025-07-21 12:00', meetingLink: 'https://meeting.com/8', branchName: 'East Branch' },
  { id: 9, topicName: 'Budget Review', scheduledDate: '2025-07-22 09:30', meetingLink: 'https://meeting.com/9', branchName: 'Unpixel HQ' },
  { id: 10, topicName: 'One-on-One', scheduledDate: '2025-07-23 14:00', meetingLink: 'https://meeting.com/10', branchName: 'North Branch' },
  { id: 11, topicName: 'All Hands', scheduledDate: '2025-07-24 11:30', meetingLink: 'https://meeting.com/11', branchName: 'South Branch' },
  { id: 12, topicName: 'Tech Sync', scheduledDate: '2025-07-25 09:45', meetingLink: 'https://meeting.com/12', branchName: 'East Branch' },
  { id: 13, topicName: 'Roadmap Planning', scheduledDate: '2025-07-26 15:30', meetingLink: 'https://meeting.com/13', branchName: 'Unpixel HQ' },
  { id: 14, topicName: 'Hiring Discussion', scheduledDate: '2025-07-27 16:15', meetingLink: 'https://meeting.com/14', branchName: 'North Branch' },
  { id: 15, topicName: 'Customer Feedback', scheduledDate: '2025-07-28 10:45', meetingLink: 'https://meeting.com/15', branchName: 'South Branch' },
  { id: 16, topicName: 'Training Session', scheduledDate: '2025-07-29 13:15', meetingLink: 'https://meeting.com/16', branchName: 'East Branch' },
  { id: 17, topicName: 'Product Launch', scheduledDate: '2025-07-30 09:00', meetingLink: 'https://meeting.com/17', branchName: 'Unpixel HQ' },
  { id: 18, topicName: 'Partnership Call', scheduledDate: '2025-07-31 14:30', meetingLink: 'https://meeting.com/18', branchName: 'North Branch' },
  { id: 19, topicName: 'UX Brainstorm', scheduledDate: '2025-08-01 11:00', meetingLink: 'https://meeting.com/19', branchName: 'South Branch' },
  { id: 20, topicName: 'Quarterly Review', scheduledDate: '2025-08-02 16:45', meetingLink: 'https://meeting.com/20', branchName: 'East Branch' }
];

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
    // show mock data immediately
    const local = mockMeetings.find((m) => m.id === Number(id));
    setMeeting(local || mockMeeting);

    const loadData = async () => {
      try {
        const data = await getMeetingById(id);
        setMeeting(data);
      } catch (e) {
        console.error(e);
        // keep the mock data if the API call fails
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
