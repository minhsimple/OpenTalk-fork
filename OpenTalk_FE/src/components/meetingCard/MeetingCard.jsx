import React from "react";
import "./MeetingCard.css";

const MeetingCard = ({
                         title,
                         time,
                         description,
                         participants,
                         extraCount,
                         onJoin
                     }) => {
    return (
        <div className="meeting-card">
            <div className="meeting-icon">
                <span role="img" aria-label="video">📹</span>
            </div>

            <h3>{title}</h3>
            <span className="meeting-time">{time}</span>

            <p className="meeting-description">{description}</p>

            <div className="meeting-participants">
                {participants.slice(0, 3).map((avatar, idx) => (
                    <img key={idx} src={avatar} alt={`user-${idx}`} />
                ))}
                {extraCount > 0 && <div className="extra-count">+{extraCount}</div>}
            </div>

            <button className="join-button" onClick={onJoin}>Join Meeting</button>
        </div>
    );
};

export default MeetingCard;
