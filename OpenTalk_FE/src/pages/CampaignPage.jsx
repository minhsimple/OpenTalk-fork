import React from 'react';
import CampaignCard from '/src/components/proposalTopic/ProposalDetail.jsx';
import ProposalDetail from "/src/components/proposalTopic/ProposalDetail.jsx";

const CampaignPage = () => {
    const data = {
        title: 'New Year Marketing Campaign',
        priority: 'Medium',
        assigneesAvt: 'https://i.pravatar.cc/40?img=5',
        assigneeName: 'Tung Pham',
        dueDate: '23 Jan 2023',
        companyBranch: 'Ha Noi',
        tags: ['Website', 'Design'],
        comment: {
            author: 'Tyler Romaguera',
            avatarUrl: 'https://i.pravatar.cc/40?img=5',
            to: ['angkasadharma@gmail.com'],
            cc: ['dharma@gmail.com'],
            body: 'Hi Jason,\n\nThank you for your interest in virtual options here at Adelaide! Please see below pricing for our virtual options:'
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <ProposalDetail {...data} />
        </div>
    );
};

export default CampaignPage;