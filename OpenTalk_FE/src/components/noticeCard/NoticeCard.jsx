import React, { useState } from "react";
import { FaUser, FaCalendarAlt, FaEllipsisV } from "react-icons/fa";
import "./NoticeCard.css";
import DeleteModal from "../deleteModal/DeleteModal.jsx";

const NoticeCard = ({ title, author, date, content, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);
    const handleDelete = () => {
        onDelete(); // callback xử lý xóa
        setShowModal(false);
    };

    return (
        <div className="notice-card">
            <div className="notice-header">
                <div className="notice-title">{title}</div>
                <div className="notice-options-wrapper">
                    <FaEllipsisV className="notice-options" onClick={toggleMenu} />
                    {showMenu && (
                        <div className="options-dropdown">
                            <div onClick={() => { setShowMenu(false); onEdit(); }}>Edit</div>
                            <div onClick={() => { setShowMenu(false); setShowModal(true); }}>Delete</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="notice-meta">
                <div className="meta-item">
                    <FaUser className="icon" />
                    <span>{author}</span>
                </div>
                <div className="meta-item date">
                    <FaCalendarAlt className="icon" />
                    <span>{date}</span>
                </div>
            </div>

            <div className="notice-content">{content}</div>

            <DeleteModal
                isOpen={showModal}
                title="Delete Notice"
                message={`You want to delete "${title}"`}
                onCancel={() => setShowModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default NoticeCard;
