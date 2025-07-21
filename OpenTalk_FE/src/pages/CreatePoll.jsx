import {useEffect, useState} from "react"
import "./styles/PollMeeting.css"
import { FaQuestion } from "react-icons/fa"
import axios from "/src/api/axiosClient.jsx"
import {getAccessToken, getCurrentUser} from "../helper/auth.jsx";
const CreatePoll = (meetingId, meetingName) => {
    const[pollOption, setPollOption] = useState([]);
    const[poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [error, setError]     = useState(null);
    const [pollId, setPollId] = useState(null);
    const [vote, setVote] = useState(false);
    const [pollData, setPollData] = useState([])
    const [hasVoted, setHasVoted] = useState(false)
    const [showResults, setShowResults] = useState(false)

    const totalVotes = pollData.reduce((sum, option) => sum + option.votes, 0)

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await axios.get(`/poll/${meetingId}`,
                    { headers: { Authorization: `Bearer ${getAccessToken()}` }});
                setPoll(response.data);
                setPollId(response.data.id);
                setVote(true)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPoll();
    }, []);

    useEffect(() => {
        if (!pollId) return;
        const fetchTopicPolls = async () => {
            try {
                const response = await axios.get(`/topic-poll/${pollId}`,
                    { headers: { Authorization: `Bearer ${getAccessToken()}` }});
                setPollOption(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopicPolls();
    }, [pollId]);


    return (
        <div className="poll-container">
            <div className="poll-wrapper">

                <div className="poll-card">
                    <div className="poll-card-header">
                        <div className="poll-user-info">
                            <div className="poll-avatar">MJ</div>
                            <div className="poll-user-text">
                                <span className="poll-username">@Mariam Jahangiri</span>
                                <span className="poll-description">created a poll: Which topic should we discuss?</span>
                            </div>
                        </div>
                    </div>

                    <div className="poll-content">
                        <div className="poll-question">
                            <span className="poll-question-emoji"><FaQuestion /></span>
                            <h2 className="poll-question-text">{`Voting discussion for ${meetingName}`}</h2>
                        </div>

                        <div className="poll-options">
                            {pollOption.map((option) => (
                                <div key={option.id} className="poll-option">
                                    <div className="poll-option-content">
                                        <div className="poll-option-header">
                                            <div className="poll-option-label">
                                                <span className="poll-option-name">{option.topic.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

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

export default CreatePoll
