import React from 'react';
import '/src/css/TopicIdea.css';
import { FaRegBookmark } from 'react-icons/fa';

const TopicProposal = ({ title, excerpt, authorName, date, avatarUrl }) => {
    return (
        <div className="blog-card">
            <div className="blog-card__content">
                <h3 className="blog-card__title">{title}</h3>
                <p className="blog-card__excerpt">{excerpt}</p>
            </div>
            <div className="blog-card__footer">
                <div className="blog-card__author">
                    <img
                        className="blog-card__avatar"
                        src={avatarUrl}
                        alt={authorName}
                    />
                    <div>
                        <div className="blog-card__name">{authorName}</div>
                        <div className="blog-card__date">{date}</div>
                    </div>
                </div>
                <button className="blog-card__bookmark">
                    <FaRegBookmark className="blog-card__bookmark-icon" />
                    <span>Bookmark</span>
                </button>
            </div>
        </div>
    )
};

export default TopicProposal;
