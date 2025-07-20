import { useState } from "react"
import "./PollMeeting.css"

export default function PollApp() {
    const [pollData, setPollData] = useState([
        { id: "pizza", text: "Pizza", votes: 6 },
        { id: "tacos", text: "Tacos", votes: 12 },
        { id: "sushi", text: "Sushi", votes: 6 },
        { id: "italian", text: "Italian", votes: 1 },
    ])

    const [hasVoted, setHasVoted] = useState(false)
    const [showResults, setShowResults] = useState(false)

    const totalVotes = pollData.reduce((sum, option) => sum + option.votes, 0)

    const handleVote = (optionId) => {
        if (hasVoted) return

        setPollData((prev) =>
            prev.map((option) => (option.id === optionId ? { ...option, votes: option.votes + 1 } : option)),
        )
        setHasVoted(true)
        setShowResults(true)
    }

    const getVotePercentage = (votes) => {
        return totalVotes > 0 ? (votes / totalVotes) * 100 : 0
    }

    return (
        <div className="poll-container">
            <div className="poll-wrapper">
                {/* Header */}
                <div className="poll-header">
                    <div className="poll-header-text">
                        <span>Poll</span>
                        <span>App</span>
                        <span className="poll-header-now">Now</span>
                    </div>
                </div>

                {/* Poll Card */}
                <div className="poll-card">
                    {/* Card Header */}
                    <div className="poll-card-header">
                        <div className="poll-user-info">
                            <div className="poll-avatar">MJ</div>
                            <div className="poll-user-text">
                                <span className="poll-username">@Mariam Jahangiri</span>
                                <span className="poll-description">created a poll: Where should we go for lunch?</span>
                            </div>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="poll-content">
                        {/* Poll Question */}
                        <div className="poll-question">
                            <span className="poll-question-emoji">🍜</span>
                            <h2 className="poll-question-text">Where should we go for lunch?</h2>
                        </div>

                        {/* Poll Options */}
                        <div className="poll-options">
                            {pollData.map((option) => (
                                <div key={option.id} className="poll-option">
                                    <div className="poll-option-content">
                                        <div className="poll-option-header">
                                            <div className="poll-option-label">
                                                <span className="poll-option-name">{option.text}</span>
                                            </div>
                                            {showResults && (
                                                <span className="poll-option-votes">
                          {option.votes} {option.votes === 1 ? "vote" : "votes"}
                        </span>
                                            )}
                                        </div>
                                        {showResults && (
                                            <div className="poll-progress-bar">
                                                <div className="poll-progress-fill" style={{ width: `${getVotePercentage(option.votes)}%` }} />
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => handleVote(option.id)} disabled={hasVoted} className="poll-vote-button">
                                        Vote
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Show Results Button */}
                        {!showResults && (
                            <div>
                                <button onClick={() => setShowResults(true)} className="poll-show-results">
                                    Show results
                                </button>
                            </div>
                        )}

                        {/* Total Votes */}
                        {showResults && <div className="poll-total-votes">Total votes: {totalVotes}</div>}
                    </div>
                </div>

                {/* History indicator */}
                <div className="poll-history">
                    <div className="poll-history-icon">
                        <div className="poll-history-dot" />
                    </div>
                    <span>History is on</span>
                </div>
            </div>
        </div>
    )
}
