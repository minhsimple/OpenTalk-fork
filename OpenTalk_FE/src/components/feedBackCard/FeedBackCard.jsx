import React from 'react';
import { FaStar } from 'react-icons/fa';
import './FeedBackCard.css';

const FeedBackCard = ({ feedback }) => {
    const { user, rating, comment } = feedback;
    return (
        <div className="feedback-card">
            <img
                src={user.avatar || '/placeholder.svg'}
                alt={user.username}
                className="feedback-avatar"
            />
            <div className="feedback-info">
                <div className="feedback-username">{user.username}</div>
                <div className="feedback-rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} className={i < rating ? 'filled' : ''} />
                    ))}
                </div>
                <div className="feedback-comment">{comment}</div>
            </div>
        </div>
    );
};

export default FeedBackCard;
