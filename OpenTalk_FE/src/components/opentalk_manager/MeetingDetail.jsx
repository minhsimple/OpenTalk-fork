import { Modal, Button } from "react-bootstrap";

function MeetingDetail({ show, onClose, meeting }) {
  if (!meeting) return null;

  // Chuyển đổi ngày cho đẹp nếu cần
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered contentClassName="auto-width-modal">
  <Modal.Body style={{ padding: "2.2rem 2rem" }}>
    <h5 className="fw-bold mb-4" style={{fontSize: 22}}>Personal Info</h5>
    <div className="detail-grid">
      <div className="detail-row"><span className="detail-label">Full Name</span><span className="detail-value">{meeting.name || "-"}</span></div>
    </div>
    <div className="text-end mt-4">
      <Button variant="secondary" style={{borderRadius: 8, fontSize: 16}} onClick={onClose}>
        Close
      </Button>
    </div>
  </Modal.Body>
  <style>{`
  .auto-width-modal {
    width: auto !important;
    max-width: 95vw !important;
    min-width: 320px;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    padding: 0;
  }
  .detail-grid {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 14px;
    font-size: 16px;
    margin-bottom: 16px;
  }
  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    padding-bottom: 2px;
    border-bottom: 1px solid #f2f2f2;
  }
  .detail-label {
    color: #959eab;
    font-weight: 500;
  }
  .detail-value {
    color: #16181a;
    font-weight: 600;
    text-align: right;
    word-break: break-all;
  }
  @media (max-width: 600px) {
    .auto-width-modal { min-width: 96vw !important; }
    .detail-row { flex-direction: column; align-items: flex-start; }
    .detail-value { text-align: left; }
  }
`}</style>

</Modal>

  );
}

export default MeetingDetail;
