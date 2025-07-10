import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/opentalk_manager/Header";
import Table from "../components/opentalk_manager/Table";
import OpenTalkPagination from "../components/opentalk_manager/Pagination";
import MeetingDetail from "../components/opentalk_manager/MeetingDetail";

// Dữ liệu giả lập (có thể fetch từ API thực tế)
const DUMMY_MEETINGS = [
  {
    id: 1,
    meetingTitle: "OpenTalk Kick-off",
    host: "Pristia Candra",
    companyBranch: "Unpixel Office",
    scheduledDate: "2023-08-20T09:00:00",
    meetingUrl: "https://meet.example.com/opentalk-kickoff",
    status: "Scheduled",
    attendanceCode: "OTK123"
  },
  {
    id: 2,
    meetingTitle: "Design Weekly",
    host: "Hanna Baptista",
    companyBranch: "Hanoi Branch",
    scheduledDate: "2023-08-23T14:30:00",
    meetingUrl: "https://meet.example.com/design-weekly",
    status: "Ongoing",
    attendanceCode: "DWN789"
  },
  {
    id: 3,
    meetingTitle: "Sprint Review",
    host: "Alex Nguyen",
    companyBranch: "Saigon Hub",
    scheduledDate: "2023-08-25T16:00:00",
    meetingUrl: "https://meet.example.com/sprint-review",
    status: "Finished",
    attendanceCode: "SRV456"
  }
];


function OpenTalkManagerPage() {
  const [meetings, setMeetings] = useState(DUMMY_MEETINGS);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showDetail, setShowDetail] = useState(false);
  const [detailMeeting, setDetailMeeting] = useState(null);

  const navigate = useNavigate();

  // Hàm mở trang Add New Meeting
  const handleGoToAddNew = () => {
    navigate("new-meeting");
  };

  // Xem chi tiết Meeting
  const handleViewDetail = (meeting) => {
    setDetailMeeting(meeting);
    setShowDetail(true);
  };

  return (
    <div
      className="bg-white rounded-4 shadow-sm p-4"
      style={{
        width: "100%",
        marginTop: 20,
        border: "1px solid #ececec"
      }}
    >
      <div className="container-fluid px-4 py-4" style={{ width: "100%", marginTop: 20 }}>
        {/* Header với nút Add New */}
        <Header onAddNew={handleGoToAddNew} />

        {/* Table danh sách meeting */}
        <Table
          meetings={meetings}
          onView={handleViewDetail}
          // Thêm các props khác như onEdit, onDelete nếu cần
        />

        {/* Pagination */}
        <div className="d-flex justify-content-start mt-3">
          <OpenTalkPagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>

        {/* Chi tiết meeting dạng modal */}
        <MeetingDetail
          show={showDetail}
          onClose={() => setShowDetail(false)}
          meeting={detailMeeting}
        />
      </div>
    </div>
  );
}

export default OpenTalkManagerPage;
