import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="d-flex vh-100 overflow-hidden">
            <Sidebar />
            <div className="d-flex flex-column flex-grow-1">
                <Header />
                <main className="flex-grow-1 overflow-auto p-4 bg-white">
                    <Outlet />
                </main>
                <main className="flex-grow-1 overflow-auto p-4 bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
