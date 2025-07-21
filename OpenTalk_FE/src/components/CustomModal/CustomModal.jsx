import React from "react";
import "./CustomModal.css"; // Tạo file CSS riêng

const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <button className="custom-modal-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;
