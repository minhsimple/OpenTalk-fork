import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";

function AddMeeting() {
  const [form, setForm] = useState({
    title: "",
    host: "",
    branch: "",
    scheduledDate: "",
    endingDate: "",
    url: "",
    status: "",
    code: "",
    members: [""],
    notes: [""],
    feedbacks: [""],
    meetingTimes: [""],
    statistic: "Ongoing",
    priority: "High",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (type, idx, value) => {
    setForm((prev) => {
      const updated = [...prev[type]];
      updated[idx] = value;
      return { ...prev, [type]: updated };
    });
  };
  const handleAddArray = (type) => {
    setForm((prev) => ({ ...prev, [type]: [...prev[type], ""] }));
  };
  const handleRemoveArray = (type, idx) => {
    setForm((prev) => {
      const updated = prev[type].filter((_, i) => i !== idx);
      return { ...prev, [type]: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Meeting added:\n" + JSON.stringify(form, null, 2));
    navigate("/meeting");
  };

  return (
    <div className="addmeeting-bg-enterprise">
      <div className="addmeeting-container py-3">
        {/* BACK + TITLE */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <span
            style={{ fontSize: 24, cursor: "pointer" }}
            onClick={() => navigate(-1)}
            className="fw-bold text-dark"
          >
            &larr;
          </span>
          <span className="fw-semibold fs-5 back-text" style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
            Back
          </span>
        </div>
        <h2 className="addmeeting-title mb-3">Add New Meeting</h2>
        {/* FORM */}
        <Form onSubmit={handleSubmit} autoComplete="off" className="addmeeting-form-enterprise">
          <div className="addmeeting-grid-row mb-1">
            {/* Task Name */}
            <Form.Group>
              <Form.Label className="form-label-enterprise">Task Name</Form.Label>
              <Form.Control
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter meeting/task name"
                autoComplete="off"
                required
                size="sm"
              />
            </Form.Group>
            {/* Starting Date */}
            <Form.Group>
              <Form.Label className="form-label-enterprise text-primary">Starting Date</Form.Label>
              <InputGroup>
                <Form.Control
                  type="date"
                  name="scheduledDate"
                  value={form.scheduledDate}
                  onChange={handleChange}
                  required
                  size="sm"
                />
                <InputGroup.Text>
                  <i className="bi bi-calendar-event" style={{ color: "#1976d2" }} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            {/* Ending Date */}
            <Form.Group>
              <Form.Label className="form-label-enterprise" style={{ color: "#e53935" }}>Ending Date</Form.Label>
              <InputGroup>
                <Form.Control
                  type="date"
                  name="endingDate"
                  value={form.endingDate}
                  onChange={handleChange}
                  size="sm"
                />
                <InputGroup.Text>
                  <i className="bi bi-calendar-event" style={{ color: "#e53935" }} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
          {/* Team Members */}
          <Form.Group className="mb-1">
          <Form.Label className="form-label-enterprise">Team Members</Form.Label>
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <Form.Control
              value={form.members[0]}
              placeholder="Member #1"
              onChange={e => handleArrayChange("members", 0, e.target.value)}
              size="sm"
              style={{ flex: 1, minWidth: 0 }}
            />
            <Button variant="outline-secondary" size="sm" className="mt-1" onClick={() => handleAddArray("members")}>+ Add</Button>
          </div>
        </Form.Group>

          {/* Statistic */}
          <Form.Group className="mb-1">
            <Form.Label className="form-label-enterprise">Statistic</Form.Label>
            <Form.Control
              name="statistic"
              value={form.statistic}
              onChange={handleChange}
              disabled
              size="sm"
            />
          </Form.Group>
          {/* Note */}
          <Form.Group className="mb-1">
            <Form.Label className="form-label-enterprise">Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              value={form.notes[0]}
              placeholder="Note #1"
              onChange={e => handleArrayChange("notes", 0, e.target.value)}
              size="sm"
            />
            <Button variant="outline-secondary" size="sm" className="mt-1" onClick={() => handleAddArray("notes")}>+ Add</Button>
          </Form.Group>
          {/* Priority */}
          <Form.Group className="mb-1">
            <Form.Label className="form-label-enterprise">Priority</Form.Label>
            <Form.Select name="priority" value={form.priority} onChange={handleChange} size="sm">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Form.Group>
          {/* Feedback */}
          <Form.Group className="mb-1">
            <Form.Label className="form-label-enterprise">Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              value={form.feedbacks[0]}
              placeholder="Feedback #1"
              onChange={e => handleArrayChange("feedbacks", 0, e.target.value)}
              size="sm"
            />
            <Button variant="outline-secondary" size="sm" className="mt-1" onClick={() => handleAddArray("feedbacks")}>+ Add</Button>
          </Form.Group>
          {/* Meeting (Optional) */}
          <Form.Group className="mb-1">
            <Form.Label className="form-label-enterprise">Meeting <span className="text-muted">(Optional)</span></Form.Label>
            <Form.Control
              type="text"
              value={form.meetingTimes[0]}
              placeholder="dd/mm/yyyy, hh:mm"
              onChange={e => handleArrayChange("meetingTimes", 0, e.target.value)}
              size="sm"
            />
            <Button variant="outline-secondary" size="sm" className="mt-1" onClick={() => handleAddArray("meetingTimes")}>+ Add</Button>
          </Form.Group>
          {/* Save button */}
          <div className="d-flex justify-content-start mt-2">
            <Button className="px-4 py-2 rounded-3 btn-dark-green" type="submit" style={{ minWidth: 110 }}>
              Save
            </Button>
          </div>
        </Form>
      </div>
      <style>{`
        .addmeeting-bg-enterprise {
          background: #fafbfc;
          min-height: 100vh;
        }
        .addmeeting-container {
          width: 100%;
          margin: 0;
          padding-left: 16px;
          padding-right: 16px;
        }
        .addmeeting-title {
          font-weight: 700;
          font-size: 2rem;
          color: #233d29;
          letter-spacing: 0.01em;
        }
        .addmeeting-form-enterprise {
          width: 100%;
          padding-top: 2px;
          max-height: calc(100vh - 110px); /* Trừ phần header và khoảng cách, đảm bảo không scroll page */
          overflow-y: auto;
        }
        .addmeeting-grid-row {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
          margin-bottom: 2px;
        }
        .form-label-enterprise {
          font-weight: 600;
          font-size: 15px;
          color: #233d29;
          margin-bottom: 3px;
        }
        .form-label-enterprise.text-primary {
          color: #1976d2;
        }
        .form-control, .form-select {
          border-radius: 9px;
          font-size: 14px;
          padding-top: 6px;
          padding-bottom: 6px;
        }
        .form-control:disabled, .form-control[readonly] {
          background: #f1f3f4;
        }
        .btn-dark-green {
          background: #234c38;
          border: none;
        }
        .btn-dark-green:hover, .btn-dark-green:focus {
          background: #18926e;
        }
        .rounded-3 {
          border-radius: 10px !important;
        }
        .back-text {
          color: #233d29;
        }
        @media (max-width: 900px) {
          .addmeeting-container {
            padding-left: 2vw;
            padding-right: 2vw;
          }
          .addmeeting-grid-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
    </div>
  );
}

export default AddMeeting;
