import React, {useEffect, useRef, useState} from 'react';
import axios from '/src/api/axiosClient.jsx';
import "/src/css/TopicProposalCategory.css";
import TopicProposal from "../components/common/TopicProposalCard.jsx";
import { getAccessToken } from "../helper/auth.jsx";
import Input from "../components/common/Input.jsx";


const TopicProposalCategory = () => {
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [pageNo, setPageNo] = useState(1);
    const [pageSize] = useState(8);
    const [error, setError] = useState(null);
    const [statusOption, setStatusOptions] = useState([]);
    const [title, setTitle] = useState("");
    const typingTimeoutRef = useRef(null);

    const fetchTopics = async ({ pageNo, statusFilter, title }) => {
        setLoading(true);
        try {
            const res = await axios.get('/topic-idea/', {
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                params: { pageNo, pageSize, status: statusFilter, title }
            });
            setPosts(res.data.content || []);
            setTotalPages(res.data.totalPages || 0);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Không tải được dữ liệu');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTopics({ pageNo, statusFilter, title });
    }, [pageNo, statusFilter]);
    useEffect(() => {
        axios.get('/topic-idea/status', {
            headers: { Authorization: `Bearer ${getAccessToken()}` }
        }).then(res => setStatusOptions(res.data));
    }, []);
    const handleTitleChange = e => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setPageNo(1);

        // hủy timeout cũ nếu có
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // tạo timeout mới, 500ms sau sẽ gọi fetch
        typingTimeoutRef.current = setTimeout(() => {
            fetchTopics({ pageNo: 1, statusFilter, title: newTitle });
        }, 500);
    };
    useEffect(() => {
        return () => clearTimeout(typingTimeoutRef.current);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error)   return <div>{error}</div>;

    return (
        <>

            <div className="topic-proposal-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Input
                    name="title"
                    type="text"
                    placeholder="Search by Title..."
                    value={title}
                    onChange={handleTitleChange}
                    editable={true}

                />
                <button className="add-new-btn">+ Add New</button>
                {/* Dropdown lọc status */}
                <select
                    className="status-filter-dropdown"
                    value={statusFilter}
                    onChange={e => {
                        setStatusFilter(e.target.value);
                        setPageNo(1); // reset về page đầu
                    }}
                >
                    <option value="">All Status</option>
                    {statusOption.map(opt => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            {posts.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "18px", color: "#666" }}>
                    No topics found.
                </div>
            ) : (
                <div className="category-list">
                    {posts.map(post => (
                        <TopicProposal
                            key={post.id}
                            title={post.title}
                            description={post.description}
                            authorName={post.suggestedBy.fullName}
                            date={post.createdAt}
                            avatarUrl="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"
                            status={post.status}
                        />
                    ))}
                </div>
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => setPageNo(prev => prev - 1)} disabled={pageNo === 1}>
                        ← Prev
                    </button>
                    <span className="page-number">Page {pageNo} of {totalPages}</span>
                    <button onClick={() => setPageNo(prev => prev + 1)} disabled={pageNo === totalPages}>
                        Next →
                    </button>
                </div>
            )}
        </>
    );
};

export default TopicProposalCategory;
