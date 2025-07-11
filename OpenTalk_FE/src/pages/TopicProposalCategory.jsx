import React from 'react';

import "/src/css/TopicProposalCategory.css"
import TopicProposal from "../components/common/TopicProposalCard.jsx";

const posts = [
    {
        id: 1,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
        status: 'pending'
    },
    {
        id: 2,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
        status: 'pending'
    },
    {
        id: 3,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
        status: 'pending'
    },
    {
        id: 4,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
        status: 'pending'
    },
    {
        id: 5,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
        status: 'rejected'
    },
    {
        id: 6,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
        status: 'approved'
    },
];

const TopicProposalCategory = () => {
    return (
        <>
        <div className="topic-proposal-header">
            <button className="add-new-btn">+ Add New</button>
        </div>
        <div className="category-list">
            {posts.map(post => (
                <TopicProposal
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    authorName={post.authorName}
                    date={post.date}
                    avatarUrl={post.avatarUrl}
                    status={post.status}
                />
            ))}
        </div>
        </>
    );
};

export default TopicProposalCategory;