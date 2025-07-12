import { useState } from "react"
import "./styles/HostFrequencyReport.css"

const HostFrequencyReport = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: "📊", active: false },
        { id: "employees", label: "All Employees", icon: "👥", active: false },
        { id: "departments", label: "All Departments", icon: "🏢", active: false },
        { id: "host-frequency", label: "Host Frequency", icon: "📹", active: true },
        { id: "payroll", label: "Payroll", icon: "💰", active: false },
        { id: "jobs", label: "Jobs", icon: "💼", active: false },
        { id: "candidates", label: "Candidates", icon: "👤", active: false },
        { id: "leaves", label: "Leaves", icon: "🏖️", active: false },
        { id: "holidays", label: "Holidays", icon: "🎉", active: false },
        { id: "settings", label: "Settings", icon: "⚙️", active: false },
    ]

    const mockData = [
        {
            id: 1,
            name: "Leasie Watson",
            designation: "Team Lead - Design",
            type: "Office",
            sessionsHosted: 5,
            lastHosted: "13/06/2025",
            avatar: "https://randomuser.me/api/portraits/men/29.jpg?height=40&width=40",
        },
        {
            id: 2,
            name: "Darlene Robertson",
            designation: "Web Designer",
            type: "Office",
            sessionsHosted: 0,
            lastHosted: "N/A",
            avatar: "https://randomuser.me/api/portraits/women/13.jpg?height=40&width=40",
        },
        {
            id: 3,
            name: "Jacob Jones",
            designation: "Medical Assistant",
            type: "Remote",
            sessionsHosted: 0,
            lastHosted: "N/A",
            avatar: "https://randomuser.me/api/portraits/women/10.jpg?height=40&width=40",
        },
        {
            id: 4,
            name: "Kathryn Murphy",
            designation: "Marketing Coordinator",
            type: "Office",
            sessionsHosted: 3,
            lastHosted: "11/06/2025",
            avatar: "https://randomuser.me/api/portraits/women/19.jpg?height=40&width=40",
        },
        {
            id: 5,
            name: "Leslie Alexander",
            designation: "Data Analyst",
            type: "Office",
            sessionsHosted: 6,
            lastHosted: "11/06/2025",
            avatar: "https://randomuser.me/api/portraits/women/14.jpg?height=40&width=40",
        },
        {
            id: 6,
            name: "Ronald Richards",
            designation: "Python Developer",
            type: "Remote",
            sessionsHosted: 1,
            lastHosted: "11/06/2025",
            avatar: "https://randomuser.me/api/portraits/women/37.jpg?height=40&width=40",
        },
        {
            id: 7,
            name: "Guy Hawkins",
            designation: "UI/UX Design",
            type: "Remote",
            sessionsHosted: 3,
            lastHosted: "11/06/2025",
            avatar: "https://randomuser.me/api/portraits/men/39.jpg?height=40&width=40",
        },
        {
            id: 8,
            name: "Albert Flores",
            designation: "React JS",
            type: "Remote",
            sessionsHosted: 4,
            lastHosted: "11/06/2025",
            avatar: "https://randomuser.me/api/portraits/men/29.jpg?height=40&width=40",
        },
        {
            id: 9,
            name: "Savannah Nguyen",
            designation: "IOS Developer",
            type: "Remote",
            sessionsHosted: 1,
            lastHosted: "11/06/2025",
            avatar: "https://randomuser.me/api/portraits/women/40.jpg?height=40&width=40",
        },
        {
            id: 10,
            name: "Marvin McKinney",
            designation: "HR",
            type: "Remote",
            sessionsHosted: 3,
            lastHosted: "11/06/2025",
            avatar: "https://randomuser.me/api/portraits/men/49.jpg?height=40&width=40",
        },
        {
            id: 11,
            name: "Jerome Bell",
            designation: "Sales Manager",
            type: "Remote",
            sessionsHosted: 7,
            lastHosted: "11/06/2025",
            avatar: "https://randomuser.me/api/portraits/men/19.jpg?height=40&width=40",
        },
        {
            id: 12,
            name: "Jenny Wilson",
            designation: "React JS Developer",
            type: "Remote",
            sessionsHosted: 8,
            lastHosted: "11/06/2025",
            avatar: "https://randomuser.me/api/portraits/men/9.jpg?height=40&width=40",
        },
    ]

    const filteredData = mockData.filter(
        (employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.designation.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const totalRecords = 60 // Mock total records
    const totalPages = Math.ceil(totalRecords / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="hrms-container">
            {/* Main Content */}
            <div className="main-content">
                <div className="header">
                    <div className="header-left">
                        <h1 className="page-title">Host Frequency Report</h1>
                        <p className="page-subtitle">Summary of Opentalk Hosting Activities</p>
                    </div>
                </div>

                {/* Content Search */}
                <div className="content-search">
                    <div className="content-search-container">
                        <input
                            type="text"
                            className="content-search-input"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="content-search-icon">🔍</span>
                    </div>
                </div>

                {/* Table */}
                <div className="table-container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Designation</th>
                            <th>Type</th>
                            <th>Sessions Hosted</th>
                            <th>Last Hosted</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedData.map((employee) => (
                            <tr key={employee.id}>
                                <td>
                                    <div className="employee-info">
                                        <img
                                            src={employee.avatar || "/placeholder.svg"}
                                            alt={employee.name}
                                            className="employee-avatar"
                                        />
                                        <span className="employee-name">{employee.name}</span>
                                    </div>
                                </td>
                                <td>{employee.designation}</td>
                                <td>
                    <span className={`type-badge ${employee.type === "Office" ? "type-office" : "type-remote"}`}>
                      {employee.type}
                    </span>
                                </td>
                                <td>
                                    <span className="sessions-count">{employee.sessionsHosted}</span>
                                </td>
                                <td>
                    <span className={`last-hosted ${employee.lastHosted === "N/A" ? "na" : ""}`}>
                      {employee.lastHosted}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="pagination-container">
                        <div className="pagination-left">
                            <span className="pagination-showing">Showing</span>
                            <select
                                className="pagination-select"
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

                        <div className="pagination-info">Showing 1 to 10 out of 60 records</div>

                        <div className="pagination-right">
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                ‹
                            </button>

                            {[1, 2, 3, 4].map((page) => (
                                <button
                                    key={page}
                                    className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostFrequencyReport
