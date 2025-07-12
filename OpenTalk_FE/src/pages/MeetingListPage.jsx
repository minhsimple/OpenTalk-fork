import { useEffect, useState } from 'react';
import MeetingCard from '../components/meetingCard/MeetingCard';
import { FaSearch, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getMeetings } from '../api/meeting';
import { getCompanyBranches } from '../api/companyBranch';
import './styles/MeetingListPage.css';

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

const mockBranches = [
  { id: 1, name: 'Unpixel HQ' },
  { id: 2, name: 'North Branch' },
  { id: 3, name: 'South Branch' },
  { id: 4, name: 'East Branch' },
];

const MeetingListPage = () => {
  const [meetings, setMeetings] = useState(mockMeetings);
  const [branches, setBranches] = useState(mockBranches);
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMeetings();
        setMeetings(Array.isArray(data) ? data : mockMeetings);
      } catch (e) {
        console.error(e);
        setMeetings(mockMeetings);
      }

      try {
        const branchData = await getCompanyBranches();
        setBranches(Array.isArray(branchData) ? branchData : mockBranches);
      } catch (e) {
        console.error(e);
        setBranches(mockBranches);
      }
    };

    fetchData();
  }, []);

  const handleJoin = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  const filteredMeetings = meetings.filter(
    (m) =>
      m.topicName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (branchFilter ? m.branchName === branchFilter : true)
  );

  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMeetings = filteredMeetings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="meeting-page">
      <div className="filters">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search topic"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="select-container">
          <select
            className="select"
            value={branchFilter}
            onChange={(e) => {
              setBranchFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Branches</option>
            {branches.map((b) => (
              <option key={b.id ?? b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
          <FaChevronDown className="select-icon" />
        </div>
      </div>

      <div className="meeting-list-container">
        {paginatedMeetings.map((m) => (
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

      <div className="pagination">
        <div className="pagination-info">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMeetings.length)} of {filteredMeetings.length} results
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
              className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingListPage;
