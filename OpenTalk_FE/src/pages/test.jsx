import MeetingCard from "../components/meetingCard/MeetingCard";

const MeetingList = () => {
    const handleJoin = () => {
        alert("Joining the meeting...");
    };

    return (
        <div style={{ padding: "20px" }}>
            <MeetingCard
                title="UI/UX Design Team Meeting"
                time="10:00 - 12:00"
                description="Dorem ipsum dolor sit amet, consectetur adipiscing elit..."
                participants={[
                    "https://randomuser.me/api/portraits/women/1.jpg",
                    "https://randomuser.me/api/portraits/men/2.jpg",
                    "https://randomuser.me/api/portraits/women/3.jpg"
                ]}
                extraCount={5}
                onJoin={handleJoin}
            />
        </div>
    );
};

export default MeetingList;
