import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './FeedBackCardInput.css';

const FeedBackCardInput = ({ onSubmit }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ comment, rating });
        }
        setComment('');
        setRating(0);
    };

    return (
        <form className="feedback-card feedback-input" onSubmit={handleSubmit}>
            <img src="/placeholder.svg" alt="avatar" className="feedback-avatar" />
            <div className="feedback-info">
                <textarea
                    className="feedback-textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your feedback..."
                    rows={3}
                />
                <div className="feedback-rating selectable">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                            key={i}
                            className={i < rating ? 'filled' : ''}
                            onClick={() => handleStarClick(i)}
                        />
                    ))}
                </div>
                <button type="submit" className="feedback-send">
                    Send Feedback
                </button>
            </div>
        </form>
    );
};

export default FeedBackCardInput;
