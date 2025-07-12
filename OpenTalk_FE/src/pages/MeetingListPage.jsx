import MeetingCard from '../components/meetingCard/MeetingCard';

const mockMeetings = [
  { id: 1, topicName: 'Weekly Sync', scheduledDate: '2025-07-14 10:00', meetingLink: 'https://meeting.com/1' },
  { id: 2, topicName: 'Project Kickoff', scheduledDate: '2025-07-15 09:00', meetingLink: 'https://meeting.com/2' },
  { id: 3, topicName: 'Design Review', scheduledDate: '2025-07-16 13:00', meetingLink: 'https://meeting.com/3' },
  { id: 4, topicName: 'Sprint Planning', scheduledDate: '2025-07-17 11:00', meetingLink: 'https://meeting.com/4' },
  { id: 5, topicName: 'Retrospective', scheduledDate: '2025-07-18 16:00', meetingLink: 'https://meeting.com/5' },
  { id: 6, topicName: 'Client Demo', scheduledDate: '2025-07-19 15:00', meetingLink: 'https://meeting.com/6' },
  { id: 7, topicName: 'Team Building', scheduledDate: '2025-07-20 10:30', meetingLink: 'https://meeting.com/7' },
  { id: 8, topicName: 'Marketing Update', scheduledDate: '2025-07-21 12:00', meetingLink: 'https://meeting.com/8' },
  { id: 9, topicName: 'Budget Review', scheduledDate: '2025-07-22 09:30', meetingLink: 'https://meeting.com/9' },
  { id: 10, topicName: 'One-on-One', scheduledDate: '2025-07-23 14:00', meetingLink: 'https://meeting.com/10' },
  { id: 11, topicName: 'All Hands', scheduledDate: '2025-07-24 11:30', meetingLink: 'https://meeting.com/11' },
  { id: 12, topicName: 'Tech Sync', scheduledDate: '2025-07-25 09:45', meetingLink: 'https://meeting.com/12' },
  { id: 13, topicName: 'Roadmap Planning', scheduledDate: '2025-07-26 15:30', meetingLink: 'https://meeting.com/13' },
  { id: 14, topicName: 'Hiring Discussion', scheduledDate: '2025-07-27 16:15', meetingLink: 'https://meeting.com/14' },
  { id: 15, topicName: 'Customer Feedback', scheduledDate: '2025-07-28 10:45', meetingLink: 'https://meeting.com/15' },
  { id: 16, topicName: 'Training Session', scheduledDate: '2025-07-29 13:15', meetingLink: 'https://meeting.com/16' },
  { id: 17, topicName: 'Product Launch', scheduledDate: '2025-07-30 09:00', meetingLink: 'https://meeting.com/17' },
  { id: 18, topicName: 'Partnership Call', scheduledDate: '2025-07-31 14:30', meetingLink: 'https://meeting.com/18' },
  { id: 19, topicName: 'UX Brainstorm', scheduledDate: '2025-08-01 11:00', meetingLink: 'https://meeting.com/19' },
  { id: 20, topicName: 'Quarterly Review', scheduledDate: '2025-08-02 16:45', meetingLink: 'https://meeting.com/20' }
];

const MeetingListPage = () => {
  const meetings = mockMeetings;

  const handleJoin = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {meetings.map((m) => (
        <MeetingCard
          key={m.id}
          title={m.topicName}
          time={m.scheduledDate}
          description={m.meetingLink}
          participants={[]}
          extraCount={0}
          onJoin={() => handleJoin(m.meetingLink)}
        />
      ))}
    </div>
  );
};

export default MeetingListPage;

