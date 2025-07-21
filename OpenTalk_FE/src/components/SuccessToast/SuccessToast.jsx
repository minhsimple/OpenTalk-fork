import React, { useEffect } from "react";
import "./SuccessToast.css";

const SuccessToast = ({ message, isVisible, type = "success", onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose()
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`toast-container toast-${type}`}>
            <div className="toast-message">{message}</div>
        </div>
    );
};

export default SuccessToast;
