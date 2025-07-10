import React from 'react';

import "/src/css/TopicCategory.css"
import TopicIdea from "../components/common/TopicIdea.jsx";
import TopicProposal from "../components/common/TopicIdea.jsx";

const posts = [
    {
        id: 1,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
    },
    {
        id: 2,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
    },
    {
        id: 3,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
    },
    {
        id: 4,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
    },
    {
        id: 5,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
    },
    {
        id: 6,
        title: 'Had denoting properly jointure which well books beyond',
        excerpt: 'In said of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...',
        authorName: 'John James',
        date: '29 February 2019',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
    },
];

const TopicProposalCategory = () => {
    return (
        <div className="blog-list">
            {posts.map(post => (
                <TopicProposal
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    authorName={post.authorName}
                    date={post.date}
                    avatarUrl={post.avatarUrl}
                />
            ))}
        </div>
    );
};

export default TopicProposalCategory;