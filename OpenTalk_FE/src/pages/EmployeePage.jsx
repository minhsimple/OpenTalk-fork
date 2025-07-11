import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    FaSearch,
    FaDownload,
    FaPlus,
    FaEye,
    FaTrash,
    FaChevronDown,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa"
import "./styles/EmployeePage.css"
import DeleteModal from "../components/deleteModal/DeleteModal.jsx";

const mockEmployees = [
    {
        id: 1,
        name: "Pristia Candra",
        email: "lincoln@unpixel.com",
        jobTitle: "UI UX Designer",
        lineManager: "@Pristiacandra",
        department: "Team Product",
        office: "Unpixel Office",
        status: "Active",
        account: "Activated",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg?height=40&width=40",
    },
    {
        id: 2,
        name: "Hanna Baptista",
        email: "hanna@unpixel.com",
        jobTitle: "Graphic Designer",
        lineManager: "@Pristiacandra",
        department: "Team Product",
        office: "Unpixel Office",
        status: "On Boarding",
        account: "Activated",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg?height=40&width=40",
    },
    {
        id: 3,
        name: "Miracle Geidt",
        email: "miracle@unpixel.com",
        jobTitle: "Finance",
        lineManager: "@Pristiacandra",
        department: "Team Product",
        office: "Unpixel Office",
        status: "Probation",
        account: "Need Invitation",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg?height=40&width=40",
    },
    {
        id: 4,
        name: "Rayna Torff",
        email: "rayna@unpixel.com",
        jobTitle: "Project Manager",
        lineManager: "@Pristiacandra",
        department: "Team Product",
        office: "Unpixel Office",
        status: "Active",
        account: "Activated",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg?height=40&width=40",
    },
    {
        id: 5,
        name: "Giana Lipshutz",
        email: "giana@unpixel.com",
        jobTitle: "Creative Director",
        lineManager: "@Pristiacandra",
        department: "Team Product",
        office: "Unpixel Office",
        status: "On Leave",
        account: "Need Invitation",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg?height=40&width=40",
    },
    {
        id: 6,
        name: "James George",
        email: "james@unpixel.com",
        jobTitle: "Lead Designer",
        lineManager: "@Pristiacandra",
        department: "Team Product",
        office: "Unpixel Office",
        status: "Active",
        account: "Activated",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg?height=40&width=40",
    },
]

const getStatusClass = (status) => {
    const statusMap = {
        Active: "status-active",
        "On Boarding": "status-onboarding",
        Probation: "status-probation",
        "On Leave": "status-leave",
    }
    return `status-badge ${statusMap[status] || "status-badge"}`
}

const EmployeePage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [officeFilter, setOfficeFilter] = useState("")
    const [jobFilter, setJobFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [showDelete, setShowDelete] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const itemsPerPage = 8

    const navigate = useNavigate()

    const filtered = mockEmployees.filter((emp) => {
        const matchesSearch =
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesOffice = officeFilter ? emp.office === officeFilter : true
        const matchesJob = jobFilter ? emp.jobTitle === jobFilter : true
        const matchesStatus = statusFilter ? emp.status === statusFilter : true
        return matchesSearch && matchesOffice && matchesJob && matchesStatus
    })

    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedEmployees = filtered.slice(startIndex, startIndex + itemsPerPage)

    const uniqueOffices = [...new Set(mockEmployees.map((e) => e.office))]
    const uniqueJobs = [...new Set(mockEmployees.map((e) => e.jobTitle))]
    const uniqueStatuses = [...new Set(mockEmployees.map((e) => e.status))]

    const handleConfirmDelete = () => {
        alert(`${selectedEmployee?.name} deleted.`);
        setShowDelete(false);
    };

    return (
        <div className="employee-page">
            {/* Header */}
            <div className="header">
                <div>
                    <h1 className="header-title">Employees</h1>
                    <p className="header-subtitle">Manage your Employee</p>
                </div>
                <div className="header-buttons">
                    <button className="btn btn-outline">
                        <FaDownload />
                        Download
                    </button>
                    <button onClick={() => navigate("/employee/add")} className="btn btn-primary">
                        <FaPlus />
                        Add New
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="filters">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search employee"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="select-container">
                    <select className="select" value={officeFilter} onChange={(e) => setOfficeFilter(e.target.value)}>
                        <option value="">All Offices</option>
                        {uniqueOffices.map((office) => (
                            <option key={office} value={office}>
                                {office}
                            </option>
                        ))}
                    </select>
                    <FaChevronDown className="select-icon" />
                </div>

                <div className="select-container">
                    <select className="select" value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}>
                        <option value="">All Job Titles</option>
                        {uniqueJobs.map((job) => (
                            <option key={job} value={job}>
                                {job}
                            </option>
                        ))}
                    </select>
                    <FaChevronDown className="select-icon" />
                </div>

                <div className="select-container">
                    <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All Status</option>
                        {uniqueStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <FaChevronDown className="select-icon" />
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            <input type="checkbox" className="checkbox" />
                        </th>
                        <th>Employee Name</th>
                        <th>Job Title</th>
                        <th>Line Manager</th>
                        <th>Department</th>
                        <th>Office</th>
                        <th>Employee Status</th>
                        <th>Account</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedEmployees.map((emp) => (
                        <tr key={emp.id}>
                            <td>
                                <input type="checkbox" className="checkbox" />
                            </td>
                            <td>
                                <div className="employee-info">
                                    <img src={emp.avatar || "/placeholder.svg"} alt={emp.name} className="employee-avatar" />
                                    <div>
                                        <div className="employee-name">{emp.name}</div>
                                        <div className="employee-email">{emp.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{emp.jobTitle}</td>
                            <td>{emp.lineManager}</td>
                            <td>{emp.department}</td>
                            <td>{emp.office}</td>
                            <td>
                                <span className={getStatusClass(emp.status)}>{emp.status.toUpperCase()}</span>
                            </td>
                            <td>{emp.account}</td>
                            <td>
                                <div className="action-buttons">
                                    <button onClick={() => navigate(`/employee/edit/${emp.id}`)} className="action-btn action-btn-view">
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedEmployee(emp);
                                            setShowDelete(true);
                                        }}
                                        className="action-btn action-btn-delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <DeleteModal
                    isOpen={showDelete}
                    title="Delete Employee"
                    message={`Are you sure you want to delete ${selectedEmployee?.name}?`}
                    onCancel={() => setShowDelete(false)}
                    onConfirm={handleConfirmDelete}
                />

                {/* Pagination */}
                <div className="pagination">
                    <div className="pagination-info">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length}{" "}
                        results
                    </div>
                    <div className="pagination-buttons">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="pagination-btn"
                        >
                            <FaChevronLeft />
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`pagination-number ${currentPage === i + 1 ? "active" : ""}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeePage
