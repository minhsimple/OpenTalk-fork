import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MeetingCard from '../components/meetingCard/MeetingCard';
import { FaSearch, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getMeetings } from '../api/meeting';
import { getCompanyBranches } from '../api/companyBranch';
import { OpenTalkMeetingStatus } from '../constants/enums/openTalkMeetingStatus';
import { meetingMockData } from '../api/__mocks__/data/MeetingMockData';
import './styles/MeetingListPage.css';

const mockBranches = [
  { id: 1, name: 'Branch A' },
  { id: 2, name: 'Branch B' },
  { id: 3, name: 'Branch C' },
  { id: 4, name: 'Branch D' },
];

const MeetingListPage = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState(meetingMockData);
  const [branches, setBranches] = useState(mockBranches);
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [activeTab, setActiveTab] = useState('inactive');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const tabs = [
    { id: 'inactive', label: 'Inactive' },
    { id: 'completed', label: 'Completed' },
    { id: 'waitingHost', label: 'Waiting Host To Register' },
    { id: 'notScheduled', label: 'Not Scheduled Yet' },
    { id: 'ongoing', label: 'Ongoing' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMeetings();
        setMeetings(Array.isArray(data) ? data : meetingMockData);
      } catch (e) {
        console.error(e);
        setMeetings(meetingMockData);
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

  const now = new Date();

  const filteredMeetings = meetings.filter((m) => {
    const nameMatch = m.meetingName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const branchMatch = branchFilter
      ? m.companyBranch.name === branchFilter
      : true;

    if (!nameMatch || !branchMatch) return false;

    const meetingDate = new Date(m.scheduledDate);
    const diffDays = Math.floor((meetingDate - now) / (1000 * 60 * 60 * 24));

    switch (activeTab) {
      case 'inactive':
        return m.status === OpenTalkMeetingStatus.INACTIVE;
      case 'completed':
        return m.status === OpenTalkMeetingStatus.COMPLETED;
      case 'waitingHost':
        return (
          m.status === OpenTalkMeetingStatus.ACTIVE &&
          !m.topic.host &&
          diffDays <= 7 &&
          diffDays > 0
        );
      case 'notScheduled':
        return (
          m.status === OpenTalkMeetingStatus.ACTIVE &&
          diffDays > 0
        );
      case 'ongoing':
        return (
          m.status === OpenTalkMeetingStatus.ACTIVE &&
          m.topic.host &&
          meetingDate.toDateString() === now.toDateString()
        );
      default:
        return true;
    }
  });

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

      <div className="tabs-header">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              setCurrentPage(1);
            }}
            className={`tab-button ${activeTab === t.id ? 'active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="meeting-list-container">
        {paginatedMeetings.map((m) => (
          <MeetingCard
            key={m.id}
            title={m.meetingName}
            time={m.scheduledDate}
            description={m.meetingLink}
            participants={[]}
            extraCount={0}
            showButton={
              activeTab === 'waitingHost' || activeTab === 'ongoing'
            }
            actionLabel={
              activeTab === 'waitingHost' ? 'Register Host' : 'Join Meeting'
            }
            onAction={() => {
              if (activeTab === 'ongoing') {
                handleJoin(m.meetingLink);
              } else if (activeTab === 'waitingHost') {
                navigate(`/meeting/${m.id}`);
              }
            }}
            onView={() => navigate(`/meeting/${m.id}`)}
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
