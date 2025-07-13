import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import DashBoard from "./pages/DashBoard.jsx";
import AuthGuard from "./components/common/AuthGuard";

import MeetingList from "./pages/test.jsx";
import CustomTextEditor from "./components/textEdit/RichTextEditor.jsx";
import TiptapEditor from "./components/textEdit/TiptapEditor.jsx"; // đường dẫn tùy bạn
// import Overview from "./pages/Overview";
// import Meeting from "./pages/Meeting";
// import Message from "./pages/Message";
// import thêm các trang khác

// Tạo các component placeholder tương ứng từng route
function Overview() {
  return <h2>Overview Page</h2>;
}
function Meeting() {
  return <MeetingList />;
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
  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>My Meeting Notes</h2>
        <CustomTextEditor />
      </div>
      <div>
        {/* xấu vl đừng dùng :>>>*/}
        <TiptapEditor />
      </div>
    </>
  );
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
      <Routes>
        {/* public */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* protected */}
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/dashboard" element={<DashBoard />} />
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
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
