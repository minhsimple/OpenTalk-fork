import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ isOpen, title, message, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">{title}</h3>
                <hr />
                <p className="modal-message">
                    <strong>Are you sure?</strong><br />
                    <span>{message}</span>
                </p>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onCancel}>Cancel</button>
                    <button className="btn-delete" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
