import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaVideo,
    FaEnvelope,
    FaProjectDiagram,
    FaTicketAlt,
    FaUsers,
    FaRegCalendarCheck,
    FaRegNewspaper,
    FaFileAlt,
    FaBuilding,
    FaUserCircle,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
    { label: "Overview", icon: <FaHome />, path: "/" },
    { label: "Meeting", icon: <FaVideo />, path: "/meeting" },
    { label: "Message", icon: <FaEnvelope />, path: "/message" },
    { label: "Project", icon: <FaProjectDiagram />, path: "/project" },
    { label: "Ticket", icon: <FaTicketAlt />, path: "/ticket" },
    { label: "Employee", icon: <FaUsers />, path: "/employee" },
    { label: "Attendance", icon: <FaRegCalendarCheck />, path: "/attendance" },
    { label: "Notice", icon: <FaRegNewspaper />, path: "/notice" },
    { label: "HR Tab", icon: <FaFileAlt />, path: "/hrtab" },
    { label: "Organization", icon: <FaBuilding />, path: "/organization" },
    { label: "Branches", icon: <FaBuilding />, path: "/branches" },
    { label: "Account", icon: <FaUserCircle />, path: "/account" },
    { label: "Setting", icon: <FaCog />, path: "/setting" },
];

const activeStyle = {
    backgroundColor: "#001B12",
    color: "white",
    fontWeight: "600",
    textDecoration: "none",
};

const inactiveStyle = {
    color: "#6c757d",
    textDecoration: "none",
};

function Sidebar() {
    return (
        <div className="d-flex flex-column bg-light vh-100 p-3" style={{ width: 250 }}>
            <nav className="nav flex-column">
                {menuItems.map(({ label, icon, path }) => (
                    <NavLink
                        to={path}
                        key={label}
                        className="nav-link d-flex align-items-center gap-2 text-start rounded mb-1"
                        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
                    >
                        <span>{icon}</span>
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            <button
                className="btn btn-outline-danger mt-auto d-flex align-items-center gap-2"
                style={{ width: "100%" }}
            >
                <FaSignOutAlt />
                Logout
            </button>
        </div>
    );
}

export default Sidebar;
