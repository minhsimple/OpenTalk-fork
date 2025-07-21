import React, { useEffect, useState, useCallback } from 'react';
import "/src/css/ProposalDetail.css";
import { FaBuilding, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {getAccessToken, getCurrentUser} from "../../helper/auth.jsx";
import axios from '/src/api/axiosClient.jsx';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const ProposalDetail = () => {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Reject modal state
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectNote, setRejectNote] = useState('');
    const [rejectSubmitting, setRejectSubmitting] = useState(false);
    const [rejectError, setRejectError] = useState('');
    const user = getCurrentUser();
    // Approve state (nếu vẫn dùng nút Approve trực tiếp)
    const [approveSubmitting, setApproveSubmitting] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`/topic-idea/${id}`, {
                headers: { Authorization: `Bearer ${getAccessToken()}` }
            });
            setData(res.data);
        } catch (err) {
            console.error(err);
            setErrorMsg('Không tải được dữ liệu.');
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openRejectModal = () => {
        setRejectNote('');
        setRejectError('');
        setShowRejectModal(true);
    };

    const closeRejectModal = () => {
        if (!rejectSubmitting) {
            setShowRejectModal(false);
            setRejectError('');
        }
    };

    const handleRejectSubmit = async () => {
        setRejectError('');
        if (rejectNote.trim().length < 5) {
            setRejectError('Lý do phải ≥ 5 ký tự.');
            return;
        }
        try {
            setRejectSubmitting(true);
            await axios.put(
                `/topic-idea/${id}/decision`,
                { decision: 'REJECTED',
                       remark: rejectNote.trim(),
                        topicId: data.id,
                       userId: user.id},
                { headers: { Authorization: `Bearer ${getAccessToken()}` } }
            );
            setSuccessMsg('Đã từ chối thành công!');
            setShowRejectModal(false);
            // Optional: cập nhật status local nếu BE trả về status mới:
            // setData(prev => ({ ...prev, status: 'REJECTED' }));
        } catch (err) {
            console.error(err);
            setRejectError('Gửi yêu cầu từ chối thất bại. Thử lại.');
        } finally {
            setRejectSubmitting(false);
        }
    };

    const handleApprove = async () => {
        setErrorMsg('');
        setSuccessMsg('');
        try {
            setApproveSubmitting(true);
            await axios.put(
                `/topic-idea/decision`,
                {  decision: 'approved',
                        remark: null,
                        topicId: data.id,
                        userId: user.id},
                { headers: { Authorization: `Bearer ${getAccessToken()}` } }
            );
            setSuccessMsg('Đã phê duyệt thành công!');
            // setData(prev => ({ ...prev, status: 'APPROVED' }));
        } catch (err) {
            console.error(err);
            setErrorMsg('Phê duyệt thất bại. Thử lại.');
        } finally {
            setApproveSubmitting(false);
        }
    };

    if (!data) return <div>Loading...</div>;

    return (
        <div className="campaign-card">
            <div className="card-header">
                <h2 className="card-title">
                    {data.title}
                    {data.status && (
                        <span style={{
                            marginLeft: '12px',
                            fontSize: '0.8rem',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            background: data.status === 'APPROVED' ? '#e6ffed'
                                : data.status === 'REJECTED' ? '#ffe6e6'
                                    : '#f0f0f0',
                            color: '#333'
                        }}>
              {data.status}
            </span>
                    )}
                </h2>
            </div>

            {successMsg && <div className="alert success">{successMsg}</div>}
            {errorMsg && <div className="alert error">{errorMsg}</div>}

            <div className="card-details">
                <div className="detail-item">
                    <FaUser className="icon" />
                    <span>Assignee: </span>
                    <div className="assignees">
                        <img
                            src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"
                            alt={data?.evalutedBy?.fullName}
                            title={data?.evalutedBy?.fullName}
                            className="avatar"
                        />
                    </div>
                </div>
                <div className="detail-item">
                    <FaCalendarAlt className="icon" />
                    <span>Create date: {data?.updatedAt && new Date(data.updatedAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="detail-item">
                    <FaBuilding className="icon" />
                    <span>Branch: {data.suggestedBy.companyBranch}</span>
                </div>
            </div>

            <div className="comment-section">
                <h3 className="comment-title">About Topic</h3>
                <div className="comment-box">
                    <div className="comment-header">
                        <img
                            src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"
                            alt={data.suggestedBy.fullName}
                            className="avatar-lg"
                        />
                        <div>
                            <p className="comment-author">{data.suggestedBy.fullName}</p>
                        </div>
                    </div>
                    <p className="comment-body">{data.description}</p>
                </div>
            </div>

            {data?.status === 'pending' && (
                <div className="button-group" style={{ marginTop: '1.2rem' }}>
                    <button
                        className="btn btn-reject"
                        onClick={openRejectModal}
                        disabled={approveSubmitting}
                    >
                        Reject
                    </button>
                    <button
                        className="btn btn-approve"
                        onClick={handleApprove}
                        disabled={rejectSubmitting || approveSubmitting}
                    >
                        {approveSubmitting ? <Spinner animation="border" size="sm" /> : 'Approve'}
                    </button>
                </div>
            )}

            {/* Reject Modal */}
            <Modal show={showRejectModal} onHide={closeRejectModal} centered backdrop="static">
                <Modal.Header closeButton={!rejectSubmitting}>
                    <Modal.Title>Từ chối đề xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="rejectReason">
                        <Form.Label>Lý do từ chối <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Nhập lý do tối thiểu 5 ký tự..."
                            value={rejectNote}
                            disabled={rejectSubmitting}
                            onChange={(e) => setRejectNote(e.target.value)}
                        />
                    </Form.Group>
                    {rejectError && <div className="alert error">{rejectError}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={closeRejectModal}
                        disabled={rejectSubmitting}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleRejectSubmit}
                        disabled={rejectSubmitting}
                    >
                        {rejectSubmitting ? <Spinner animation="border" size="sm" /> : 'Xác nhận từ chối'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProposalDetail;
