import React from 'react';
import "/src/css/ProposalDetail.css"
import {FaBuilding, FaCalendarAlt, FaUser} from "react-icons/fa";
const ProposalDetail = ({
                          title,
                          priority,
                          assigneesAvt,
                          assigneeName,
                          dueDate,
                          companyBranch,
                          comment
                      }) => {
    return (
        <div className="campaign-card">
            <div className="card-header">
                <h2 className="card-title">{title}</h2>
                <span className={`priority-badge badge-${priority.toLowerCase()}`}>{priority}</span>
            </div>

            <div className="card-details">
                <div className="detail-item">
                    <FaUser className="icon" title="User" />
                    <span>Assignee: </span>
                    <div className="assignees">
                        <img  src={assigneesAvt} alt={assigneeName} title={assigneeName} className="avatar" />
                    </div>
                </div>
                <div className="detail-item">
                    <FaCalendarAlt className="icon" title="Due Date" />
                    <span>Due date: {dueDate}</span>
                </div>
                <div className="detail-item">
                    <FaBuilding className="icon" title="Branch" />
                    <span>Branch: {companyBranch}</span>
                </div>
            </div>

            <div className="comment-section">
                <h3 className="comment-title">About Topic</h3>
                {comment && (
                    <div className="comment-box">
                        <div className="comment-header">
                            <img src={comment.avatarUrl} alt={comment.author} className="avatar-lg" />
                            <div>
                                <p className="comment-author">{comment.author}</p>
                            </div>
                        </div>
                        <div className="comment-meta">
                            <p><strong>To:</strong> {comment.to.join(', ')}</p>
                            {comment.cc && <p><strong>Cc:</strong> {comment.cc.join(', ')}</p>}
                        </div>
                        <p className="comment-body">{comment.body}</p>
                    </div>
                )}
            </div>
            <div className="button-group">
                <button className="btn btn-reject">Reject</button>
                <button className="btn btn-approve">Approve</button>
            </div>
        </div>
    );
};

export default ProposalDetail;
