import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import BranchListPage from "./pages/BranchListPage";
// import Overview from "./pages/Overview";
// import Meeting from "./pages/Meeting";
// import Message from "./pages/Message";
// import thêm các trang khác

// Tạo các component placeholder tương ứng từng route
function Overview() {
    return <h2>Overview Page</h2>;
}
function Meeting() {
    return <h2>Meeting Page</h2>;
}
function Message() {
    return <h2>Message Page</h2>;
}
function Project() {
    return <h2>Project Page</h2>;
}
function Ticket() {
    return <h2>Ticket Page</h2>;
}
function Employee() {
    return <h2>Employee Page</h2>;
}
function Attendance() {
    return <h2>Attendance Page</h2>;
}
function Notice() {
    return <h2>Notice Page</h2>;
}
function HRTab() {
    return <h2>HR Tab Page</h2>;
}
function Organization() {
    return <h2>Organization Page</h2>;
}
function Account() {
    return <h2>Account Page</h2>;
}
function Setting() {
    return <h2>Setting Page</h2>;
}

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/meeting" element={<Meeting />} />
                    <Route path="/message" element={<Message />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/ticket" element={<Ticket />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/hrtab" element={<HRTab />} />
                    <Route path="/organization" element={<Organization />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/branches" element={<BranchListPage />} />
                    {/* các route khác */}
                </Routes>
            </Layout>
        </Router>
    );
}

export default App