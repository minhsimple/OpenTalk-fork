import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
    return (
        <div className="d-flex vh-100 overflow-hidden">
            <Sidebar />
            <div className="d-flex flex-column flex-grow-1">
                <Header />
                <main className="flex-grow-1 overflow-auto p-4 bg-white">{children}</main>
            </div>
        </div>
    );
}
